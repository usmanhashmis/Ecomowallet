import React, {useState} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../Components/Container';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Label from '../Components/Label';
import {appColors, shadow} from '../utils/appColors';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

import axios from 'axios';
import {BASE_URL} from '../Constants';

export default function SignUp({navigation}) {
  const [userName, SetUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setisloading] = useState(false);

  const onSignUp = async () => {
    if (!(userName && email && password)) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Fields are empty',
        textBody: 'Fill all the fields to continue',
      });
    }
    if (userName && email && password) {
      console.log("🚀 ~ file: SignUp.js:24 ~ onSignUp ~ userName:", userName,email,password)
      console.log('ali');
      setisloading(true);
      await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("🚀 ~ file: SignUp.js:34 ~ .then ~ data:", data);
        navigation.navigate('Login');
        setisloading(false);
      })
      .catch(error => {
        console.log(error.message);
        setisloading(false);
      });
      
    }
  };

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: '30%',
          marginHorizontal: '5%',
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
        <View style={{paddingTop: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              color: appColors.darkGray,
            }}
          />
        </View>
        <View>
          <CustomInput onChangeText={SetUserName} placeholder="USERNAME" />
          <View style={{paddingLeft: '5%'}}>
            <Text>{`\u25CF  `}UserName must be Unique</Text>
            <Text>{`\u25CF  `}Between 8 to 10 Characters</Text>
          </View>
        </View>
        <View>
          <CustomInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="EMAIL ADDRESS"
          />
        </View>
        <View style={{marginBottom: 20}}>
          <CustomInput
            onChangeText={setPassword}
            secureTextEntry
            placeholder="PASSWORD"
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
