import React, {useEffect} from 'react';
import {
  View,
  LogBox,
  StyleSheet,
  ImageBackground,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../Components/Container';
import Label from '../Components/Label';
import {appColors} from '../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import TitleComp from '../Components/TitleComp';
import ReviewComp from '../Components/ReviewComp';
import BottomButtons from '../Components/BottomButtons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/slices/CartSlice';

function ProductDetails({navigation, route: {params}}) {
  const cryptoRate = useSelector(state => state.coin.cryptoRate);
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const onAddToCart = () => {
    dispatch(addToCart(params.item));
  };

  const _renderBottom = () => {
    return (
      <BottomButtons
        onPress={() => {
          onAddToCart();
          navigation.navigate('Cart');
        }}
        price={(params.item.price / cryptoRate).toFixed(5)}
        buttonLabel="ADD"
      />
    );
  };

  return (
    <>
      <Container bodyStyle={{paddingHorizontal: scale(0)}} isScrollable>
        <View>
          <ImageBackground
            style={{height: scale(400), width: '100%'}}
            resizeMode="cover"
            source={{uri: params.item.product_img}}>
            <View
              style={{
                marginTop: scale(40),
                paddingHorizontal: scale(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={scale(25)}
                  color={appColors.black}
                />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={{paddingHorizontal: scale(20), marginBottom: scale(100)}}>
          <View style={{paddingVertical: scale(20)}}>
            <Label
              text={params.item.product_name}
              style={{fontWeight: '700', fontSize: scale(30)}}
            />
          </View>

          <View
            style={{
              paddingVertical: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}></View>

          <View style={{paddingVertical: scale(5)}}>
            <TitleComp heading={'Details'} />
            <View style={{paddingVertical: scale(20)}}>
              <Label
                text={params.item.description}
                style={{fontSize: scale(14), lineHeight: scale(25)}}
              />
            </View>
          </View>
          <View>
            <TitleComp heading={'Reviews'} />
            <Pressable
              onPress={() => navigation.navigate('WriteReview', {name})}>
              <Label text="Write your review" style={styles.wrtitle} />
            </Pressable>

            <ReviewComp />
          </View>
        </View>
      </Container>
      {_renderBottom()}
    </>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  sizeContainer: {
    flex: 0.47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.white,
    padding: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(20),
    borderWidth: scale(0.4),
    borderColor: appColors.gray,
  },
  itemColor: {
    height: scale(20),
    width: scale(20),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
  },
  wrtitle: {
    paddingVertical: scale(10),
    fontSize: scale(14),
    color: appColors.primary,
  },
});
