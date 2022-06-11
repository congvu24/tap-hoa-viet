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

const EditProductImagesSlide = ({
  existingImages = [],
  setExistingImages = () => {},
  imagesToAdd = [],
  setImagesToAdd = () => {},
  onChooseImagePress,
}) => {
  const popOutImage = indexToDelete => {
    let maxExistingImageIndex = existingImages.length - 1;
    let beginningImageToAddIndex = maxExistingImageIndex + 1;

    console.log('max existing image: ', maxExistingImageIndex);
    console.log('clicked index: ', indexToDelete);

    if (indexToDelete <= maxExistingImageIndex) {
      if (existingImages.length === 1) {
        setExistingImages(existingImages.pop());
      }

      setExistingImages(existingImages.splice(indexToDelete - 1, 1));
    } else {
      if (imagesToAdd.length === 1) {
        setImagesToAdd(imagesToAdd.pop());
      }

      setImagesToAdd(
        imagesToAdd.splice(indexToDelete - beginningImageToAddIndex - 1, 1),
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{justifyContent: 'flex-start'}}
      horizontal
    >
      <TouchableOpacity
        style={styles.addMoreImage}
        onPress={onChooseImagePress}
      >
        <Icon
          name="photo-camera"
          type="material"
          style={styles.addMoreImageIcon}
          size={40}
        />
      </TouchableOpacity>
      {[...existingImages, ...imagesToAdd].map((item, index) => {
        return (
          <View style={styles.imageContainer} key={index}>
            <Image source={{uri: item}} style={styles.image} />
            <TouchableOpacity style={styles.iconContainer}>
              <Icon
                style={styles.deleteIcon}
                type="material"
                name="close"
                color={'white'}
                onPress={() => popOutImage(index)}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default EditProductImagesSlide;

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
