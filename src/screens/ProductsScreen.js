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
  const [refresing, setRefreshing] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      getProduct(user?.uid).then(data => {
        setProducts(data['_docs']);
      });
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    firebase.auth().onAuthStateChanged(user => {
      getProduct(user.uid).then(data => {
        setProducts(data['_docs']);
        setRefreshing(false);
      });
    });
  }, []);

  const goToAddProduct = () => {
    navigation.push('AddProduct');
  };

  console.log(products);

  return (
    <View style={styles.screenContainer}>
      <ProductsHeader
        title="Hàng hóa"
        numberOfProducts={40}
        inventoryNumber={184}
        goToAddProduct={goToAddProduct}
      />
      <ScrollView
        style={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
        }
      >
        {products &&
          products.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.push('ProductDetails')}
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
