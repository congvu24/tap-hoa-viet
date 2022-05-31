import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ORDERS} from '../constants/Collections';
import {parseMonth} from '../utils/helper';

const orderColl = firestore().collection(ORDERS);
const myOrderRef = orderColl
  .doc(auth().currentUser?.uid)
  .collection('OrderList');
let monthList = [
  {month: 1, amount: 0},
  {month: 2, amount: 0},
  {month: 3, amount: 0},
  {month: 4, amount: 0},
  {month: 5, amount: 0},
  {month: 6, amount: 0},
  {month: 7, amount: 0},
  {month: 8, amount: 0},
  {month: 9, amount: 0},
  {month: 10, amount: 0},
  {month: 11, amount: 0},
  {month: 12, amount: 0},
];
export const dataMonth = () => {
  myOrderRef.get().then(querySnapshot => {
    monthList = [
      {month: 1, amount: 0},
      {month: 2, amount: 0},
      {month: 3, amount: 0},
      {month: 4, amount: 0},
      {month: 5, amount: 0},
      {month: 6, amount: 0},
      {month: 7, amount: 0},
      {month: 8, amount: 0},
      {month: 9, amount: 0},
      {month: 10, amount: 0},
      {month: 11, amount: 0},
      {month: 12, amount: 0},
    ];
    querySnapshot.forEach(documentSnapshot => {
      const month = parseMonth(documentSnapshot.data().createAt);
      const amount = documentSnapshot.data().amount;
      const objIndex = monthList.findIndex(obj => obj.month == month);
      monthList[objIndex].amount = monthList[objIndex].amount + amount;
    });
  });
  return monthList;
};
