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

export const deleteProductByProductCode = (userId, productCode) => {
  return firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('productCode', '==', productCode)
    .get()
    .then(snapShot => {
      return snapShot.docs[0].id;
    })
    .then(id => {
      firestore()
        .collection('ProductCreators')
        .doc(userId)
        .collection('ProductsList')
        .doc(id)
        .delete();
    });
};
