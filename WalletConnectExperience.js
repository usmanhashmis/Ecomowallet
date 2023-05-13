import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Typography,
} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ContractAbi, ContractAbiMatic} from './web3/abi';
import {contractAddress, contractAddressMatic} from './web3/contractAddress';
import Web3 from 'web3';
import {scale} from 'react-native-size-matters';
import CustomButton from './app/Components/CustomButton';
const web3 = new Web3(
  'https://eth-goerli.g.alchemy.com/v2/YPhlCYJ_fLdms1LpSRNs1n6rfcIqGHT9',
);

const shortenAddress = address => {
  return `${address.slice(0, 7)}...${address.slice(
    address.length - 6,
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
  const [useraddress, setUserAddress] = useState();
  const [balll, setBalll] = useState();

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    console.log(connector);
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <>
      {!connector.connected ? (
        <View style={{paddingTop: 30}}>
          <CustomButton onPress={connectWallet} label="Connect to wallet" />
        </View>
      ) : (
        <>
          <View
            style={{
              marginVertical: scale(40),
              borderWidth: scale(1),
              borderColor: 'rgba(232, 135, 44)',
              borderRadius: scale(20),
              padding: scale(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              selectable
              style={{
                fontSize: 15,
                paddingRight: 10,
                color: 'black',
              }}>
              {shortenAddress(connector.accounts[0])}
            </Text>
          </View>
          <CustomButton onPress={killSession} label="Log out" />
          {console.log(connector.accounts[0])}
          <Text>{balll}</Text>
        </>
      )}
    </>
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
