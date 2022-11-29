import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import {appColors} from '../utils/appColors';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import ProductDetails from '../Screens/ProductDetails';
import Cart from '../Screens/Cart';
import CheckOut from '../Screens/Checkout/CheckOut';
import CheckOutAddress from '../Screens/Checkout/CheckoutAddress';
import CheckOutPayment from '../Screens/Checkout/CheckoutPayment';
import {scale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: scale(10),
            marginHorizontal: 10,
            height: 50,

            borderRadius: 15,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                size={25}
                color={focused ? appColors.primary : 'gray'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarStyle: {display: 'none'},
            tabBarIcon: ({focused}) => (
              <Icon
                name="cart"
                size={30}
                color={focused ? appColors.primary : 'gray'}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="ios-person"
                size={25}
                color={focused ? appColors.primary : 'gray'}
              />
            ),
          }}
        />

        <Tab.Screen
          name="SignUp"
          component={SignUp}
          options={{
            tabBarButton: props => null,
          }}
        />
        <Tab.Screen
          name="CheckOut"
          component={CheckOut}
          options={{
            tabBarButton: props => null,
            tabBarStyle: {display: 'none'},
          }}
        />

        <Tab.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            tabBarButton: props => null,
            tabBarStyle: {display: 'none'},
          }}
        />

        <Tab.Screen
          name="CheckOutAddress"
          component={CheckOutAddress}
          options={{
            tabBarButton: props => null,
            tabBarStyle: {display: 'none'},
          }}
        />
        <Tab.Screen
          name="CheckOutPayment"
          component={CheckOutPayment}
          options={{
            tabBarButton: props => null,
            tabBarStyle: {display: 'none'},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
