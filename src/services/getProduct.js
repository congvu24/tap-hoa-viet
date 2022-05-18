import firestore from '@react-native-firebase/firestore';

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
