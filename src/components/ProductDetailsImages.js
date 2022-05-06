import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ProductCarouselItem, {
  ITEM_WIDTH,
  SLIDER_WIDTH,
} from './ProductCarouselItem';
import {PRIMARY_COLOR} from '../constants/Colors';

const ProductDetailsImages = () => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={sampleImgs}
        renderItem={ProductCarouselItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
      />

      <Pagination
        dotsLength={sampleImgs.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={styles.dotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default ProductDetailsImages;

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: PRIMARY_COLOR,
  },
});

const sampleImgs = [
  {
    imgUrl: '',
  },
  {
    imgUrl: '',
  },
  {
    imgUrl: '',
  },
  {
    imgUrl: '',
  },
  {
    imgUrl: '',
  },
  {
    imgUrl: '',
  },
];
