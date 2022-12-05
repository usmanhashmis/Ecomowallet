import React, {useState} from 'react';
import {View, Text, Pressable, Alert, Button} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../Components/Container';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Label from '../Components/Label';
import {appColors, shadow} from '../utils/appColors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/slices/tokenSlice';
import {BASE_URL} from '../Constants';
import {showMessage, hideMessage} from 'react-native-flash-message';

function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setisloading] = useState(false);
  const token = useSelector(state => state.token.token);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('loginData', jsonValue);
    } catch (e) {
      console.log('Error in token Saving');
    }
  };

 
  console.log(token);
  const onLogin = async () => {
    console.log("🚀 ~ file: Login.js:45 ~ onLogin ~ password:",userName, password)
    if (userName && password) {
      console.log("🚀 ~ file: Login.js:45 password:",userName, password)
      setisloading(true);
      await axios
        .post(`${BASE_URL}/users/login`, {
          username: userName,
          password: password,
        })
        .then(res => {
          if(res.data.token){
          setisloading(false);
          console.log('login data',res.data);
          storeData(res.data);
          navigation.navigate('Home');
          }else{
            setisloading(false);
            Alert.alert('Invalid','Invalid username or password');
          }
        
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Invalid username or password');
          setisloading(false);
        });
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        dispatch(setToken(value));
      }
    } catch (e) {
      console.log('error in getting');
    }
  };
  

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(65),
          marginHorizontal: scale(20),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Welcome"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Log in to Continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={setUserName}
            label="UserName"
            placeholder="alimohsin"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={setPassword}
            secureTextEntry
            label="Password"
            placeholder="Password"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('Verification')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text="Forgot password"
            style={{
              fontSize: scale(14),
              fontWeight: '500',
            }}
          />
        </Pressable>
        <CustomButton
          isLoading={isloading}
          onPress={onLogin}
          label="Log in"
          labelStyle={{fontWeight: '500'}}
        />
        <CustomButton
          onPress={() => navigation.navigate('SignUp')}
          label="Sign Up"
          labelStyle={{fontWeight: '500'}}
        />
      </View>
    </Container>
  );
}

export default Login;
