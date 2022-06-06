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
import useScroll from '../utils/useScroll';




export default function ProductReportScree() {
  const dispatch = useDispatch();
  const {ref, onScroll} = useScroll();
  const categoryList = useSelector(state => state.category.categoryList);
  const productList = useSelector(state => state.product.productList);
  const [test, setTest] = useState(null);
  
  const [numberOfInventories, setNumberOfInventories] = useState(0);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  

  

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
  
    // test && console.log("test nef: ", test[0].products[1].numberOfProducts);
    test && console.log("test chieu dai: ", test.length);
    test && console.log("test chieu dai product: ", test[1]);
    // console.log(categoryList);
    test && console.log("products nef: ",test[0]);
  
  
    const getNumWithCategoryId = (Id) => {
      var total = 0;
      const index = _.findIndex(test, function(o) {
        return o.group == Id;
      });
    
      if(test && index >= 0) {
        for (var i = 0; i < test[index].products.length; i++) {
          total = total + test[index].products[i].numberOfProducts
        }
      }
    
      return total;
  }
  

  return (
    <View style={styles.screenContainer}>
      <View style={styles.itemsContainer}>
        <View style={styles.extraSection}>
          <Text style={styles.numberText}>
            <Text style={styles.title}> Số lượng sản phẩm có trong kho: <Text style={styles.number}>13</Text></Text>
          </Text>
        </View>
        <FlatList
          ref={ref}
          onScroll={onScroll}
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
              numberOfInventories = {getNumWithCategoryId(item.categoryId)}
              categoryID = {item.categoryId}
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