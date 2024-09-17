import React, {useEffect, useRef, useState} from 'react';
import {View, Pressable, TextInput, Button, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {changeCoin} from '../redux/slices/selectedCoinSlice';
import axios from 'axios';
import {BASE_URL} from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slices/tokenSlice';

export default function SearchBox({
  autoFocus,
  onFoucs,
  rightIcon,
  navigation,
  hide,
}) {
  const dispatch = useDispatch();
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const [coinsArray, setCoinsArray] = useState([]);
  const [display, setDisplay] = useState('none');
  const [logDisplay, setLogDisplay] = useState('none');
  const [displayEther, setDisplayEther] = useState('none');
  const [displayMatic, setDisplayMatic] = useState('none');
  const token = useSelector(state => state.token.token);

  useEffect(() => {
    dispatch(changeCoin('Tether'));
    axios
      .get(`${BASE_URL}/prices/getprices`)
      .then(res => setCoinsArray(res.data[0].coin_name))
      .catch(e => console.log(e.message));
  }, []);

  const pressCrypto = () => {
    if (display === 'none') setDisplay('flex');
    else setDisplay('none');

    coinsArray.map(item => {
      if (item === 'Ethereum') setDisplayEther('flex');
      if (item === 'Polygon') setDisplayMatic('flex');
    });
  };
  const pressLog = () => {
    if (logDisplay === 'none') setLogDisplay('flex');
    else setLogDisplay('none');
  };

  const etherPress = () => {
    dispatch(changeCoin('Ethereum'));
    setDisplay('none');
  };

  const maticPress = () => {
    dispatch(changeCoin('Polygon'));
    setDisplay('none');
  };

  const USDTPress = () => {
    dispatch(changeCoin('Tether'));
    setDisplay('none');
  };

  return (
    <View
      style={{
        marginTop: scale(5),
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(20),
          borderRadius: scale(20),
          // borderWidth: 1,
          alignItems: 'center',
          backgroundColor: appColors.white,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          flexDirection: 'row',
          height: scale(40),
          marginRight: 10,
        }}>
        <Feather name="search" size={scale(20)} color={appColors.black} />
        <TextInput
          placeholder="Search Products"
          showSoftInputOnFocus={false}
          onFocus={onFoucs && onFoucs}
          style={{flex: 1, paddingLeft: scale(10)}}
        />
      </View>

      <View
        style={{
          flexDirection: 'column',
        }}>
        <Pressable
          onPress={pressCrypto}
          style={{
            borderRadius: scale(20),
            width: scale(60),
            height: scale(40),
            backgroundColor: appColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: scale(0),
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            {selectCoin}
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'column',
            display: display,
            marginTop: scale(40),
            marginLeft: scale(5),
            position: 'absolute',
            zIndex: 1,
          }}>
          <View
            style={{
              display: displayEther,
            }}>
            <Button
              onPress={etherPress}
              title="Ether"
              color={appColors.primary}
            />
          </View>
          <View
            style={{
              display: displayMatic,
            }}>
            <Button
              onPress={maticPress}
              title="Matic"
              color={appColors.primary}
            />
          </View>
          <Button onPress={USDTPress} title="USDT" color={appColors.primary} />
        </View>
      </View>
    </View>
  );
}
