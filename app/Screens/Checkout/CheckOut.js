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

export default function CheckOut({navigation, route}) {
  const cart = useSelector(state => state.cart);

  const totalPrice = (Number(route.params.totalPrice()) + 0.00001).toFixed(5);

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
            borderColor: appColors.lightGray,
            borderBottomWidth: scale(2),
            borderTopWidth: scale(2),
          }}>
          <View
            style={{
              paddingVertical: scale(20),
              paddingHorizontal: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Sub Total"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '30%',
              }}
            />
            <Label
              text={route.params.totalPrice()}
              style={{fontWeight: '800'}}
            />
          </View>

          <View
            style={{
              paddingVertical: scale(20),
              paddingHorizontal: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Gass Fee"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '30%',
              }}
            />
            <Label text="0.00001 wie" style={{fontWeight: '800'}} />
          </View>
          <View
            style={{
              paddingVertical: scale(20),
              paddingHorizontal: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Total Price"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '30%',
              }}
            />
            <Label text={totalPrice} style={{fontWeight: '800'}} />
          </View>
        </View>

        <View style={{flex: 1, paddingHorizontal: scale(20)}}></View>

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
