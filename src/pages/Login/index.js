import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  async function onGoogleButtonPress() {}

  const masukGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('hasil get google', userInfo);
      console.log('mulai masuk');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    if (data.email == null && data.password == null) {
      alert('Email dan password wajib diisi !');
    } else if (data.email == null) {
      alert('Email tidak boleh kosong !');
    } else if (data.password == null) {
      alert('Password tidak boleh kosong !');
    } else {
      setLoading(true);
      console.log(data);
      setTimeout(() => {
        axios
          .post('https://zavalabs.com/niagabusana/api/login.php', data)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {
              showMessage({
                type: 'danger',
                message: res.data.msg,
              });
            } else {
              storeData('user', res.data);
              axios
                .post('https://zavalabs.com/niagabusana/api/update_token.php', {
                  id_member: res.data.id,
                  token: token,
                })
                .then(res => {
                  console.log('update token', res);
                });

              navigation.replace('MainApp');
            }
          });
      }, 1200);
    }
  };
  return (
    <ImageBackground style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 220,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            padding: 10,
            borderRadius: 10,
          }}>
          {/* <LottieView
            style={{flex: 1}}
            source={require('../../assets/getstarted.json')}
            autoPlay
            loop
          /> */}
          <Image
            source={require('../../assets/logo.png')}
            style={{
              resizeMode: 'contain',
              aspectRatio: 0.3,
            }}
          />
        </View>
        <View style={styles.page}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: colors.tertiary,
              textAlign: 'center',
              // maxWidth: 230,
            }}>
            Silahkan login untuk masuk ke aplikasi{' '}
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.black,
                // maxWidth: 230,
              }}></Text>
          </Text>
          <MyGap jarak={20} />
          <MyInput
            label="Email/Telp/Whatsapp"
            colorIcon={colors.secondary}
            placeholder="Isi Email/Telp/Whatsapp Kamu Ya"
            iconname="mail"
            value={data.nama_lengkap}
            onChangeText={value =>
              setData({
                ...data,
                email: value,
              })
            }
          />
          <MyGap jarak={20} />
          <MyInput
            label="Password"
            placeholder="Masukan password"
            colorIcon={colors.secondary}
            iconname="key"
            secureTextEntry
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />
          <MyGap jarak={40} />
          <MyButton
            warna={colors.secondary}
            colorText={colors.black}
            iconColor={colors.black}
            title="LOGIN"
            Icons="log-in"
            onPress={masuk}
          />
          <MyGap jarak={20} />
          <MyButton
            // warna={colors.secondary}
            colorText={colors.black}
            title="Lupa Password ? Klik disini"
            Icons="log-in"
            onPress={() => navigation.navigate('Lupa')}
          />
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
