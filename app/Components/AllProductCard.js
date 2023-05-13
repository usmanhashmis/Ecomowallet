import React, {useEffect} from 'react';
import {View, Text, Pressable, Image, LogBox} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Label from './Label';
import {useSelector, useDispatch} from 'react-redux';
import {getCryptoPrice} from '../redux/slices/CryptoPriceapi';

export default function AllProductCard({navigation, item}) {
  const {product_name, description, price, product_img} = item;

  const cryptoRate = useSelector(state => state.coin.cryptoRate);
  const coinSymbol = useSelector(state => state.coin.coinSymbol);

  return (
    <View
      style={{
        backgroundColor: appColors.white,
        borderRadius: scale(15),
      }}>
      <Pressable
        onPress={() => navigation.navigate('ProductDetails', {item})}
        style={{}}>
        <View
          style={{
            height: scale(150),
            width: scale(150),
            // backgroundColor: appColors.lightGray,
          }}>
          <Image
            // resizeMode="contain"
            style={{
              flex: 1,
              width: scale(150),
              borderRadius: scale(15),
            }}
            source={{uri: product_img}}
          />
        </View>
        <View style={{padding: scale(3)}}>
          <Label
            text={product_name?.substring(0, 10)}
            style={{fontSize: scale(15), fontWeight: '500'}}
          />

          <View style={{paddingVertical: scale(2)}}>
            <Label
              text={description?.substring(0, 15)}
              style={{fontSize: scale(11), color: appColors.darkGray}}
            />
          </View>

          <View style={{paddingVertical: scale(5)}}>
            <Label
              text={(price / cryptoRate).toFixed(9)}
              style={{
                fontSize: scale(15),
                color: appColors.primary,
                fontWeight: '500',
              }}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
