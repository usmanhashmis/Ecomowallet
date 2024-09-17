import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {ContractAbi, ContractAbiMatic} from './abi';
import {contractAddress, contractAddressMatic} from './contractAddress';
import {ethers} from 'ethers';
import axios from 'axios';
import Web3 from 'web3';
import CustomButton from '../app/Components/CustomButton';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {emptyCart} from '../app/redux/slices/CartSlice';
import {useSelector, useDispatch} from 'react-redux';
import {BASE_URL} from '../app/Constants';
import {useNavigation} from '@react-navigation/native';

export default function Sign({totalPrice}) {
  const [confirm, setConfirm] = useState(false);
  const [iid, setId] = useState();
  const [userName, setUserName] = useState();
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const [logData, setLogData] = useState();
  const token = useSelector(state => state.token.token);
  const navigation = useNavigation();

  const [data, setData] = useState({
    id: 1,
    totalPrice: totalPrice,
    category: [],
  });

  useEffect(() => {
    AsyncStorage.getItem('loginData')
      .then(res => {
        const value = JSON.parse(res);
        setLogData(value);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [logData, token]);

  useEffect(() => {
    let items = cartItems.map(item => {
      return {
        price: item.price,
        productid: item.product_id,
        quantity: item.quantity,
        purchase_price: item.purchase_price,
      };
    });
    setData({...data, category: items});
  }, []);

  const orderPressed = () => {
    axios
      .post(`${BASE_URL}/orderr/order`, {
        productdetail: data.category,
        totalBill: data.totalPrice,
        email: logData.username,
        coin: selectCoin,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.id) {
          setId(response.data.id);
          dispatch(emptyCart());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const completed = id => {
    if (id) {
      axios
        .put(`${BASE_URL}/orderr/status/${id}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Success',
        textBody: 'Can not find the Order.',
        button: 'Close',
      });
    }
  };

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
      const value = ethers.utils.parseEther(totalPrice.toString())._hex;
      console.log(value);
      const tx = {
        from: `${connector.accounts}`,
        to: `${contractAddress}`,
        data: `${transaction}`,
        value: `${value}`,
      };
      await connector.sendTransaction(tx).then(() => {
        console.log('your assets transfer to contract');
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Balance Transfered Successfully',
          button: 'Close',
        });
        orderPressed();
        setConfirm(true);
      });
    } catch (err) {
      console.log('eee', err);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Canceled',
        textBody: 'Insufficient Funds in Account',
        button: 'Close',
      });
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
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Balance Transfered Successfully',
          button: 'Close',
        });
        orderPressed();
        setConfirm(true);
      });
    } catch (err) {
      console.log('eee', err);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Canceled',
        textBody: 'Insufficient Funds in Account',
        button: 'Close',
      });
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
        completed(id);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Payment Released',
          button: 'Close',
        });

        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
        setConfirm(false);
      });
    } catch (err) {
      console.log('eee', err);
    }
  });

  const confirmassetsether = React.useCallback(async () => {
    console.log('EtherAmount');
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
        completed(iid);
        console.log('your assets withdrew onwer');
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Payment Released',
          button: 'Close',
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
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
                <CustomButton
                  onPress={confirmassets}
                  label="Release Matic"></CustomButton>
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

              {confirm && (
                <CustomButton
                  onPress={confirmassetsether}
                  label="Release Ether"></CustomButton>
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
