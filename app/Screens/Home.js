import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {categoriesList} from '../utils/MockData';
import Container from '../Components/Container';
import SearchBox from '../Components/SearchBox';
import {scale} from 'react-native-size-matters';
import TitleComp from '../Components/TitleComp';
import {appColors, shadow} from '../utils/appColors';
import Label from '../Components/Label';
import ProductCard from '../Components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableRipple from 'react-native-touch-ripple';
import {useSelector, useDispatch} from 'react-redux';
import {getproducts} from '../redux/slices/productsapi';
import {getCryptoPrice} from '../redux/slices/CryptoPriceapi';
import {setToken} from '../redux/slices/tokenSlice';
import {getRate} from '../redux/slices/selectedCoinSlice';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import axios from 'axios';

// const {width,height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const products = useSelector(state => state.productReducer.products);
  const cryptoprices = useSelector(state => state.crypto.cryptoPrices);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const [hide, setHide] = useState(true);
  // const [disData, setDisData] = useState({
  //   amount,
  //   coin,
  //   promocode,
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getCryptoPrice());
    getData();
    getDiscount();
  }, [dispatch]);

  useEffect(() => {
    cryptoprices?.map(item => {
      if (selectCoin === item.name) {
        dispatch(getRate(item.rate));
      }
    });
  }, [selectCoin]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getCryptoPrice());
      cryptoprices?.map(item => {
        if (selectCoin === item.name) {
          dispatch(getRate(item.rate));
        }
      });
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [cryptoprices]);

  const RenderTitle = ({heading, rightLabel}) => {
    return <TitleComp heading={heading} rightLabel={rightLabel} />;
  };

  const Product = ({item}) => {
    return <ProductCard navigation={navigation} item={item} />;
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        dispatch(setToken(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDiscount = () => {
    axios
      .get('/giftoff/getdiscount')
      .then(res => {
        // setDisData({...disData, amount: res.data.amount});
      })
      .catch(err => console.log(err));
  };

  return (
    <Container isScrollable style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setHide(!hide)}>
        <View>
          <SearchBox
            onFoucs={() => navigation.navigate('Search')}
            navigation={navigation}
            hide={hide}
          />
          <View
            style={{
              marginTop: '3%',
              marginHorizontal: '3%',
              height: '13%',
              borderRadius: 10,
              width: '94%',
              backgroundColor: 'white',
            }}>
            <Text style={{padding: 15, textAlignments: 'center'}}>
              {`To get Exciting discount \n ${selectCoin} enter promo code`}
            </Text>
            <Text>BEBE</Text>
          </View>
          <View style={{paddingVertical: scale(15)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RenderTitle heading="Categories" />

              <CountdownCircleTimer
                isPlaying
                duration={60}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={60}
                onComplete={() => {
                  return {shouldRepeat: true, delay: 1};
                }}>
                {({remainingTime}) => <Text>{remainingTime}</Text>}
              </CountdownCircleTimer>
            </View>

            <FlatList
              style={{marginTop: scale(15)}}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categoriesList}
              ItemSeparatorComponent={() => (
                <View style={{padding: scale(10)}} />
              )}
              renderItem={({item, index}) => {
                const {label, Icon} = item;
                return (
                  <View key={index} style={{alignItems: 'center'}}>
                    <TouchableRipple
                      onPress={() => {}}
                      rippleColor={appColors.primary}
                      // rippleContainerBorderRadius={scale(40)}
                      rippleDuration={800}
                      style={{
                        ...shadow,
                        backgroundColor: appColors.white,
                        height: scale(70),
                        width: scale(70),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: scale(40),
                      }}>
                      <Icon />
                    </TouchableRipple>
                    <View style={{marginTop: scale(15)}}>
                      <Label text={label} style={{fontSize: scale(14)}} />
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View>
            <View style={{paddingBottom: scale(20), paddingTop: scale(8)}}>
              <RenderTitle heading="Top Products" />
            </View>
            {!products?.length == 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View style={{padding: scale(10)}} />
                )}
                horizontal
                data={products}
                renderItem={({item, index}) => (
                  <Product key={index} item={item} />
                )}
              />
            ) : (
              <ActivityIndicator
                style={{paddingTop: 130}}
                size={50}
                color={appColors.primary}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
