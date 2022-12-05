import * as React from 'react';
import {StyleSheet, View, Platform, LogBox} from 'react-native';
import TabNavigation from './app/Components/TabNavigation';
import {Provider} from 'react-redux';
import Store from './app/redux/Store';
import FlashMessage from 'react-native-flash-message';

import Web3 from 'web3';
import Walletcall from './web3/Walletcall';
export default function App() {
  const web3 = new Web3(
    'https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka',
  );
  const newWallet = web3.eth.accounts.wallet.create(1);
  const newAccount = newWallet[0];
  console.log(newAccount);
  LogBox.ignoreAllLogs();
  return (
    <>
      <Provider store={Store}>
        <TabNavigation />
        <FlashMessage position="top" />
      </Provider>
    </>
  );
}
