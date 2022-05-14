import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthButton from '../components/AuthButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../components/LoadingModal';
import {Overlay} from 'react-native-elements';
import Loader from '../components/Loader';
import PopUp from '../components/Popup';
import Logo from '../components/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import userSlice from '../redux/reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../redux/store';
import {TEXT_COLOR, WHITE_COLOR} from '../constants/Colors';

export function RegisterScreen({navigation}) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('Việc đăng ký hiện chưa hoàn tất');
  const [popUpErr, setPopUpErr] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const createAccount = () => {
    setError(false);
    setLoader(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        if (userCredentials.user) {
          userCredentials.user.updateProfile({
            displayName: name,
          });
        }
      })
      .then(() => {
        setLoader(false);
        setRegistered(true);
        onSubmit();
      })
      .catch(error => {
        setLoader(false);
        showErr(true, true, error.message);
      });
  };

  // const setUserData = () => {
  //   setUser({
  //     uid: auth().currentUser.uid,
  //     name: name,
  //     phone: phone,
  //     email: email,
  //   })
  // }

  const onSubmit = () => {
    setUser({
      uid: auth().currentUser.uid,
      name: name,
      phone: phone,
      email: email,
    });
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .set({
        uid: auth().currentUser.uid,
        name: name,
        phone: phone,
        email: email,
      })
      .then(() => {})
      .catch(error => {
        setLoader(false);
        showErr(true, true, error.message);
      });
  };

  const SignUpSuccess = () => {
    setError(false);
    setLoader(false);
    setRegistered(false);
    setConfirmPassword('');
    setEmail('');
    setPassword('');
    setPhone('');
    setName('');

    dispatch(userSlice.actions.setUserInfo(user));
    console.log('register', user);
    navigation.navigate('Homepage');
  };

  const validate = () => {
    if ((email, password, confirmPassword == '')) {
      showErr(
        true,
        true,
        'Không thể đăng kí \n vui lòng điền đầy đủ thông tin',
      );
    } else if (confirmPassword != password) {
      showErr(
        true,
        true,
        'Không thể đăng kí \n mật khẩu của bạn không giống nhau',
      );
    } else if (password.length < 6) {
      showErr(
        true,
        true,
        'Không thể đăng kí  \n mật khẩu phải có độ dài hơn 6 kí tự',
      );
    } else if (
      isNaN(phone) ||
      phone.length < 10 ||
      phone[0] != '0' ||
      phone.length > 10
    ) {
      showErr(
        true,
        true,
        'Không thể đăng kí \n vui lòng điền số điện thoại có ít nhất 10 số',
      );
    } else if (name.length < 2) {
      showErr(
        true,
        true,
        'Unable to sign up \n a valid name must have 2 characters or more',
      );
    } else {
      createAccount();
    }
  };

  const showErr = (show_overlay, show_popup_err, error_text) => {
    setError(show_overlay);
    setPopUpErr(show_popup_err);
    setErrorText(error_text);
  };

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.body}>
        <View style={styles.topSection}>
          <Logo />
        </View>

        <ScrollView
          style={styles.bottomSection}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <View
              style={{
                width: '10%',
                height: 30,
                backgroundColor: 'transparent',
                position: 'absolute',
                top: 10,
                left: 12,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Icon name="arrow-back" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{width: '80%', marginBottom: 20}}>
              <Text
                style={{
                  color: '#303030',
                  fontSize: 40,
                  marginTop: 10,
                  marginBottom: 12,
                }}
              >
                Tạo{'\n'}Tài Khoản
              </Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Tên người dùng"
              />
              <TextInput
                value={phone}
                onChangeText={text => setPhone(text)}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Số điện thoại"
                keyboardType="numeric"
              />
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Mật khẩu"
              />
              <TextInput
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Nhập lại mật khẩu"
              />
            </View>
            <AuthButton
              buttonFunction={() => validate()}
              bgcolor="white"
              text="Đăng ký"
              color={'black'}
              outline={false}
            />
          </View>
        </ScrollView>
      </View>
      <Overlay isVisible={error}>
        <PopUp
          errorBtn={() => setError(false)}
          text={errorText}
          error={popUpErr}
        />
      </Overlay>

      <Overlay isVisible={registered}>
        <PopUp
          successBtn={() => SignUpSuccess()}
          text={'Chào mừng bạn tới Tap Hoa Viet.'}
        />
      </Overlay>

      <Overlay isVisible={loader}>
        <Loader text={'Đang tạo tài khoản mới, xin vui lòng đợi...'} />
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSection: {
    width: '100%',
    height: '80%',
    backgroundColor: '#60CDE5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    // justifyContent:'center',
    // alignItems:'center'
  },
  textInput: {
    height: 48,
    width: '100%',
    color: TEXT_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: WHITE_COLOR,
    paddingLeft: 10,
    marginTop: 10,
  },
});
