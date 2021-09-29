import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import {fonts} from '../../utils/fonts';
import LottieView from 'lottie-react-native';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {Icon} from 'react-native-elements';

export default function Success({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const txt = new Animated.Value(-windowWidth);

  Animated.timing(txt, {
    toValue: -100,
    duration: 800,
    useNativeDriver: false,
  }).start();

  const messege = route.params.messege;
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
        }}>
        <Icon
          style={{alignSelf: 'center', justifyContent: 'center'}}
          size={300}
          type="ionicon"
          name="checkmark-circle"
          color={colors.primary}
        />
        <Animated.Text
          style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 22,
            color: colors.primary,
            bottom: txt,
          }}>
          {messege}
        </Animated.Text>
      </View>
      <View
        style={{
          //   flex: 1,
          padding: 10,
        }}>
        <MyButton
          title="MASUK SEKARANG"
          warna={colors.primary}
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
