import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getProduct = async userId => {
  const products = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .get();
  return products;
};

export const getProductByBarCode = async barcode => {
  const userId = auth().currentUser?.uid;

  const result = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('barCode', '==', barcode)
    .get();

  if (result.docs.length === 0) {
    return false;
  }
  const product = result.docs.map(item => ({
    ...item.data(),
    productId: item.id,
  }))[0];
  return product;
};
