import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Loader from '../components/Loader';
import auth from '@react-native-firebase/auth';
import {PRIMARY_COLOR, WHITE_COLOR, TEXT_COLOR} from '../constants/Colors';
import Logo from '../components/Logo';
import userSlice from '../redux/reducer/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../redux/store';

export function LoginScreen({navigation}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const login = () => {
    if (isValidForm()) {
      setLoader(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User signed in!');
          const currentUserUid = auth().currentUser.uid;
          // console.log('ll', currentUser);
          dispatch(userSlice.actions.setUserInfo(currentUserUid));
          setLoader(false);
          //const currentUser = auth().currentUser;
          //console.log('ll', currentUser);
          //dispatch(userSlice.actions.setUserInfo(currentUser));
          navigation.replace('Homepage');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setLoader(false);
            Alert.alert('Tài khoản này không tồn tại!');
          }

          if (error.code === 'auth/wrong-password') {
            setLoader(false);
            Alert.alert('Mật khẩu chưa chính xác!');
          }

          console.error(error);
        });
    }
  };

  const isValidForm = () => {
    if (email == '') {
      Alert.alert('Vui lòng nhập email!');
      return false;
    } else if (password == '') {
      Alert.alert('Vui lòng nhập mật khẩu!');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(userSlice.actions.setUserInfo(user));
      navigation.replace('Homepage');
    }
  }, [user]);

  if (initializing) return null;
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Logo />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Chào mừng tới Tạp Hóa Việt</Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
          placeholderTextColor="#303030"
          placeholder="Email"
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.textInput}
          placeholderTextColor="#303030"
          placeholder="Mật khẩu"
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{fontSize: 18, color: 'black'}}>Đăng nhập</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
          }}
        >
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{fontWeight: 'bold'}}>Đăng ký ngay!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Overlay isVisible={loader}>
        <Loader text={'Đang đăng nhập, xin vui lòng đợi...'} />
      </Overlay>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  bottomContainer: {
    backgroundColor: PRIMARY_COLOR,
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 14,
  },
  title: {
    alignSelf: 'center',
    color: TEXT_COLOR,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  textInput: {
    height: 48,
    width: '100%',
    color: '#303030',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#303030',
    paddingLeft: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: WHITE_COLOR,
    padding: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
});
