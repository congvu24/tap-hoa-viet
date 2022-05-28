import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DARK_GREY} from '../constants/Colors';

const ProductsHeader = ({
  title = '',
  numberOfProducts = 0,
  inventoryNumber = 0,
  goToAddProduct = () => {},
  changeSearchString,
}) => {
  const [isShowFindInput, setIsShowFindInput] = useState(false);

  const handleOnPressFindIcon = () => {
    setIsShowFindInput(true);
  };

  const handleCloseFindInput = () => {
    changeSearchString('');
    setIsShowFindInput(false);
  };

  return (
    <View style={styles.container}>
      {isShowFindInput ? (
        <View style={styles.findContainer}>
          <TextInput
            style={styles.findTextInput}
            onChangeText={text => changeSearchString(text)}
          />
          <Icon
            name="search-outline"
            size={25}
            style={styles.floatingSearchIcon}
            onPress={handleOnPressFindIcon}
          />
          <Icon
            name="close-circle"
            size={25}
            style={styles.floatingCloseIcon}
            onPress={handleCloseFindInput}
          />
        </View>
      ) : (
        <View style={styles.mainSection}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.iconsContainer}>
            <Icon
              name="search-outline"
              size={25}
              style={styles.icon}
              onPress={handleOnPressFindIcon}
            />
            <TouchableOpacity onPress={goToAddProduct}>
              <Icon name="add-outline" size={25} style={styles.icon} />
            </TouchableOpacity>
            <Icon name="funnel-outline" size={25} style={styles.icon} />
            <Icon />
          </View>
        </View>
      )}

      <View style={styles.extraSection}>
        <Text style={styles.numberText}>
          <Text style={styles.number}>{numberOfProducts}</Text>
          <Text style={{color: DARK_GREY}}> hàng hóa - Tồn kho </Text>
          <Text style={styles.number}>{inventoryNumber}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProductsHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
  },
  mainSection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  findContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    height: 62.5,
  },
  findTextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 999,
    paddingLeft: 50,
    paddingRight: 45,
    position: 'relative',
    fontSize: 17,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
  icon: {
    marginLeft: 30,
    color: DARK_GREY,
  },
  floatingSearchIcon: {
    position: 'absolute',
    top: '50%',
    left: 30,
  },
  floatingCloseIcon: {
    position: 'absolute',
    top: '50%',
    right: 35,
  },
  extraSection: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  numberText: {
    fontWeight: '600',
  },
  number: {
    color: '#4C9FDB',
  },
});
