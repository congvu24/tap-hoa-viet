import firestore from '@react-native-firebase/firestore';

export const getCategoryFromFirestore = async () => {
  const res = await firestore().collection('Category').get();

  return res.docs.map(item => ({...item.data(), categoryId: item.id}));
};
