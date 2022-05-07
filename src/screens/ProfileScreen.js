import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {Avatar,Title,Caption,TouchableRipple} from 'react-native-paper';

const ProductsFile = () => {
  return (
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image  style={styles.image} source="" resizeMode="center"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Cong Vu</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Dai ca UIT</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Stats 1</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                        <Text style={[styles.text, styles.subText]}>Sale</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Product</Text>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Ionicons name="navigate-outline" color="#777777" size={20}/>
                        <Text style={{color:"#777777", marginLeft: 20}}>HCM city, Vietnam</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name="call-outline" color="#777777" size={20}/>
                        <Text style={{color:"#777777", marginLeft: 20}}>+(84) 945447290</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name="mail-outline" color="#777777" size={20}/>
                        <Text style={{color:"#777777", marginLeft: 20}}>biyasto@gmail.com</Text>
                  </View>
                </View>



        <View style={styles.menuWrapper}>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Favorites</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="hammer-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Mot cai tab cc nao do</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Share</Text>
          </View>
        </TouchableRipple>
         <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Ionicons name="log-out-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Log out</Text>
          </View>
        </TouchableRipple>

      </View>
            </ScrollView>
        </SafeAreaView>
    );
} export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden"
    },

    userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
    marginTop: 25,
  },

    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
     menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },



});