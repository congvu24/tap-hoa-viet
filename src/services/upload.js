import storage from '@react-native-firebase/storage';

export const uploadFile = async file => {
  try {
    const ref = storage().ref(file.fileName);
    await ref.putFile(file.uri);

    return ref.getDownloadURL();
  } catch (err) {
    throw err;
  }
};
