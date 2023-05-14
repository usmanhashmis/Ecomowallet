import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {appColors} from '../../utils/appColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomIconButton = ({text, image, onPress, active}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {backgroundColor: active ? appColors.primary_light : appColors.white},
      ]}
      onPress={onPress}>
      <Image source={image} style={styles.buttonIcon} />
      <Text
        style={[
          styles.buttonText,
          {color: active ? appColors.black : appColors.primary},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    borderRadius: 10,
    height: hp(12),
    width: wp(25),
    elevation: 3,
    margin: 5,
  },
  buttonText: {
    fontSize: 12,
    color: appColors.primary,
    fontWeight: 'bold',
  },
  buttonIcon: {
    height: hp(8),
    width: wp(10),
    resizeMode: 'contain',
  },
});
