import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Clipboard,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  Image,
} from 'react-native';
import Walletcall from '../../../web3/Walletcall';
import {scale} from 'react-native-size-matters';
import Container from '../../Components/Container';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../../utils/appColors';
import axios from 'axios';
import CustomButton from '../../Components/CustomButton';
import {useSelector} from 'react-redux';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

export default function CheckoutPayment({navigation, route}) {
  const cartItems = useSelector(state => state.cart.cartItems);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const {totalPrice} = route.params;

  const [data, setData] = useState({
    id: 1292,
    email: 'alimohsin@gmail.com',
    totalPrice: totalPrice,
    category: [],
  });

  const connector = useWalletConnect();
  useEffect(() => {
    let items = cartItems.map(item => {
      return {
        price: item.price,
        productid: item.productid,
        quantity: item.quantity,
      };
    });
    setData({...data, category: items});
  }, []);

  const orderPressed = () => {
    axios
      .post('https://drab-cyan-fossa-kilt.cyclic.app/orderr/order', {
        productdetail: data.category,
        totalBill: data.totalPrice,
        email: data.email,
        productid: data.id,
        coin: selectCoin,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          style={{width: 100, height: 100}}
          source={require('../../Icons/Metamask.png')}
        />
      </View>
      <View style={{paddingVertical: scale(10), alignItems: 'center'}}>
        <View style={{paddingBottom: 50}}>
          <Walletcall />
        </View>
      </View>
    </Container>
  );
}
