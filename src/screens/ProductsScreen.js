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

const sampleImg =
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
import {firebase} from '@react-native-firebase/firestore';

export const ProductsScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfInventories, setNumberOfInventories] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    handleData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleData();
    await setRefreshing(false);
  }, []);

  const handleProducts = data => setProducts(data);
  const handleInventories = data => setNumberOfInventories(data);
  const handleNumberOfProducts = data => setNumberOfProducts(data);

  const handleData = () => {
    firebase.auth().onAuthStateChanged(user => {
      getProduct(
        user.uid,
        handleProducts,
        handleNumberOfProducts,
        handleInventories,
      );
    });
  };

  const goToAddProduct = () => {
    navigation.push('AddProduct');
  };

  

  return (
    <View style={styles.screenContainer}>
      <ProductsHeader
        title="Hàng hóa"
        numberOfProducts={products && numberOfProducts}
        inventoryNumber={numberOfInventories && numberOfInventories}
        goToAddProduct={goToAddProduct}
      />
      <ScrollView
        style={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {products &&
          products.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('ProductDetails', {
                    productCode: item._data.productCode,
                  })
                }
                key={index}
              >
                <ProductItem
                  imgSrc={sampleImg}
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
