import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const CustomImagesSlider = ({images = [], onClick, onDelete}) => {
  return (
    <ScrollView style={styles.container} horizontal>
      <TouchableOpacity style={styles.addMoreImage} onPress={onClick}>
        <Icon
          name="photo-camera"
          type="material"
          style={styles.addMoreImageIcon}
          size={40}
        />
      </TouchableOpacity>
      {images.map((item, index) => {
        return (
          <View style={styles.imageContainer} key={index}>
            <Image source={{uri: item}} style={styles.image} />
            <TouchableOpacity style={styles.iconContainer} onPress={onDelete}>
              <Icon
                style={styles.deleteIcon}
                type="material"
                name="close"
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CustomImagesSlider;

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    marginRight: 10,
    marginLeft: 10,
    position: 'relative',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: '#414952',
    right: 5,
    top: 5,
    borderRadius: 50,
    opacity: 0.7,
  },
  deleteIcon: {
    color: 'white',
  },
  addMoreImage: {marginRight: 10, marginLeft: 10},
  addMoreImageIcon: {
    width: 110,
    height: 110,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
