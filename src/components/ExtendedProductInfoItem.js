import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {TEXT_COLOR} from '../constants/Colors';

const ExtendedProductInfoItem = ({title, description, isEdit = false}) => {
  const [isShowDescription, setIsShowDescription] = useState(false);

  const handleShowDescription = () => setIsShowDescription(!isShowDescription);

  return (
    <TouchableOpacity style={styles.container} onPress={handleShowDescription}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Icon
          type="material"
          name={
            !isShowDescription ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
          }
        />
      </View>

      {isShowDescription && (
        <View style={styles.descriptionContainer}>
          {!isEdit ? (
            <Text style={styles.description}>{description}</Text>
          ) : (
            <TextInput multiline style={styles.description}>
              {description}
            </TextInput>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ExtendedProductInfoItem;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {fontSize: 16, color: TEXT_COLOR, fontWeight: '500'},
  descriptionContainer: {marginTop: 10},
  description: {fontSize: 18, flex: 0.6},
});
