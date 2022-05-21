import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, {useEffect, useState} from 'react';

const width= Dimensions.get('window').width/2 - 90;
const ProductsGroupItem = ({
    imgSrc = '',
    productGroup = '',
    numberOfInventories,
  }) => {
  return (
    <View>
      <View style={styles.container}>
        <View>
            <View style={styles.idNameContainer}>
                <Text style={styles.mainText}>{productGroup}</Text>
                <Text>{numberOfInventories}</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

export default ProductsGroupItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 175,
        backgroundColor: '#4fb1de',
        width,
        marginHorizontal: 2,
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
    },
    mainText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        fontWeight: '500',
    },
})