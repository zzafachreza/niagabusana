import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';

export default function Success2({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const txt = new Animated.Value(-windowWidth);

  Animated.timing(txt, {
    toValue: 10,
    duration: 800,
    useNativeDriver: false,
  }).start();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 100,
        }}>
        <Image
          source={require('../../assets/bags.png')}
          style={{marginBottom: 20}}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 10,
            color: 'black',
          }}>
          Berhasil!
        </Text>
        <Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 25,
            marginHorizontal: 20,
            textAlign: 'center',
          }}>
          Pesanan Anda akan segera dikirimkan. Terima kasih telah memilih
          aplikasi kami!
        </Text>
      </View>
      <View style={{padding: 10}}>
        <MyButton
          onPress={() => navigation.replace('MainApp')}
          title="LANJUTKAN BELANJA!"
          warna={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
