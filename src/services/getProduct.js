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

export const getProductByQRCode = (userId, qrCode, setData) => {
  return firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('qrCode', '==', qrCode)
    .onSnapshot(snapShot => {
      if (snapShot) {
        setData(snapShot.docs[0].data());
      }
    });
};

export const getProductToEdit = async (userId, qrCode) => {
  const product = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('qrCode', '==', qrCode)
    .get()
    .then(snapShot => snapShot.docs[0].data());

  return product;
};

export const getProductGroup = groupCode => {
  return firestore().collection('Category').doc(groupCode).get();
};

export const getAllProductGroups = () => {
  return firestore().collection('Category').get();
};

export const getProductByBarCode = async barcode => {
  const userId = auth().currentUser?.uid;

  const result = await firestore()
    .collection('ProductCreators')
    .doc(userId)
    .collection('ProductsList')
    .where('qrCode', '==', barcode)
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

export const getProductFromFirestore = async () => {
  const uid = auth().currentUser?.uid;

  const res = await firestore()
    .collection('ProductCreators')
    .doc(uid)
    .collection('ProductsList')
    .get();

  return res.docs.map(item => ({...item.data(), productId: item.id}));
};

export const updateProduct = async (id, data) => {
  const uid = auth().currentUser?.uid;

  const ref = firestore()
    .collection('ProductCreators')
    .doc(uid)
    .collection('ProductsList')
    .doc(id);

  await ref.update({...data});
};
