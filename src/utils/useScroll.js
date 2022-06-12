import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetOffset, setOffset} from '../redux/reducer/app';

export default function useScroll() {
  const dispatch = useDispatch();
  const offsetFromStore = useSelector(state => state.app.offset);

  const offset = useRef(offsetFromStore).current;

  const ref = useRef();

  const onScroll = ({nativeEvent}) => {
    offset.setValue(nativeEvent.contentOffset.y);
  };

  const reset = () => {
    offset.setValue(0);
  };

  useEffect(() => {
    dispatch(setOffset(offset));
    return () => dispatch(resetOffset());
  }, [offset]);

  return {offset, ref, onScroll, reset};
}
