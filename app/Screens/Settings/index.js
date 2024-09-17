import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserProfileCard from '../../Components/UserProfileCard/UserProfileCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionList from '../../Components/OptionList/OptionList';
import {appColors} from '../../utils/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from '../../Components/Container';
import {useSelector} from 'react-redux';

const Settings = ({navigation, route}) => {
  const [userInfo, setUserInfo] = useState({});
  const [logData, setLogData] = useState('');
  const token = useSelector(state => state.token.token);

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

  // console.log(logData);
  return (
    <Container bodyStyle={{marginTop: hp(12)}}>
      <StatusBar style="auto"></StatusBar>

      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Profile Settings</Text>
      </View>
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          Icon={Ionicons}
          name={logData ? logData.username : ''}
          email={logData ? logData.email : ''}
        />
      </View>
      <View style={styles.OptionsContainer}>
        {/* <OptionList
          text={'My Account'}
          Icon={Ionicons}
          iconName={'person'}
          onPress={() => navigation.navigate('myaccount', {user: userInfo})}
        />
        <OptionList
          text={'Wishlist'}
          Icon={Ionicons}
          iconName={'heart'}
          onPress={() => navigation.navigate('mywishlist', {user: userInfo})}
        /> */}
        {/* !For future use --- */}
        {/* <OptionList
          text={'Settings'}
          Icon={Ionicons}
          iconName={'settings-sharp'}
          onPress={() => console.log('working....')}
        />
        <OptionList
          text={'Help Center'}
          Icon={Ionicons}
          iconName={'help-circle'}
          onPress={() => console.log('working....')}
        /> */}
        {/* !For future use ---- End */}
        <OptionList
          text={'Logout'}
          Icon={Ionicons}
          iconName={'log-out'}
          onPress={() => {
            Alert.alert(
              'Log Out',
              'Press yes to log out from your account. ',
              [
                {
                  text: 'Yes',
                  onPress: async () => {
                    navigation.navigate('Home');
                    await AsyncStorage.removeItem('loginData');
                    console.log('token removed');
                  },
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel button pressed'),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </View>
    </Container>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(10),
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: appColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  UserProfileCardContianer: {
    width: '100%',
    height: '25%',
  },
  screenNameContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: '800',
    color: appColors.muted,
  },
  OptionsContainer: {
    width: '100%',
  },
});
