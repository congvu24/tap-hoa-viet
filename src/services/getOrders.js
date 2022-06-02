import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ORDERS} from '../constants/Collections';

const orderColl = firestore().collection(ORDERS);
const myOrderRef = orderColl
  .doc(auth().currentUser?.uid)
  .collection('OrderList');

export const getOrdersFromFirestore = async () => {
  const res = await myOrderRef.get();

  return res.docs.map(item => ({...item.data(), orderId: item.id}));
};
