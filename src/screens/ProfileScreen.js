import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProfileScreen = () => {
  const createTwoButtonAlert = () =>
    Alert.alert('Confirm', 'Are you sure want to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Logout Pressed'),
      },
      {text: 'OK', onPress: () => console.log('Logout Pressed')},
    ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <Icon style={styles.iconButton} name="ios-arrow-back"></Icon>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              style={(styles.profileImage, styles.image)}
              //source={require()}
            ></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.profileName]}>Cong Vu</Text>
          <Text style={[styles.text, styles.usernameText]}>@congvu24</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, styles.statText]}>483</Text>
            <Text style={[styles.text, styles.subText]}>Stats 1</Text>
          </View>
          <View style={[styles.statsBox, styles.borderStat]}>
            <Text style={[styles.text, styles.statText]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Sale</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, styles.statText]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Product</Text>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="navigate-outline" style={styles.iconInfo} />
            <Text style={(styles.text, styles.marginTtem)}>
              Ho Chi Minh city, Vietnam
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="call-outline" style={styles.iconInfo} />
            <Text style={(styles.text, styles.marginTtem)}>
              +(84) 945447290
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="mail-outline" style={styles.iconInfo} />
            <Text style={(styles.text, styles.marginTtem)}>
              nguyenduongthucvu@gmail.com
            </Text>
          </View>
        </View>
        <View style={styles.borderInfoSection}></View>
        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" style={styles.iconMenu} />
              <Text style={styles.menuItemText}>Favorites</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" style={styles.iconMenu} />
              <Text style={styles.menuItemText}>Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="settings-outline" style={styles.iconMenu} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <View style={styles.menuItem}>
              <Icon name="log-out-outline" style={styles.iconMenuDanger} />
              <Text style={styles.menuItemTextDanger}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#303030',
  },
  iconButton: {
    color: '#52575D',
    fontSize: 30,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  statText: {
    fontSize: 24,
  },
  usernameText: {
    color: '#AEB5BC',
    fontSize: 14,
  },
  profileName: {
    fontWeight: '300',
    fontSize: 36,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 15,
    marginTop: 25,
  },

  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  borderStat: {
    borderColor: '#DFD8C8',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  borderInfoSection: {
    borderColor: '#DFD8C8',
    borderTopWidth: 1,
    marginLeft: 60,
    marginRight: 60,
  },
  menuWrapper: {
    marginTop: 10,
  },
  marginTtem: {
    marginLeft: 20,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#4C9FDB',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  menuItemTextDanger: {
    color: '#E86363',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  iconInfo: {
    color: '#303030',
    fontSize: 20,
    marginLeft: 30,
  },
  iconMenu: {
    color: '#4C9FDB',
    fontSize: 25,
  },
  iconMenuDanger: {
    color: '#E86363',
    fontSize: 25,
  },
});
