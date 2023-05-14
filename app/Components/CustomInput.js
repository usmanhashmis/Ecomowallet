import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {appColors} from '../utils/appColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomInput = ({
  label,
  iconName,
  error,
  password,

  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? appColors.red
              : isFocused
              ? appColors.darkBlue
              : appColors.light,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: appColors.darkBlue, fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: appColors.darkBlue, flex: 1}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: appColors.darkBlue, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: appColors.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight:'700',
    color: appColors.black,
  },
  inputContainer: {
    height: 55,
    backgroundColor: appColors.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 10,
  },
});

export default CustomInput;