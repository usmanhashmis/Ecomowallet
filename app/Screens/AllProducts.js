import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
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
import AllProductCard from '../Components/AllProductCard';

const AllProducts = ({navigation, route}) => {
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

  const Product = ({item}) => {
    return <AllProductCard navigation={navigation} item={item} />;
  };
 
  return (
    <Container isScrollable style={styles.container}>
      <SearchBox
        onFoucs={() => navigation.navigate('Search')}
        navigation={navigation}
      />
      <ScrollView style={{marginTop: 20}}>
        {!products.length == 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            data={products}
            numColumns={2}
            // contentContainerStyle={styles.contentContainer}
            renderItem={({item, index}) => (
              <View style={{marginRight: scale(20)}}>
                <Product key={index} item={item} />
              </View>
            )}
          />
        ) : (
          <ActivityIndicator
            style={{paddingTop: 250}}
            size={50}
            color={appColors.primary}
          />
        )}
      </ScrollView>
    </Container>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between', // Distribute the products vertically
  },
});
