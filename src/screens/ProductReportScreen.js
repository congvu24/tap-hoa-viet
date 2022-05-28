import { 
  StyleSheet, 
  Text, 
  View,Image, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native'
import {
  BACKGROUND_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../constants/Colors';
import ProductsGroupItem from '../components/ProductsGroupItem'
import {firebase} from '@react-native-firebase/firestore';
import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import DefaultImage from '../images/ic_inventory.png';
import {getProduct} from '../services/getProduct';



export default function ProductReportScree() {
  const dispatch = useDispatch();

  const categoryList = useSelector(state => state.category.categoryList);
  const productList = useSelector(state => state.product.productList);
  const [test, setTest] = useState(null);
  // const [categoryList, setCategoryList] = useState(null);
  const [numberOfInventories, setNumberOfInventories] = useState(0);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  

  const [filePath, setFilePath] = useState(
    Image.resolveAssetSource(DefaultImage).uri,
  );

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    setTest(
      _.chain(productList)
      // Group the elements of Array based on `color` property
      .groupBy("productGroup")
      // `key` is group's name (color), `value` is the array of objects
      .map((value,key) => {
        console.log("thu ",typeof(value));
        return {group: key, products: value}
      })
      .value()
    );
    
  };
  
    test && console.log("test nef: ", test[0].products);
    test && console.log("test chieu dai: ", test.length);
  // console.log(categoryList);
  // console.log("products nef: ",productList);
  
  

  return (
    <View style={styles.screenContainer}>
      <View style={styles.itemsContainer}>
        <View style={styles.extraSection}>
          <Text style={styles.numberText}>
            <Text style={styles.title}> Số lượng sản phẩm có trong kho: <Text style={styles.number}>13</Text></Text>
          </Text>
        </View>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={categoryList}
          renderItem={({item}) => {
            return <ProductsGroupItem
              imgSrc = {item.image}
              productGroup = {item.name}
              numberOfInventories = '13'
            />;
          }}
        />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  itemsContainer: {
    marginTop: 8,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 16,
    color: 'black',
  },

  extraSection: {
    paddingLeft: 10,
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
  
  // categoryContainer: {

  //   flexDirection: 'row',
  //   wrap: true,
  //   marginTop: 15,
  //   backgroundColor: 'white',
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   justifyContent: 'space-between',
  // },
   
    
    
});