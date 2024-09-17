import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
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
import Feather from 'react-native-vector-icons/Feather';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Categories = ({navigation, route}) => {
  const products = useSelector(state => state.productReducer.products);
  const cryptoprices = useSelector(state => state.crypto.cryptoPrices);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const token = useSelector(state => state.token.token);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const textInputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  useEffect(() => {
    if (route?.params?.categoryID) {
      const filtered = products?.filter(item =>
        item?.categoryWise
          ?.toLowerCase()
          .includes(route?.params?.categoryID.toLowerCase()),
      );
      setSearchResults(filtered);
    }
  }, [route?.params?.categoryID]);

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getCryptoPrice());
  }, [dispatch]);

  const handleSearch = () => {
    const filteredData = products?.filter(item =>
      item?.product_name?.toLowerCase().includes(searchText.toLowerCase()),
    );

    setSearchResults(filteredData);
  };

  const Product = ({item}) => {
    return <AllProductCard navigation={navigation} item={item} />;
  };

  return (
    <Container isScrollable bodyStyle={{marginTop: heightPercentageToDP(2)}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={scale(25)}
            color={appColors.black}
          />
        </Pressable>
        <View
          style={{
            flex: 1,
            marginLeft: scale(10),
            paddingHorizontal: scale(20),
            borderRadius: scale(20),
            // borderWidth: 1,
            alignItems: 'center',
            // backgroundColor: appColors.white,
            // shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            flexDirection: 'row',
            height: scale(40),
            marginRight: 10,
          }}>
          {/* <Feather name="search" size={scale(20)} color={appColors.black} />
          <TextInput
            ref={textInputRef}
            placeholder="Search Products"
            value={searchText}
            autoCapitalize="none"
            onChangeText={text => setSearchText(text)}
            style={{flex: 1, paddingLeft: scale(10)}}
          /> */}
        </View>
      </View>
      <View style={styles.primaryTextContainer}>
        <Text style={styles.primaryText}>
          {route?.params?.categoryID} Products
        </Text>
      </View>
      <ScrollView style={{marginTop: 20, marginLeft: 7}}>
        {!searchResults?.length == 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            data={searchResults}
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

export default Categories;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between', // Distribute the products vertically
  },
  primaryText: {
    color: appColors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryTextContainer: {
    paddingVertical: 20,
  },
});
