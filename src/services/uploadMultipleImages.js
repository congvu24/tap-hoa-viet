import storage from '@react-native-firebase/storage';

//create a function to upload multiple images to firebase storage

export const uploadMultipleImages = async images => {
  try {
    const promises = images.map(image => {
      const ref = storage().ref(image.fileName);
      return ref.putFile(image.uri);
    });
    const urls = await Promise.all(promises);
    const urlsArray = urls.map(url => url.ref.getDownloadURL());
    return urlsArray;
  } catch (err) {
    console.log('Error while upload images');
    throw err;
  }
};
