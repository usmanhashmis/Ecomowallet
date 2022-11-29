import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../Components/Container';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Label from '../Components/Label';
import {appColors, shadow} from '../utils/appColors';

import axios from 'axios';

export default function SignUp({navigation}) {
  const [userName, SetUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setisloading] = useState(false);

  const onSignUp = async () => {
    if (userName && email && password) {
      setisloading(true);
      await axios
        .post('/users/signup', {
          username: userName,
          email: email,
          password: password,
        })
        .then(() => {
          navigation.navigate('Login');
        })
        .catch(error => console.log(error));
    }
  };
  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(70),
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
            text="Sign Up"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={userName}
            label="UserName"
            placeholder="alimohsin"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={setEmail}
            keyboardType="email-address"
            label="Email"
            placeholder="example@gmail.com"
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
        <CustomButton
          isLoading={isloading}
          onPress={onSignUp}
          label="Sign up"
          labelStyle={{fontWeight: '500'}}
        />
      </View>
    </Container>
  );
}
