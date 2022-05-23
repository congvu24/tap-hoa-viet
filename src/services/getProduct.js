import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const saveProductsToReduxStore = (uid, dispatchData) => {
  return firestore()
    .collection('ProductCreators')
    .doc(uid)
    .collection('ProductsList')
    .onSnapshot(snapShot => {
      dispatchData(snapShot.docs);
    });
};

export const getProduct = (
  userId,
  setProduct,
  setNumberOfProducts,
  setInventories,
) => {
  return firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .onSnapshot(snapShot => {
      if (setProduct && setNumberOfProducts && setInventories) {
        // update product list
        setProduct(snapShot.docs);

        // update number of products
        setNumberOfProducts(snapShot.size);

        // update inventories
        let inventories = 0;
        snapShot.docs.forEach(doc => {
          inventories += doc.data().numberOfProducts;
        });
        setInventories(inventories);
      }
    });
};

export const getProductByProductCode = (userId, productCode, setData) => {
  return firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('productCode', '==', productCode)
    .onSnapshot(snapShot => {
      if (snapShot) {
        setData(snapShot.docs[0].data());
      }
    });
};

export const getProductToEdit = async (userId, productCode) => {
  const product = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('productCode', '==', productCode)
    .get()
    .then(snapShot => snapShot.docs[0].data());

  return product;
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
