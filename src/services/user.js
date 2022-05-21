import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {USERS} from '../constants/Collections';

const userColl = firestore().collection(USERS);

export const getProfileFromFirestore = async () => {
  const res = await userColl.doc(auth().currentUser?.uid).get();

  return res.data();
};
