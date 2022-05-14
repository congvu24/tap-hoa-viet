import firestore from '@react-native-firebase/firestore';

export const deleteProduct = (
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
  return firestore().collection('ProductCreators').doc(userId).delete().add({
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
