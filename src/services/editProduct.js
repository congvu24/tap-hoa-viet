import firestore from '@react-native-firebase/firestore';
import {uploadMultipleImages} from './uploadMultipleImages';

export const editProduct = (
  productName,
  brand,
  productGroup,
  sellPrice,
  capitalPrice,
  numberOfProducts,
  userId,
  qrCode,
  imagesToAdd = [],
  existingImages = [],
) => {
  return uploadMultipleImages(imagesToAdd, qrCode).then(newImagesURL => {
    if (productGroup !== 'other') {
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
                  imagesURL: [...existingImages, ...newImagesURL],
                });
            });
        });
    } else {
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
              productGroup: 'other',
              productName,
              sellPrice: Number(sellPrice),
              quantity: numberOfProducts,
              imagesURL: [...existingImages, ...newImagesURL],
            });
        });
    }
  });
};

// const deleteNotMatchingExistingImagesFromStorage = (
//   existingImages = [],
//   userId,
//   qrCode,
// ) => {
//   firestore()
//     .collection('ProductCreators')
//     .doc(userId)
//     .collection('ProductsList')
//     .where('qrCode', '==', qrCode)
//     .get()
//     .then(snapShot => {
//       return snapShot.docs[0].id;
//     })
//     .then(id => {
//       firestore()
//         .collection('ProductCreators')
//         .doc(userId)
//         .collection('ProductsList')
//         .doc(id)
//         .get()
//         .then(snapShot => {
//           console.log(snapShot._data.imagesURL);
//         });
//     });
// };
