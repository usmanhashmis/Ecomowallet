import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import Container from '../../Components/Container';
import CheckOutItem from '../../Components/CheckOutItem';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import Label from '../../Components/Label';
import CustomButton from '../../Components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import CustomInput from '../../Components/CustomInput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

export default function CheckOut({navigation, route}) {
  const cart = useSelector(state => state.cart);
  const [promo, setPromo] = useState();
  const [username, setUsername] = useState();
  const totalPrice = (Number(route.params.totalPrice()) + 0.00001).toFixed(5);

  const pressPromo = () => {
    axios
      .post('/giftoff/getalldiscounts', {
        promocode: promo,
        username: username,
      })
      .then(res => {
        console.log(res.data);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Applied Successfully',
        });
      })
      .catch(err => {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          textBody: err.response.data,
        });
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUsername(value);
      }
    } catch (e) {
      console.log('error in getting');
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container
        isScrollable
        bodyStyle={{
          flex: 1,
          paddingVertical: scale(20),
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={scale(25)}
            color={appColors.black}
          />
        </Pressable>
        <View
          style={{paddingHorizontal: scale(20), paddingVertical: scale(20)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cart.cartItems}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            renderItem={({item, index}) => (
              <CheckOutItem
                showQuantity
                hideCounter
                noBg
                name={item.product_name}
                image={item.product_img}
                price={item.price}
                quantity={item.quantity}
              />
            )}
          />
        </View>
        <View
          style={{
            borderColor: appColors.primary,
            borderBottomWidth: scale(2),
            borderTopWidth: scale(2),
          }}>
          <View
            style={{
              // paddingVertical: scale(20),
              paddingHorizontal: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Sub Total"
              style={{fontWeight: '350', fontSize: scale(16)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderStyle: 'dashed',
                width: '30%',
              }}
            />
            <Label
              text={route.params.totalPrice()}
              style={{fontWeight: '350'}}
            />
          </View>

          <View
            style={{
              // paddingVertical: scale(20),
              paddingHorizontal: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Gass Fee"
              style={{fontWeight: '350', fontSize: scale(16)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderStyle: 'dashed',
                width: '30%',
              }}
            />
            <Label text="0.00001" style={{fontWeight: '350'}} />
          </View>
          <View
            style={{
              // paddingVertical: scale(20),
              paddingHorizontal: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: scale(2),
            }}>
            <Label
              text="Total"
              style={{fontWeight: '850', fontSize: scale(16)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderStyle: 'dashed',
                width: '30%',
              }}
            />
            <Label text={totalPrice} style={{fontWeight: '850'}} />
          </View>
        </View>

        <View style={{flex: 1, paddingHorizontal: scale(20)}}></View>

        {/* <View style={{flexDirection: 'row'}}> */}
        <View style={{marginLeft: '40%'}}>
          <CustomInput placeholder="Enter PromoCode" onChangeText={setPromo} />
        </View>
        <CustomButton
          onPress={pressPromo}
          label="APPLY"
          style={{marginLeft: '40%', backgroundColor: appColors.primary}}
        />
        {/* </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: scale(20),
            paddingVertical: scale(30),
          }}>
          <CustomButton
            label="CHECK ADDRESS"
            onPress={() => navigation.navigate('CheckOutAddress', {totalPrice})}
          />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
