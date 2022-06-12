import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import ProductsHeader from '../components/ProductsHeader';
import ProductItem from '../components/ProductItem';
import {useNavigation} from '@react-navigation/native';
import {getProduct} from '../services/getProduct';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';

const sampleImg =
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

export const ProductsScreen = ({route}) => {
  
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfInventories, setNumberOfInventories] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [selectedProductGroupCode, setSelectedProductGroupCode] = useState('');
  var {categoryID} = route.params || '';
  
  // search string
  const [searchString, setSearchString] = useState('');
  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    handleSelectedProduct();
  }, [route.params]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleData();
    await setRefreshing(false);
  }, []);

  const handleProducts = data => setProducts(data);
  const handleInventories = data => setNumberOfInventories(data);
  const handleNumberOfProducts = data => setNumberOfProducts(data);

  const handleData = () => {
    let uid = auth().currentUser?.uid;
    handleSelectedProduct();
    if (uid) {
      getProduct(
        uid,
        handleProducts,
        handleNumberOfProducts,
        handleInventories,
      );
    }
  };

  const goToAddProduct = () => {
    navigation.push('AddProduct');
  };

  // search string method
  const handleChangeSearchString = text => {
    setSearchString(text);
  };

  const handleSelectedProduct = () => {
    if (categoryID ) {
      setSelectedProductGroupCode(categoryID);
    }
  }


  return (
    <View style={styles.screenContainer}>
      <ProductsHeader
        title="Hàng hóa"
        numberOfProducts={products && numberOfProducts}
        inventoryNumber={numberOfInventories && numberOfInventories}
        goToAddProduct={goToAddProduct}
        changeSearchString={handleChangeSearchString}
        selectedProductGroupCode={selectedProductGroupCode}
        setProductGroupCode={setSelectedProductGroupCode}
      />
      <ScrollView
        style={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {products &&
          products
            .filter((item, index) => {
              if (searchString === '' && selectedProductGroupCode === '') {
                return true;
              } else {
                return (
                  item._data.productName
                    .toLowerCase()
                    .includes(searchString.toLowerCase()) &&
                  item._data.productGroup.includes(selectedProductGroupCode)
                );
              }
            })
            .map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('ProductDetails', {
                      qrCode: item._data.qrCode,
                    })
                  }
                  key={index}
                >
                  <ProductItem
                    imgSrc={item._data.imagesURL[0]}
                    productName={item._data.productName}
                    productId={item._data.productCode}
                    price={item._data.sellPrice}
                    numberOfInventories={item._data.numberOfProducts}
                  />
                </TouchableOpacity>
              );
            })}

        <View style={{paddingBottom: 75}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  itemsContainer: {
    marginTop: 15,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
