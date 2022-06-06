import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import {getProfileFromFirestore} from './user';
import {nanoid} from '@reduxjs/toolkit';

export const uploadMultipleImages = async (images, productCode) => {
  const urls = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const ref = storage().ref(
      'ProductImages/' + productCode + '/' + nanoid(8) + '.png',
    );
    await ref.putFile(image);
    const url = await ref.getDownloadURL();
    console.log(url);
    urls.push(url);
  }
  return urls;
};
