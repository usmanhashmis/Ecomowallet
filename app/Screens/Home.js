import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {categoriesList} from '../utils/MockData';
import Container from '../Components/Container';
import SearchBox from '../Components/SearchBox';
import {scale} from 'react-native-size-matters';
import TitleComp from '../Components/TitleComp';
import {appColors, shadow} from '../utils/appColors';
import Label from '../Components/Label';
import ProductCard from '../Components/ProductCard/ProductCard';
import TouchableRipple from 'react-native-touch-ripple';
import {useSelector, useDispatch} from 'react-redux';
import {getproducts} from '../redux/slices/productsapi';
import {getCryptoPrice} from '../redux/slices/CryptoPriceapi';
import {getRate, getSymbol} from '../redux/slices/selectedCoinSlice';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CustomIconButton from '../Components/CustomIconButton/CustomIconButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const products = useSelector(state => state.productReducer.products);
  const cryptoprices = useSelector(state => state.crypto.cryptoPrices);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const [refeshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const images = [
    {id: '1', url: require('../static/images/banners/banner.png')},
    {id: '2', url: require('../static/images/banners/banner.png')},
    {id: '3', url: require('../static/images/banners/banner.png')},
  ];

  const renderImage = ({item}) => {
    return (
      <View>
        <Image source={item.url} style={styles.image} />
      </View>
    );
  };

  const category = [
    {
      _id: '62fe244f58f7aa8230817f89',
      title: 'Garments',
      image: require('../static/icons/garments.png'),
    },

    {
      _id: '62fe243858f7aa8230817f86',
      title: 'Electornics',
      image: require('../static/icons/electronics.png'),
    },
    {
      _id: '62fe241958f7aa8230817f83',
      title: 'Cosmentics',
      image: require('../static/icons/cosmetics.png'),
    },
    {
      _id: '62fe246858f7aa8230817f8c',
      title: 'Groceries',
      image: require('../static/icons/grocery.png'),
    },
  ];

  const handleOnRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const handleProductPress = product => {
    navigation.navigate('ProductDetails', {item: product});
  };

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
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>Categories</Text>
          </View>

          <CountdownCircleTimer
            isPlaying
            strokeWidth={5}
            duration={60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size={40}
            onComplete={() => {
              return {shouldRepeat: true, delay: 1};
            }}>
            {({remainingTime}) => <Text>{remainingTime}</Text>}
          </CountdownCircleTimer>
        </View>

        <View style={styles.categoryContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.flatListContainer}
            horizontal={true}
            data={category}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item, index}) => (
              <View style={{marginBottom: 10}} key={index}>
                <CustomIconButton
                  key={index}
                  text={item.title}
                  image={item.image}
                  onPress={() =>
                    navigation.jumpTo('categories', {categoryID: item})
                  }
                />
              </View>
            )}
          />
          <View style={styles.emptyView}></View>
        </View>
      </View>
      <View
        style={{
          margin: widthPercentageToDP(2),
          width: widthPercentageToDP(90),
          height: heightPercentageToDP(20),
          borderRadius: 10,
          overflow: 'hidden', // Add this line
        }}>
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          showsPagination={true}
          dotColor={'white'}
          activeDotColor={appColors.primary}
          nextButton={<Text style={{color: 'white'}}>Next</Text>}
          prevButton={<Text style={{color: 'white'}}>Prev</Text>}>
          {images.map(image => (
            <View key={image.id}>{renderImage({item: image})}</View>
          ))}
        </Swiper>
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
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>New Arrivals</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        {!products.length == 0 ? (
          <View style={styles.productCardContainer}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refeshing}
                  onRefresh={handleOnRefresh}
                />
              }
              contentContainerStyle={{paddingTop: 10}}
              showsHorizontalScrollIndicator={false}
              initialNumToRender={5}
              horizontal={true}
              data={products.slice(0, 4)}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => (
                <View
                  key={item._id}
                  style={{marginLeft: 5, marginBottom: 10, marginRight: 5}}>
                  <ProductCard
                    name={item.product_name}
                    image={item.product_img}
                    price={item.price}
                    quantity={item.quantity}
                    onPress={() => handleProductPress(item)}
                    onPressSecondary={() => handleAddToCat(item)}
                  />
                </View>
              )}
            />
            <View style={styles.emptyView}></View>
          </View>
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

const styles = StyleSheet.create({
  promotiomSliderContainer: {
    margin: 5,
    height: 140,
    backgroundColor: appColors.lightGray,
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // width: '100%',
    // height: 60,
    marginTop: hp(2),
  },
  primaryTextContainer: {
    // padding: 20,
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // width: '100%',
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  primaryText: {
    color: appColors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 10,
    width,
    height: heightPercentageToDP(20),
    resizeMode: 'cover',
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginHorizontal: 5, // Add horizontal margin here
    overflow: 'hidden', // To clip the border radius
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});
