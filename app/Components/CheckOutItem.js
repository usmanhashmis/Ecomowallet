import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Label from './Label';
import Feather from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';
import {incrementQuantity, decrementQuantity} from '../redux/slices/CartSlice';

export default function CheckOutItem({
  showQuantity,
  hideCounter,
  noBg,
  image,
  name,
  price,
  quantity,
  id,
}) {
  const cryptoRate = useSelector(state => state.coin.cryptoRate);
  const dispatch = useDispatch();

  const minusPressed = () => {
    dispatch(decrementQuantity(id));
  };
  const plusPressed = () => {
    dispatch(incrementQuantity(id));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: noBg ? 'transparent' : appColors.lightGray,
        borderRadius: scale(15),
      }}>
      <Image
        style={{
          height: scale(130),
          width: scale(130),
          borderRadius: scale(15),
          backgroundColor: appColors.darkGray,
        }}
        source={{uri: image}}
      />

      <View
        style={{
          marginLeft: scale(10),
          justifyContent: 'space-between',
          paddingVertical: scale(10),
        }}>
        <Label text={name?.substring(0, 20)} style={{fontWeight: '600'}} />
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <Label
            text={(price / cryptoRate).toFixed(5)}
            style={{
              fontSize: scale(18),
              fontWeight: '500',
              color: appColors.primary,
            }}
          />
          {showQuantity && (
            <Label
              text={`Qty ${quantity}`}
              style={{
                fontSize: scale(15),
                fontWeight: '400',
                marginLeft: 30,
              }}
            />
          )}
        </View>
        {!hideCounter && (
          <View
            style={{
              backgroundColor: appColors.lightGray,
              flexDirection: 'row',
              borderRadius: scale(5),
              overflow: 'hidden',
              alignItems: 'center',
              paddingHorizontal: scale(20),
              height: scale(35),
            }}>
            <Pressable onPress={minusPressed} style={{paddingRight: 10}}>
              <Feather name="minus" size={scale(20)} color={appColors.black} />
            </Pressable>
            <Label text={quantity} />
            <Pressable onPress={plusPressed} style={{paddingLeft: 10}}>
              <Feather name="plus" size={scale(20)} color={appColors.black} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
