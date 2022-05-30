import firestore from '@react-native-firebase/firestore';

export const editProduct = (
  productName,
  brand,
  productGroup,
  sellPrice,
  capitalPrice,
  numberOfProducts,
  userId,
  qrCode,
) => {
  firestore()
    .collection('Category')
    .where('name', '==', productGroup)
    .get()
    .then(snapShot => {
      return snapShot.docs[0].id;
    })
    .then(productGroupId => {
      firestore()
        .collection('ProductCreators')
        .doc(userId)
        .collection('ProductsList')
        .where('qrCode', '==', qrCode)
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
              brand,
              capitalPrice: Number(capitalPrice),
              numberOfProducts: Number(numberOfProducts),
              qrCode,
              productGroup: productGroupId,
              productName,
              sellPrice: Number(sellPrice),
              quantity: numberOfProducts,
            });
        });
    });
};
