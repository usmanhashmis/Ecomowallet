import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Alert,
} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ContractAbi, ContractAbiMatic} from './abi';
import {contractAddress, contractAddressMatic} from './contractAddress';
import {ethers} from 'ethers';

import Web3 from 'web3';
import CustomButton from '../app/Components/CustomButton';
import {useSelector} from 'react-redux';

let result;
export default function WalletConnectExperience() {
  const [confirm, setConfirm] = useState(false);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const [useraddress, setUserAddress] = useState();
  const [balll, setBalll] = useState();
  const tPrice = useSelector(state => state.totalPrice.totalPrice);

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
      const value = ethers.utils.parseEther(tPrice.toString())._hex;
      console.log(value);
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddress}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx).then(() => {
        console.log('your assets transfer to contract');
        Alert.alert('Balance trasfered');
        setConfirm(true);
      });
    } catch (err) {
      console.log('eee', err);
      Alert.alert('insufficient funds');
    }
  });

  const paywithmatic = React.useCallback(async () => {
    console.log('ethAmount');
    try {
      const transaction = await maticcontract.methods.transfer().encodeABI();
      console.log('ethdar', transaction);
      const value = ethers.utils.parseEther(tPrice.toString())._hex;
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddressMatic}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx).then(() => {
        console.log('your assets transfer to contract');
        Alert.alert('insufficient funds');
        setConfirm(true);
      });
    } catch (err) {
      console.log('eee', err);
      Alert.alert('');
    }
  });
  const chainid = async () => {
    const chainId = await web3.eth.getChainId();
    console.log(chainId);
    if (chainId == 5) {
      setWeb3(web3);
    }
  };

  const confirmassets = React.useCallback(async () => {
    console.log('maticAmount');
    try {
      const transaction = await maticcontract.methods
        .confirmation(connector.accounts[0])
        .encodeABI();
      console.log('ethdar', transaction);
      const value = ethers.utils.parseEther((0.0).toString())._hex;
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddressMatic}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx).then(() => {
        console.log('your assets withdrew onwer');
        Alert.alert('Payment Completed');
        setConfirm(false);
      });
    } catch (err) {
      console.log('eee', err);
    }
  });

  const confirmassetsether = React.useCallback(async () => {
    console.log('maticAmount');
    try {
      const transaction = await contract.methods
        .confirmation(connector.accounts[0])
        .encodeABI();
      console.log('ethdar', transaction);
      const value = ethers.utils.parseEther((0.0).toString())._hex;
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddressMatic}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx).then(() => {
        console.log('your assets withdrew onwer');
        Alert.alert('Payment Completed');
        setConfirm(false);
      });
    } catch (err) {
      console.log('eee', err);
    }
  });

  return (
    <View>
      {connector.connected ? (
        <>
          {selectCoin === 'Polygon' ? (
            <>
              {!confirm && (
                <CustomButton
                  onPress={paywithmatic}
                  label="Pay MATIC"></CustomButton>
              )}

              {confirm ? (
                <Button onPress={confirmassets} title="Release Matic"></Button>
              ) : (
                <Text></Text>
              )}
            </>
          ) : (
            <>
              {!confirm && (
                <CustomButton
                  onPress={paywithether}
                  label="Pay Ether"></CustomButton>
              )}

              {confirm ? (
                <Button
                  onPress={confirmassetsether}
                  title="Release Ether"></Button>
              ) : (
                <Text></Text>
              )}
            </>
          )}
        </>
      ) : (
        <Text
          style={{
            color: 'black',
          }}>
          Not connect
        </Text>
      )}
    </View>
  );
}
