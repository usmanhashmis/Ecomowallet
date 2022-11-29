import React, {useState, useEffect, useCallback} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Button} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ContractAbi, ContractAbiMatic} from './abi';
import {contractAddress, contractAddressMatic} from './contractAddress';
import {ethers} from 'ethers';

import Web3 from 'web3';
import CustomButton from '../app/Components/CustomButton';

let result;
export default function WalletConnectExperience() {
  const [useraddress, setUserAddress] = useState();
  const [balll, setBalll] = useState();
  const web3 = React.useMemo(
    () =>
      new Web3(
        new Web3.providers.HttpProvider(
          `https://eth-goerli.g.alchemy.com/v2/YPhlCYJ_fLdms1LpSRNs1n6rfcIqGHT9`,
        ),
      ),
    [],
  );
  const maticweb3 = React.useMemo(
    () =>
      new Web3(
        new Web3.providers.HttpProvider(
          `https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka`,
        ),
      ),
    [],
  );
  const contract = new web3.eth.Contract(ContractAbi, contractAddress);
  const maticcontract = new maticweb3.eth.Contract(
    ContractAbiMatic,
    contractAddressMatic,
  );

  const connector = useWalletConnect();

  const paywithether = React.useCallback(async () => {
    console.log('ethAmount');
    try {
      const transaction = await contract.methods.transfer().encodeABI();
      console.log('ethdar', transaction);
      const value = ethers.utils.parseEther((0.0001).toString())._hex;
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddress}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx);
    } catch (err) {
      console.log('eee', err);
    }
  });

  const paywithmatic = React.useCallback(async () => {
    console.log('ethAmount');
    try {
      const transaction = await maticcontract.methods.transfer().encodeABI();
      console.log('ethdar', transaction);
      const value = ethers.utils.parseEther((0.0001).toString())._hex;
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddressMatic}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx);
    } catch (err) {
      console.log('eee', err);
    }
  });
  const chainid = async () => {
    const chainId = await web3.eth.getChainId();
    console.log(chainId);
    if (chainId == 5) {
      setWeb3(web3);
    }
  };

  return (
    <View>
      {connector.connected ? (
        <>
          <Button onPress={paywithether} title="deposit"></Button>
          <Button onPress={chainid} title="chainid"></Button>
        </>
      ) : (
        <Text>Not connect</Text>
      )}
    </View>
  );
}
