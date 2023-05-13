import React from 'react';
import {ScrollView, StyleSheet, Text, View, SafeAreaView,StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';

export default function Container({children, isScrollable, bodyStyle}) {
  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar backgroundColor={appColors.black} />
    <LinearGradient
      colors={['#C9D6FF', '#E2E2E2']}
      start={{x: 1.0, y: 0.25}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      {isScrollable ? (
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={[styles.innerView, bodyStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.innerView, bodyStyle]}>{children}</View>
      )}
    </LinearGradient>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.gray,
  },
  innerView: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
});
