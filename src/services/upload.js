import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export const uploadFile = async file => {
  try {
    const ref = storage().ref(file.fileName);

    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
    // uploads file
    console.log(file)
    await ref.putFile(file.uri);

    return ref.getDownloadURL();
  } catch (err) {
    throw err;
  }
};
