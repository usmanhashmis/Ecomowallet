import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,Image,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
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
<<<<<<< HEAD
=======
import axios from 'axios';
import {Card, Button , Title ,Paragraph } from 'react-native-paper';
// const {width,height} = Dimensions.get('window');
>>>>>>> 0681767 (neww)

const Home = ({navigation}) => {
  const products = useSelector(state => state.productReducer.products);
  const cryptoprices = useSelector(state => state.crypto.cryptoPrices);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
<<<<<<< HEAD
  const token = useSelector(state => state.token.token);
=======
  const [hide, setHide] = useState(true);
   const [disData, setDisData] = useState([]);
>>>>>>> 0681767 (neww)

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getproducts());
    dispatch(getCryptoPrice());
  }, [dispatch]);

<<<<<<< HEAD
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
=======
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
>>>>>>> 0681767 (neww)

  const RenderTitle = ({heading, rightLabel}) => {
    return <TitleComp heading={heading} rightLabel={rightLabel} />;
  };

  const Product = ({item}) => {
    return <ProductCard navigation={navigation} item={item} />;
  };

<<<<<<< HEAD
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
=======
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
        setDisData(res.data);
        console.log("new",disData);
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
       
       <Card style={Styles.container}>
       {/* <Card.Actions> 
          <Button>{"Close"}</Button>
        </Card.Actions> */}
          {disData?.map((item,index)=>(
          <View key={index}>
            {item.coin=='Ethereum'? ( <ImageBackground source={{uri: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023'}}  style={{width: 55, height: 55 }}>
          </ImageBackground>):(  <ImageBackground source={{uri: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=023'}}  style={{width: 55, height: 55 }}>
          </ImageBackground>)}
               <View  style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
               <Text style={Styles.textshadow}  selectable >PROMO: {item.promocode}</Text>
               <Text style={{fontWeight:'bold'}}>{item.amount} {item.coin}</Text>
             </View>
          </View>   
          ))}       
      </Card> 
 
     
          {/* <View
            style={{
              marginTop: '3%',
              marginHorizontal: '3%',
              height: '10%',
              borderRadius: 10,
              width: '92%',
              backgroundColor: 'white',
            }}>
            <Text style={{padding: 15, textAlignments: 'center'}}>
              {`To get Exciting discount \n ${selectCoin} enter promo code`}
            </Text>
            <Text>BEBE</Text>
          </View> */}
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
>>>>>>> 0681767 (neww)
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

<<<<<<< HEAD
const styles = StyleSheet.create({});
=======
const styles = StyleSheet.create({});

const Styles = StyleSheet.create({
  container :{
      alignContent:'center',
      margin:4,
      marginLeft:20,
      marginRight:20
  },
  textshadow:{
    fontSize:30,
    color:'#0f0f0f',
   
    fontFamily:'sans-serif',
    paddingLeft:30,
    paddingRight:30,
    textShadowColor:'#020202',
    textShadowOffset:{width: -1, height: -1},
    textShadowRadius:3,
  },
})
>>>>>>> 0681767 (neww)
