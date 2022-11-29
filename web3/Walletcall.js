import * as React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WalletConnectExperience from '../WalletConnectExperience';
import Sign from './Sign';
const SCHEME_FROM_APP_JSON = 'walletconnect-example';

export default function Walletcall() {
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
        <Sign/>
      </View>
    </WalletConnectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
