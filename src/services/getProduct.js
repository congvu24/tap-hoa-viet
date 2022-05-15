import firestore from '@react-native-firebase/firestore';

export const getProduct = async userId => {
  const products = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .limit(6)
    .get();

  return products;
};
