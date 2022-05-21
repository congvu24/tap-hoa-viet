import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ORDERS} from '../constants/Collections';

const orderColl = firestore().collection(ORDERS);
const myOrderRef = orderColl
  .doc(auth().currentUser?.uid)
  .collection('OrderList');

export const createOrderToFirestore = async data => {
  try {
    await myOrderRef.add(data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
