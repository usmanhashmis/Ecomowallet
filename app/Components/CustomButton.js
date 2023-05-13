import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import TouchableRipple from 'react-native-touch-ripple';
import Feather from 'react-native-vector-icons/MaterialCommunityIcons';
export default function CustomButton({
  icon,
  unFilled,
  label,
  style,
  onPress,
  labelStyle,
  isLoading,
}) {
  return (
    <TouchableRipple
      rippleColor={appColors.primary}
      onPress={onPress}
      rippleDuration={1000}
      style={[styles.container, unFilled ? styles.unFilled : {}, style]}>
      {icon && (
        <Feather
          name={icon}
          size={scale(20)}
          color={unFilled ? appColors.black : appColors.white}
        />
      )}
      {!isLoading ? (
        <Text
          style={[
            styles.label,
            unFilled ? styles.unFilledLabel : {},
            labelStyle,
            style,
          ]}>
          {`${label}`.toUpperCase()}
        </Text>
      ) : (
        <ActivityIndicator size={'large'} color={appColors.white} />
      )}
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    backgroundColor: appColors.black,
    borderRadius: scale(30),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: scale(10),
    paddingHorizontal: scale(50),
  },
  label: {
    fontSize: scale(15),
    fontWeight: '300',
    color: appColors.white,
    letterSpacing: scale(2),
  },
  unFilled: {
    backgroundColor: 'transparent',
    borderWidth: scale(0.7),
    borderColor: appColors.primary,
  },
  unFilledLabel: {
    color: appColors.black,
  },
});
