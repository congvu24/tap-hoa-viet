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

export const getOrderList = async filters => {
  try {
    const {fromDate, toDate} = filters;

    let query = myOrderRef;
    if (fromDate) {
      // set timestamp to start of the date
      fromDate.setUTCHours(0, 0, 0, 0);
      query = query.where('createAt', '>=', fromDate.getTime());
    }
    if (toDate) {
      // set timestamp to end of the date
      toDate.setUTCHours(23, 59, 59, 999);
      query = query.where('createAt', '<=', toDate.getTime());
    }

    const res = await query.get();

    return res.docs.map(item => ({...item.data(), id: item.id}));
  } catch (err) {
    console.log('err at order service -> getOrderList', err);
    throw err;
  }
};
