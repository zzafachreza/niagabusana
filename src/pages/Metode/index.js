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

import LottieView from 'lottie-react-native';
import {getData, storeData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {showMessage} from 'react-native-flash-message';
export default function Metode({navigation}) {
  const [user, setUser] = useState({});
  const [kredit, setKredit] = useState({});
  const [bank, setBank] = useState(false);
  const [kartu, setKartu] = useState(false);

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      getKartuKredit(res.id);
    });
  }, []);

  const UbahBayar = kirim => {
    axios
      .post('https://zavalabs.com/niagabusana/api/bayar_update.php', kirim)
      .then(res => {
        console.log(res);
        storeData('user', res.data);
        navigation.goBack();
      });
  };

  const getKartuKredit = id => {
    axios
      .post('https://zavalabs.com/niagabusana/api/kredit_kartu.php', {
        id_member: id,
      })
      .then(res => {
        console.log('kartu', res.data);
        setKredit(res.data);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
          borderRadius: 5,
          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.black,
                maxWidth: '80%',
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Transfer Bank
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!bank) {
                setBank(true);
              } else {
                setBank(false);
              }
            }}>
            {!bank && <Icon type="ionicon" name="chevron-down-outline" />}
            {bank && <Icon type="ionicon" name="chevron-up-outline" />}
          </TouchableOpacity>
        </View>
        {bank && (
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  const kirim = {
                    bayar: 'TRANSFER BANK',
                    nama_bank: 'BUKOPIN',
                    foto_bank:
                      'https://zavalabs.com/niagabusana/api/images/bukopin.png',
                    id_member: user.id,
                  };

                  console.log('send server', kirim);
                  UbahBayar(kirim);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://zavalabs.com/niagabusana/api/images/bukopin.png',
                    }}
                    style={{height: 80, width: 100}}
                    resizeMode="center"
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  const kirim = {
                    bayar: 'TRANSFER BANK',
                    nama_bank: 'BNI',
                    foto_bank:
                      'https://zavalabs.com/niagabusana/api/images/bni.png',
                    id_member: user.id,
                  };

                  console.log('send server', kirim);
                  UbahBayar(kirim);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://zavalabs.com/niagabusana/api/images/bni.png',
                    }}
                    style={{height: 80, width: 100}}
                    resizeMode="center"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  const kirim = {
                    bayar: 'TRANSFER BANK',
                    nama_bank: 'BRI',
                    foto_bank:
                      'https://zavalabs.com/niagabusana/api/images/bri.png',
                    id_member: user.id,
                  };

                  console.log('send server', kirim);
                  UbahBayar(kirim);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://zavalabs.com/niagabusana/api/images/bri.png',
                    }}
                    style={{height: 80, width: 100}}
                    resizeMode="center"
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  const kirim = {
                    bayar: 'TRANSFER BANK',
                    nama_bank: 'MEGA',
                    foto_bank:
                      'https://zavalabs.com/niagabusana/api/images/mega.png',
                    id_member: user.id,
                  };

                  console.log('send server', kirim);
                  UbahBayar(kirim);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://zavalabs.com/niagabusana/api/images/mega.png',
                    }}
                    style={{height: 80, width: 100}}
                    resizeMode="center"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  const kirim = {
                    bayar: 'TRANSFER BANK',
                    nama_bank: 'MANDIRI',
                    foto_bank:
                      'https://zavalabs.com/niagabusana/api/images/mandiri.png',
                    id_member: user.id,
                  };

                  console.log('send server', kirim);
                  UbahBayar(kirim);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://zavalabs.com/niagabusana/api/images/mandiri.png',
                    }}
                    style={{height: 80, width: 100}}
                    resizeMode="center"
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  const kirim = {
                    bayar: 'TRANSFER BANK',
                    nama_bank: 'BCA',
                    foto_bank:
                      'https://zavalabs.com/niagabusana/api/images/bca.png',
                    id_member: user.id,
                  };

                  console.log('send server', kirim);
                  UbahBayar(kirim);
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{
                      uri: 'https://zavalabs.com/niagabusana/api/images/bca.png',
                    }}
                    style={{height: 80, width: 100}}
                    resizeMode="center"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
