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
import React, {useState} from 'react';
import AuthButton from '../components/AuthButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../components/LoadingModal';
import {Overlay} from 'react-native-elements';
import Loader from '../components/Loader';
import PopUp from '../components/Popup';
import Logo from '../components/Logo';


export default function RegisterScreen({navigation}) {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(
    'Registration is currently not complete',
  );
  const [popUpErr, setPopUpErr] = useState(false);
  const [user, setUser] = useState({});

  const createAccount = () => {
    setError(false);
    setLoader(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
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

  const onSubmit = () => {
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .set({
        name: name,
        mobile: mobile,
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
    setMobile('');
    setName('');
    navigation.navigate('Login');
  };

  const validate = () => {
    if ((email, password, confirmPassword == '')) {
      showErr(true, true, 'Unable to sign up \n please fill in all fields');
    } else if (confirmPassword != password) {
      showErr(true, true, 'Unable to sign up \n your password does not match');
    } else if (password.length < 6) {
      showErr(
        true,
        true,
        'Unable to sign up  \n a password must be at least 6 characters long',
      );
    } else if (
      isNaN(mobile) ||
      mobile.length < 10 ||
      mobile[0] != '0' ||
      mobile.length > 10
    ) {
      showErr(
        true,
        true,
        'Unable to sign up \n please enter a valid 10 digit mobile number',
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
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',

            }}>
            {/* <View style={{width:'95%',height:50, backgroundColor:'white'}}>
                                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                    <Text>Back</Text>
                                </TouchableOpacity>
                            </View> */}
            <View style={{width: '80%', marginBottom: 20}}>
              <Text
                style={{
                  color: '#303030',
                  fontSize: 40,
                  marginTop: 10,
                  marginBottom: 24,

                }}>
                Create {'\n'}Account
              </Text>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="User name"
              />
              <TextInput
                value={mobile}
                onChangeText={text => setMobile(text)}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Mobile"
              />
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
                placeholder="Password"
              />
              <TextInput
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry={true}
                style={styles.textInput}
                placeholderTextColor="#303030"
                placeholder="Confirm Password"
              />
            </View>
            <AuthButton
              buttonFunction={() => validate()}
              bgcolor="white"
              text="Sign up"
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
          text={'Welcome to Tap Hoa Viet.'}
        />
      </Overlay>

      <Overlay isVisible={loader}>
        <Loader text={'Creating your account, please wait..'} />
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
    // justifyContent:'center',
    // alignItems:'center'
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
});
