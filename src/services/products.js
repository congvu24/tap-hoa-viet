import firestore from '@react-native-firebase/firestore';

export const addProduct = (
  userId,
  productCode,
  barCode,
  productName,
  brand,
  capitalPrice,
  sellPrice,
  numberOfProducts,
  productGroup,
) => {
  return firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .add({
      productCode,
      barCode,
      productName,
      brand,
      capitalPrice,
      sellPrice,
      numberOfProducts,
      productGroup,
    });
};
