import React from 'react';
import {View, Pressable, Image} from 'react-native';
import Walletcall from '../../../web3/Walletcall';
import {scale} from 'react-native-size-matters';
import Container from '../../Components/Container';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../utils/appColors';
import CustomButton from '../../Components/CustomButton';

export default function CheckoutPayment({navigation, route}) {
  const {totalPrice} = route.params;

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
      <View style={{paddingTop: 10, alignItems: 'center'}}>
        <Image
          style={{width: 140, height: 100}}
          source={require('../../Icons/Metamask.png')}
        />
      </View>
      <View style={{paddingVertical: scale(10), alignItems: 'center'}}>
        <View style={{paddingBottom: 50}}>
          <Walletcall totalPrice={totalPrice} />
        </View>
      </View>
    </Container>
  );
}
