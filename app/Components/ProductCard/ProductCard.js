import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appColors} from '../../utils/appColors';

const ProductCard = ({
  name,
  price,
  image,
  quantity,
  onPress,
  onPressSecondary,
  cardSize,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, {width: cardSize === 'large' ? '100%' : 150}]}
      onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm}>{`${name.substring(
            0,
            10,
          )}..`}</Text>
          <Text style={styles.primaryTextSm}>{price}</Text>
        </View>
        <View>
          {quantity > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}>
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    width: 150,
    height: 200,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    elevation: 5,
  },
  imageContainer: {
    backgroundColor: appColors.light,
    width: '100%',
    height: 140,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    borderRadius: 10,
    height: 140,
    width: 140,
  },
  infoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: appColors.primary,
  },
  iconContainer: {
    backgroundColor: appColors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerDisable: {
    backgroundColor: appColors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
