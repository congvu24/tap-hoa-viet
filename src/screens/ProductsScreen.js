import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ProductsHeader from '../components/ProductsHeader';
import ProductItem from '../components/ProductItem';

const sampleImg =
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

const ProductsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <ProductsHeader
        title="Hàng hóa"
        numberOfProducts={40}
        inventoryNumber={184}
      />
      <ScrollView style={styles.itemsContainer}>
        {/* Sample products */}
        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />

        <ProductItem
          imgSrc={sampleImg}
          productName="Air Jordan 1"
          productId="NIJ016"
          price="4,300,000"
          numberOfInventories={16}
        />
      </ScrollView>
    </View>
  );
};

export default ProductsScreen;

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