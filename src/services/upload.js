import storage from '@react-native-firebase/storage';

export const uploadFile = async file => {
  try {
    const ref = storage().ref(file);
    await ref.putFile(file);
    return ref.getDownloadURL();
  } catch (err) {
    throw err;
  }
};
