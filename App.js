import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';

import Web3 from 'web3';
import Walletcall from "./web3/Walletcall";
export default function App() {
  const web3 = new Web3(
    'https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka',
  );
const newWallet = web3.eth.accounts.wallet.create(1);
const newAccount = newWallet[0];
console.log(newAccount);
  return (
    <>
    <Walletcall/>

    </>
    //hashmi branch
  );
}


