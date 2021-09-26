import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {tan} from 'react-native-reanimated';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';
import {getData} from '../../utils/localStorage';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MyButton} from '../../components';
import {useIsFocused} from '@react-navigation/native';

export default function ListData({navigation}) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    // alert(obj.notification);
    // console.log('list transaksi', obj.notification);
    getData('user').then(res => {
      setUser(res);
      // console.log(res);

      axios
        .post('https://zavalabs.com/niagabusana/api/transaksi.php', {
          id_member: res.id,
        })
        .then(res => {
          // console.log(res.data);
          setData(res.data);
        });
    });
  });

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(res);

        axios
          .post('https://zavalabs.com/niagabusana/api/transaksi.php', {
            id_member: res.id,
          })
          .then(res => {
            console.log(res.data);
            setData(res.data);
          });
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 10,
          flex: 1,
        }}>
        {data.map(item => {
          let tenor = '';

          if (item.bayar == 'KREDIT') {
            tenor = 'CICILAN ' + item.tenor + ' BULAN';
          }

          return (
            <View
              key={item.id}
              style={{
                margin: 5,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                borderColor: colors.primary,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('cek detail', item);
                  navigation.navigate('ListDetail', item);
                }}>
                <View style={{flex: 1, padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      fontSize: windowWidth / 30,
                    }}>
                    Nomor Transaksi - Nama Pelanggan :
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 25,
                      color: colors.black,
                    }}>
                    {item.kode}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 25,
                      color: colors.primary,
                    }}>
                    {item.nama_pemesan}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                    }}>
                    {item.tanggal}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30,
                        color: colors.white,
                        padding: 5,
                        borderRadius: 5,
                        margin: 5,
                        backgroundColor:
                          item.bayar == 'KREDIT'
                            ? colors.black
                            : colors.success,
                      }}>
                      {item.bayar} {tenor}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        // borderBottomRightRadius: 10,
                        // backgroundColor: colors.border,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.warning,
                        padding: 10,
                      }}>
                      Rp. {item.grand}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {item.status === 'SEDANG DIPROSES' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: '#DEDEDE',
                      color: colors.black,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                    }}>
                    SEDANG DIPROSES
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      axios
                        .post(
                          'https://zavalabs.com/niagabusana/api/transaksi_hapus.php',
                          {
                            id_member: item.id_member,
                            kode: item.kode,
                          },
                        )
                        .then(res => {
                          axios
                            .post(
                              'https://zavalabs.com/niagabusana/api/transaksi.php',
                              {
                                id_member: item.id_member,
                              },
                            )
                            .then(res => {
                              console.log(res.data);
                              setData(res.data);
                            });
                        });
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: colors.danger,
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                      }}>
                      Batalkan Transaksi
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.status === 'SELESAI' && (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 1,
                      backgroundColor: colors.primary,
                      color: colors.white,
                      padding: 10,
                      fontFamily: fonts.secondary[600],
                      textAlign: 'center',
                    }}>
                    SELESAI
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
