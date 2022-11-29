import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, StyleSheet,View,Typography} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import { ContractAbi , ContractAbiMatic } from "./web3/abi";
import {contractAddress , contractAddressMatic} from "./web3/contractAddress";
import Web3 from 'web3';
const web3 = new Web3("https://eth-goerli.g.alchemy.com/v2/YPhlCYJ_fLdms1LpSRNs1n6rfcIqGHT9");

const shortenAddress = address => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;
};

function Button({onPress, label}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

let result;
export default function WalletConnectExperience() {
const [useraddress,setUserAddress] = useState();
const [balll,setBalll] = useState();

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    console.log(connector);
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);


  return (
    <View>
  
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect a wallet" />
      ) : (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <Button onPress={killSession} label="Log out" />   
          {console.log(connector.accounts[0])}
          <Text>{balll}</Text>   
          
        </>
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5A45FF',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
