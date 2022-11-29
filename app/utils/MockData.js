import React from 'react';
import {appColors} from './appColors';
import {Image} from 'react-native';

export const reviews = [
  {
    name: 'Amusoftech',
    detail: 'Wonderful jean, perfect gift for my girl for our anniversary!',
    count: 4,
    image: require('../static/images/rate/1.png'),
  },
  {
    name: 'Aman Deep',
    detail: 'Nike Dri-FIT is a polyester fabric designed to help you ',
    count: 3,
    image: require('../static/images/rate/1.png'),
  },
];

export const categoriesList = [
  {
    label: 'Shoes',
    Icon: () => (
      <Image
        style={{width: 60, height: 60}}
        source={require('../Icons/shoes.png')}
      />
    ),
  },
  {
    label: 'Headphones',
    Icon: () => (
      <Image
        style={{width: 60, height: 60}}
        source={require('../Icons/headphone.png')}
      />
    ),
  },
  {
    label: 'Mobiles',
    Icon: () => (
      <Image
        style={{width: 60, height: 60}}
        source={require('../Icons/mobile.png')}
      />
    ),
  },

  {
    label: 'Gaming',
    Icon: () => (
      <Image
        style={{width: 60, height: 60}}
        source={require('../Icons/gaming.png')}
      />
    ),
  },
];
export const topBrands = [
  {
    label: 'Apple Inc',
    products: '5693 Products',
    icon: 'logo-apple',
  },
  {
    label: 'Google Llc',
    products: '6613 Products',
    icon: 'logo-google',
  },
];
export const recentSearches = [
  'Amusoftech',
  'Shoes',
  'Caps',
  'Apple',
  'Google',
  'Macbook',
  'Sport weares',
];

export const deliveryTypes = [
  {
    label: 'Standard Delivery',
    subLabel: 'Order will be delivered between 3 - 5 business days',
    selected: true,
  },
  {
    label: 'Next Day Delivery',
    subLabel:
      'Place your order before 6pm and your items will be delivered the next day',
    selected: false,
  },
  {
    label: 'Nominated Delivery',
    subLabel:
      'Pick a particular date from the calendar and order will be delivered on selected date',
    selected: false,
  },
];
