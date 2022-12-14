import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {scale} from 'react-native-size-matters';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Container from '../../Components/Container';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../utils/appColors';

export default function CheckoutAddress({navigation, route}) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState();

  const totalPrice = route.params.totalPrice;

  return (
    <Container
      isScrollable
      bodyStyle={{
        flex: 1,
        paddingVertical: scale(40),
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={scale(25)} color={appColors.black} />
      </Pressable>
      <View style={{paddingVertical: scale(30)}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}></View>

        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            containerStyle={{backgroundColor: 'transparent'}}
            onChangeText={setAddress}
            value={address}
            placeholder="Enter the Address"
            label="Adress"
          />
        </View>

        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            containerStyle={{backgroundColor: 'transparent'}}
            onChangeText={setCity}
            value={city}
            placeholder="Enter Your City"
            label="City"
          />
        </View>

        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            containerStyle={{backgroundColor: 'transparent'}}
            value={phoneNo}
            keyboardType="numeric"
            onChangeText={setPhoneNo}
            placeholder="Enter Your Mobile Number"
            label="Mobile Number"
          />
        </View>

        <View style={{paddingVertical: scale(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              containerStyle={{backgroundColor: 'transparent'}}
              value="Punjab"
              label="State"
            />
            <TextInput
              containerStyle={{backgroundColor: 'transparent'}}
              value="Pakistan"
              label="Country"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: scale(20),
            paddingVertical: scale(30),
          }}>
          <CustomButton
            label="CHECK PAYMENT"
            onPress={() => navigation.navigate('CheckOutPayment', {totalPrice})}
          />
        </View>
      </View>
    </Container>
  );
}
