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

export const deleteProductByQRCode = (userId, qrCode) => {
  console.log('call delete');

  // return firestore()
  //   .collection('ProductCreators')
  //   .doc(userId)
  //   .collection('ProductsList')
  //   .where('qrCode', '==', qrCode)
  //   .get()
  //   .then(snapShot => {
  //     return snapShot.docs[0].id;
  //   })
  //   .then(id => {
  //     firestore()
  //       .collection('ProductCreators')
  //       .doc(userId)
  //       .collection('ProductsList')
  //       .doc(id)
  //       .delete();
  //   });
};
