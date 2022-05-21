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
import {
  TEXT_COLOR,
  TEXT_SECONDARY_COLOR,
  RED_COLOR,
  SECONDARY_COLOR,
  BORDER_GREY_COLOR,
} from '../constants/Colors';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../redux/reducer/userSlice';
const data = [{Name: 'Pham Hoai Bao bao'}];

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const createTwoButtonAlert = () =>
    Alert.alert('Xác nhận', 'Bạn có thực sự muốn đăng xuất?', [
      {
        text: 'Không',
        onPress: () => console.log('Cancel Logout Pressed'),
      },
      {text: 'Có', onPress: () => handleSignOut()},
    ]);

  const handleSignOut = () => {
    try {
      auth()
        .signOut()
        .then(() => {
          console.log('User signed out!');
          dispatch(signOut());
          navigation.replace('Login');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              style={(styles.profileImage, styles.image)}
              source={require('../images/profile/default_avatar.png')}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, styles.profileName]}>{user.name}</Text>
          <Text style={[styles.text, styles.usernameText]}>{user.uid}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, styles.statText]}>1,000</Text>
            <Text style={[styles.text, styles.subText]}>Loại Sản Phẩm</Text>
          </View>
          <View style={[styles.statsBox, styles.borderStat]}>
            <Text style={[styles.text, styles.statText]}>40,500</Text>
            <Text style={[styles.text, styles.subText]}>Lượng Sản Phẩm</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, styles.statText]}>23,020</Text>
            <Text style={[styles.text, styles.subText]}>Giao Dịch</Text>
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
            <Text style={(styles.text, styles.marginTtem)}>{user.phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="mail-outline" style={styles.iconInfo} />
            <Text style={(styles.text, styles.marginTtem)}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.borderInfoSection} />
        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" style={styles.iconMenu} />
              <Text style={styles.menuItemText}>Yêu Thích</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" style={styles.iconMenu} />
              <Text style={styles.menuItemText}>Chia sẻ</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="settings-outline" style={styles.iconMenu} />
              <Text style={styles.menuItemText}>Cài Đặt</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <View style={styles.menuItem}>
              <Icon name="log-out-outline" style={styles.iconMenuDanger} />
              <Text style={styles.menuItemTextDanger}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.marginBottomScreen} />
    </SafeAreaView>
  );
};
export default ProfileScreen;

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
  marginBottomScreen: {
    marginTop: 80,
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
    color: TEXT_SECONDARY_COLOR,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  statText: {
    fontSize: 24,
  },
  usernameText: {
    color: TEXT_SECONDARY_COLOR,
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
    borderColor: BORDER_GREY_COLOR,
    borderLeftWidth: 2,
    borderRightWidth: 1,
  },
  borderInfoSection: {
    borderColor: 55,
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
    color: SECONDARY_COLOR,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  menuItemTextDanger: {
    color: RED_COLOR,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  iconInfo: {
    color: TEXT_COLOR,
    fontSize: 20,
    marginLeft: 30,
  },
  iconMenu: {
    color: SECONDARY_COLOR,
    fontSize: 25,
  },
  iconMenuDanger: {
    color: RED_COLOR,
    fontSize: 25,
  },
});
