import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const addProduct = data => {
  console.log(data);
  const uid = auth().currentUser.uid;

  return firestore()
    .collection('ProductCreators')
    .doc(uid)
    .collection('ProductsList')
    .add({
      ...data,
      capitalPrice: Number(data.capitalPrice),
      sellPrice: Number(data.sellPrice),
      numberOfProducts: Number(data.quantity),
    });
};
