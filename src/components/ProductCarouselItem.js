import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = SLIDER_WIDTH - 100;

const ProductCarouselItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.imgUrl}} style={styles.img} />
    </View>
  );
};

export default ProductCarouselItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: 200,
    paddingBottom: 40,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
  },
});
