import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function Bayar({navigation, route}) {
  const [data, setData] = useState(route.params);
  const [perbulan, setPerbulan] = useState(0);

  console.log('data dari bayar', data);
  const [loading, setLoading] = useState(false);
  console.log('pembayaran', data);
  const [foto1, setfoto1] = useState('https://zavalabs.com/nogambar.jpg');

  const options = {
    includeBase64: true,
    quality: 0.5,
  };

  const getCamera = xyz => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              buktibayar: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        switch (xyz) {
          case 1:
            setData({
              ...data,
              buktibayar: `data:${response.type};base64, ${response.base64}`,
            });
            setfoto1(`data:${response.type};base64, ${response.base64}`);
            break;
        }
      }
    });
  };

  const UploadFoto = ({onPress1, onPress2, label, foto}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.border,
          elevation: 2,
        }}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          {label}
        </Text>
        <Image
          source={{
            uri: foto,
          }}
          style={{
            width: '100%',
            aspectRatio: 1.5,
          }}
          resizeMode="center"
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              paddingRight: 5,
            }}>
            <MyButton
              onPress={onPress1}
              colorText={colors.primary}
              title="KAMERA"
              warna={colors.white}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 5,
            }}>
            <MyButton
              onPress={onPress2}
              title="GALLERY"
              warna={colors.primary}
            />
          </View>
        </View>
      </View>
    );
  };

  const simpan = () => {
    setLoading(true);
    console.log('kirim ke server', data);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/niagabusana/api/transaksi_add.php', data)
        .then(res => {
          console.log(res);
          setLoading(false);
        });
      navigation.navigate('Success2');
    }, 1200);
  };

  useEffect(() => {
    if (data.bayar == 'KREDIT') {
      navigation.setOptions({
        title: 'Pembayaran Kredit',
      });

      if (data.tenor == 12) {
        setPerbulan(Math.round((data.total + (data.total * 36) / 100) / 12));
        setData({
          ...data,
          perbulan: Math.round((data.total + (data.total * 36) / 100) / 12),
        });
      } else {
        setPerbulan(Math.round((data.total + (data.total * 30) / 100) / 10));
        setData({
          ...data,
          perbulan: Math.round((data.total + (data.total * 30) / 100) / 10),
        });
      }
    } else {
      navigation.setOptions({
        title: 'Pembayaran Transfer',
      });
    }
  }, []);
  return (
    <>
      <SafeAreaView
        style={{
          padding: 10,
          flex: 1,
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Transfer Ke BANK :
            </Text>
            <Image
              source={require('../../assets/bca.png')}
              style={{width: 100, height: 30, margin: 10}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Nomor Rekening
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              32117081945
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Atas Nama
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              PT. Zavalabs Teknologi Indonesia
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Total
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: 20,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              Rp.{' '}
              {new Intl.NumberFormat().format(
                route.params.total + route.params.ongkir,
              )}
            </Text>
          </View>

          {data.bayar == 'KREDIT' ? (
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
              <Text
                style={{
                  flex: 1,
                  color: colors.black,
                  fontSize: 16,
                  fontFamily: fonts.secondary[400],
                  padding: 10,
                }}>
                Angsuran Selama {data.tenor} Bulan
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 20,
                  fontFamily: fonts.secondary[600],
                  padding: 10,
                }}>
                Rp. {new Intl.NumberFormat().format(perbulan)}
              </Text>
            </View>
          ) : (
            <View></View>
          )}

          <UploadFoto
            onPress1={() => getCamera(1)}
            onPress2={() => getGallery(1)}
            label="Upload Bukti Pembayaran"
            foto={foto1}
          />
        </View>

        <View>
          <MyButton
            onPress={simpan}
            title="KONFIRMASI PEMBAYARAN"
            warna={colors.primary}
            style={{
              justifyContent: 'flex-end',
            }}
          />
        </View>
      </SafeAreaView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
