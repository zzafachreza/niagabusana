import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  StatusBar,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData, getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyProductNew from '../../components/MyProductNew';
import MyProductDiscount from '../../components/MyProductDiscount';
import {useIsFocused} from '@react-navigation/native';

export default function Home({navigation}) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [point, setPoint] = useState(0);
  const [cart, setCart] = useState(0);

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);
      // alert('email' + res.email + ' dan password ' + res.password);

      axios
        .post('https://zavalabs.com/niagabusana/api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      axios
        .post('https://zavalabs.com/niagabusana/api/get_member.php', {
          email: res.email,
          password: res.password,
        })
        .then(rese => {
          setUser(rese.data);
          storeData('user', rese.data);
        });
    });
  });

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log(res);
        setUser(res);

        getData('token').then(res => {
          console.log('data token,', res);
          setToken(res.token);
        });
      });

      axios
        .post('https://zavalabs.com/niagabusana/api/update_token.php', {
          id_member: user.id,
          token: token,
        })
        .then(res => {
          console.log('update token', res);
        });
    }

    getData('cart').then(res => {
      console.log(res);
      setCart(res);
    });
  }, [isFocused]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };
  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <ScrollView>
        <MyCarouser />
        <View
          style={{
            height: windowHeight / 9,
            padding: 10,
            backgroundColor: colors.white,
            flexDirection: 'row',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <View style={{flex: 1, paddingTop: 15}}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.primary,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.primary,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                type="ionicon"
                name="cart-outline"
                color={colors.primary}
                size={windowWidth / 12}
              />
              {cart > 0 && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    right: 0,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      color: colors.white,
                      fontSize: windowWidth / 35,
                    }}>
                    {cart}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <MyProductDiscount />
        <MyProductNew />

        {/* <MyKategori /> */}
        {/* <MyTerbaik /> */}
        {/* <MyTerbaik2 /> */}
      </ScrollView>
    </ImageBackground>
  );
}
