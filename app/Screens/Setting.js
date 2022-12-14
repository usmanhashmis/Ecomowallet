import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../Components/Container';
import Label from '../Components/Label';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const Setting = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUsername(value);
      }
    } catch (e) {
      console.log('error in getting username');
    }
  };
  return (
    <Container>
      <View
        style={{
          flexDirection: 'column',
          marginTop: '20%',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderStyle: 'dotted',
            borderRadius: 100,
            height: 150,
            width: 150,
            paddingLeft: 8,
            borderWidth: 4,
            //   borderColor: 'red',
          }}>
          <Icon name="ios-person" size={125} color="gray" />
        </View>
        <Label text={username} style={{marginTop: '2%'}} />
      </View>
    </Container>
  );
};

export default Setting;
