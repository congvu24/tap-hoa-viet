import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ProductsGroupItem from '../components/ProductsGroupItem'

import React from 'react'

export default function ProductReportScree() {
  return (
    <View style={styles.screenContainer}>
      
       <ScrollView
        style={styles.itemsContainer}
        // refreshControl={
        //   <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
        // }
      >
        <View style={styles.extraSection}>
          <Text style={styles.numberText}>
            Bạn dang có <Text style={styles.number}>256</Text> sản phẩm trong kho hàng
          </Text>
        </View>
            <ProductsGroupItem
              imgSrc=''
              productGroup='{item._data.productName}'
              
              numberOfInventories='{item._data.numberOfProducts}'
            />
            <ProductsGroupItem
              imgSrc=''
              productGroup='{item._data.productName}'
              
              numberOfInventories='{item._data.numberOfProducts}'
            />
        <View style={{paddingBottom: 75}}></View>
      </ScrollView>
    </View>
  )
}



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

  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
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
});