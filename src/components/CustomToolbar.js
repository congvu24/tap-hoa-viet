import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

//CustomToolbar
const CustomToolbar = ({
  productCode = '',
  buttonText = 'Lưu',
  isEdit = false,
  onBackPress,
  onEditPress,
  onButtonPress,
  onDeletePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Icon
          style={styles.chevronLeft}
          size={35}
          type="material"
          name="chevron-left"
          onPress={onBackPress}
        />
        <Text style={styles.productCode}>{productCode}</Text>
      </View>

      {!isEdit && (
        <View style={styles.rightSection}>
          <Icon type="material" name="edit" onPress={onEditPress} />
          <Icon
            // iconStyle={styles.deleteIcon}
            containerStyle={styles.deleteIcon}
            type="material"
            name="delete"
            onPress={onDeletePress}
          />
        </View>
      )}

      {isEdit && (
        <View style={styles.rightSection}>
          <Text onPress={onButtonPress} style={styles.saveText}>
            {buttonText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomToolbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: 'white',
    elevation: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronLeft: {
    marginRight: 15,
  },
  productCode: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  rightSection: {flexDirection: 'row', alignItems: 'center'},
  deleteIcon: {marginLeft: 25},
  saveText: {fontSize: 18, fontWeight: '700', color: 'black'},
});
