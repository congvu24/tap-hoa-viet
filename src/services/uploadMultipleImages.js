import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import {getProfileFromFirestore} from './user';
import {nanoid} from '@reduxjs/toolkit';

// create a function to upload multiple images to firebase and then return url
export const uploadMultipleImages = async images => {
  const urls = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const ref = storage().ref('ProductImages/' + nanoid(8) + '.png');
    await ref.putFile(image);
    const url = await ref.getDownloadURL();
    console.log(url);
    urls.push(url);
  }
  return urls;
};
