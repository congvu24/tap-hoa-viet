import firestore from '@react-native-firebase/firestore';

export const getProduct = async userId => {
  const products = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .get();

  return products;
};
