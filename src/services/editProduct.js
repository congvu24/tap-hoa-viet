import firestore from '@react-native-firebase/firestore';

export const editProduct = (
  productName,
  barCode,
  brand,
  productGroup,
  sellPrice,
  capitalPrice,
  numberOfProducts,
  userId,
  productCode,
) => {
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
        .update({
          barCode,
          brand,
          capitalPrice: Number(capitalPrice),
          numberOfProducts: Number(numberOfProducts),
          productCode,
          productGroup,
          productName,
          sellPrice: Number(sellPrice),
        });
    });
};
