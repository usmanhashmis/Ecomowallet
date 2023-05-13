import * as React from 'react';
import {StyleSheet, View, Platform, Button} from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WalletConnectExperience from '../WalletConnectExperience';
import Sign from './Sign';
const SCHEME_FROM_APP_JSON = 'walletconnect-example';

export default function Walletcall({totalPrice}) {
  return (
    <WalletConnectProvider
      redirectUrl={
        Platform.OS === 'web'
          ? window.location.origin
          : `${SCHEME_FROM_APP_JSON}://`
      }
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}>
      <View style={styles.container}>
        <WalletConnectExperience />
        <Sign totalPrice={totalPrice} />
      </View>
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
