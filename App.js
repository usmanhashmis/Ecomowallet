import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WalletConnectExperience from './WalletConnectExperience';
 
const SCHEME_FROM_APP_JSON = 'walletconnect-example';
import Walletcall from "./web3/Walletcall";
export default function App() {
  return (
    <Walletcall/>
  );
}


