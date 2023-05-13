import React, {useEffect} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../Components/Container';

import {appColors} from '../utils/appColors';

import BottomButtons from '../Components/BottomButtons';
import {SwipeListView} from 'react-native-swipe-list-view';
import Feather from 'react-native-vector-icons/Feather';
import CheckOutItem from '../Components/CheckOutItem';
import Empty from '../Components/Empty';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart} from '../redux/slices/CartSlice';
import {getTotalPrice} from '../redux/slices/totalpriceSlice';

function Cart({navigation}) {
  const cart = useSelector(state => state.cart);
  const cryptoRate = useSelector(state => state.coin.cryptoRate);
  const tPrice = useSelector(state => state.totalPrice.totalPrice);

  const dispatch = useDispatch();

  const onDeletePress = item => {
    dispatch(removeFromCart(item._id));
  };

  const totalPrice = () => {
    let totalPrice = 0;
    cart.cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return (totalPrice / cryptoRate).toFixed(5);
  };

  useEffect(() => {
    dispatch(getTotalPrice(Number(totalPrice())));
  }, [totalPrice]);

  const ItemCard = ({item}) => {
    const {product_name, price, product_img, quantity, _id} = item;
    return (
      <CheckOutItem
        name={product_name}
        image={product_img}
        price={price}
        quantity={quantity}
        id={_id}
      />
    );
  };

  return (
    <>
      <Container>
        <View style={{flex: 1, paddingVertical: scale(20)}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Feather
              name="chevron-left"
              size={scale(25)}
              color={appColors.black}
            />
          </Pressable>
          <SwipeListView
            ListEmptyComponent={() => <Empty label={'Your Cart is empty'} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item._id}`}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            data={cart.cartItems || []}
            renderItem={({item, index}) => (
              <ItemCard item={item} index={index} />
            )}
            renderHiddenItem={(data, rowMap) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Pressable
                  onPress={() => onDeletePress(data?.item)}
                  style={{
                    left: scale(15),
                    flex: scale(0.3),
                    backgroundColor: appColors.redOrange,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather
                    name={'trash'}
                    size={scale(25)}
                    color={appColors.white}
                  />
                </Pressable>
              </View>
            )}
            leftOpenValue={scale(85)}
            rightOpenValue={scale(-85)}
          />
        </View>
      </Container>
      <View style={{backgroundColor: 'red', bottom: scale(-15)}}>
        {!cart.cartItems.length == 0 && (
          <BottomButtons
            onPress={() => navigation.navigate('CheckOut', {totalPrice})}
            buttonLabel={'CHECKOUT'}
            price={totalPrice()}
          />
        )}
      </View>
    </>
  );
}

export default Cart;
