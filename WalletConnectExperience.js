import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, StyleSheet,View,Typography} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

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

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const WithdrewBlance = async() => {
   
    setUserAddress(connector.accounts[0]);
    let params = [{
      from : {useraddress},
      to: "0x8e232e1A06923204942524fFC81499ae80871cb5",
      gas: Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16),
      value: Number(withdrawbal).toString(16)
    }]
     result =  await window.ethereum.request({method: "eth_sendTransaction",params}).catch(err=>{
      console.log("trans",err);
    })
    console.log("done");
  }

  return (
    <View>
  
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect a wallet" />
      ) : (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <Button onPress={killSession} label="Log out" />   
          <Button onPress={WithdrewBlance} label="deposit"></Button>    
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
