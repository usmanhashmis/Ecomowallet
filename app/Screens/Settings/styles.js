import {StyleSheet} from 'react-native';
import {
  getHeight,
  getWidth,
  getFontSize,
} from '../../../../Utils/NewResponsive';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {theme} from '../../../Core/theme';
import { COLORS } from '../../../Constants/Colors';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: heightPercentageToDP('2'),
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: widthPercentageToDP('7'),
  },

  card: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: getHeight(11),
    width: getWidth(40),
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  listitem: {
    marginVertical: heightPercentageToDP('0.7'),
  },
  imgWrapper: {
    backgroundColor: COLORS.primary,
    height: widthPercentageToDP('10'),
    width: widthPercentageToDP('10'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPercentageToDP('5'),
  },
  image: {
    height: widthPercentageToDP('6'),
    width: widthPercentageToDP('6'),
  },

  cardsContainer: {
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  cardsRowContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardsText: {
    fontSize: getFontSize(3),
    fontWeight: 'bold',
    padding: 7,
  },

  settingsText: {
    fontSize: 28,
    color: theme.colors.text,
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
  },
  exploreText: {
    fontSize: 18,
    color: COLORS.cocoGrey,
    left: widthPercentageToDP('12'),
  },
});
export default styles;
