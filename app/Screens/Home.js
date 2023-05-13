import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {categoriesList} from '../utils/MockData';
import Container from '../Components/Container';
import SearchBox from '../Components/SearchBox';
import {scale} from 'react-native-size-matters';
import TitleComp from '../Components/TitleComp';
import {appColors, shadow} from '../utils/appColors';
import Label from '../Components/Label';
import ProductCard from '../Components/ProductCard';

import TouchableRipple from 'react-native-touch-ripple';
import {useSelector, useDispatch} from 'react-redux';
import {getproducts} from '../redux/slices/productsapi';
import {getCryptoPrice} from '../redux/slices/CryptoPriceapi';
import {setToken} from '../redux/slices/tokenSlice';
import {getRate, getSymbol} from '../redux/slices/selectedCoinSlice';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const Home = ({navigation}) => {
  const products = useSelector(state => state.productReducer.products);
  const cryptoprices = useSelector(state => state.crypto.cryptoPrices);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const token = useSelector(state => state.token.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getCryptoPrice());
  }, [dispatch]);

  // useEffect(() => {
  //   cryptoprices.map(item => {
  //     if (selectCoin === item.name) {
  //       dispatch(getRate(item.rate));
  //     }
  //   });
  // }, [selectCoin]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch(getCryptoPrice());
  //     cryptoprices.map(item => {
  //       if (selectCoin === item.name) {
  //         dispatch(getRate(item.rate));
  //       }
  //     });
  //   }, 60000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [cryptoprices]);

  const RenderTitle = ({heading, rightLabel}) => {
    return <TitleComp heading={heading} rightLabel={rightLabel} />;
  };

  const Product = ({item}) => {
    return <ProductCard navigation={navigation} item={item} />;
  };

  return (
    <Container isScrollable style={styles.container}>
      <SearchBox
        onFoucs={() => navigation.navigate('Search')}
        navigation={navigation}
      />

      <View style={{paddingVertical: scale(15)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <RenderTitle heading="Categories" />
          <Text>token {token}</Text>
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
          ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
          renderItem={({item, index}) => {
            const {label, Icon} = item;
            return (
              <View key={index} style={{alignItems: 'center'}}>
                <TouchableRipple
                  onPress={() =>
                    navigation.navigate('AllProducts', {label: label})
                  }
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
        <View
          style={{
            paddingBottom: scale(20),
            paddingTop: scale(8),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <RenderTitle heading="New Arrivals" />
          <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        {!products.length == 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            horizontal
            data={products}
            renderItem={({item, index}) => <Product key={index} item={item} />}
          />
        ) : (
          <ActivityIndicator
            style={{paddingTop: 130}}
            size={50}
            color={appColors.primary}
          />
        )}
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
