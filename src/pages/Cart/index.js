import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';

import {getData, storeData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Cart({navigation, route}) {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  //   useEffect(() => {

  //   }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('called');
      getData('user').then(res => {
        console.log(res);
        setUser(res);
        __getDataBarang(res.id);
      });
    }
  }, [isFocused]);

  const __getDataBarang = id_member => {
    axios
      .post('https://zavalabs.com/niagabusana/api/cart.php', {
        id_member: id_member,
      })
      .then(res => {
        if (res.data.length == 0) {
          console.log('data barang,', res.data);
          setData(res.data);
          storeData('cart', false);
        } else {
          console.log('data barang,', res.data);
          setData(res.data);
        }
      });
  };

  const hanldeHapus = (id, id_member) => {
    console.log(id + id_member);

    Alert.alert('Niaga Busana', 'Apakah Anda yakin akan hapus ini ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          axios
            .post('https://zavalabs.com/niagabusana/api/cart_hapus.php', {
              id: id,
              id_member: id_member,
            })
            .then(res => {
              console.log('delete', res);
              __getDataBarang(id_member);
            });
        },
      },
    ]);
  };

  const tambah = (id, id_member) => {
    axios
      .post('https://zavalabs.com/niagabusana/api/cart_add.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        __getDataBarang(id_member);
      });
  };

  const kurang = (id, id_member) => {
    axios
      .post('https://zavalabs.com/niagabusana/api/cart_min.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        __getDataBarang(id_member);
      });
  };

  var sub = 0;
  data.map(item => {
    sub += parseFloat(item.total);

    console.log(sub);
  });

  const __renderItem = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: colors.white,
          elevation: 1,
          padding: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              borderRadius: 10,
              width: windowWidth / 4,
            }}
            source={{uri: item.foto}}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{fontFamily: fonts.secondary[600]}}>
              {item.nama_barang}
            </Text>

            <Text style={{fontFamily: fonts.secondary[600], flex: 1}}>
              Harga : {new Intl.NumberFormat().format(item.harga)}
            </Text>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (item.qty == 1) {
                    hanldeHapus(item.id, item.id_member);
                  } else {
                    kurang(item.id, item.id_member);
                  }
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                  elevation: 2,
                  backgroundColor: colors.secondary,
                  borderRadius: 10,
                }}>
                <Text>
                  <Icon
                    type="ionicon"
                    name="remove"
                    size={20}
                    color={colors.black}
                  />
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text>{item.qty}</Text>
              </View>
              <TouchableOpacity
                onPress={() => tambah(item.id, item.id_member)}
                style={{
                  justifyContent: 'center',
                  elevation: 2,
                  alignItems: 'center',
                  padding: 5,
                  backgroundColor: colors.secondary,
                  borderRadius: 10,
                }}>
                <Text>
                  <Icon
                    type="ionicon"
                    name="add"
                    size={20}
                    color={colors.black}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => hanldeHapus(item.id, item.id_member)}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={18}
                  color={colors.black}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.primary,
                margin: 5,
                fontSize: windowWidth / 23,
              }}>
              {new Intl.NumberFormat().format(item.total)}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}></View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View style={{padding: 10, flex: 1}}>
        <FlatList data={data} renderItem={__renderItem} />
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#E6E6E6',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 10,
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 25,
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          TOTAL
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 15,
            fontFamily: fonts.secondary[600],
            color: colors.black,
          }}>
          Rp. {new Intl.NumberFormat().format(sub)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Checkout', {
            total: sub,
            id_member: user.id,
            nama_lengkap: user.nama_lengkap,
            nohp: user.tlp,
            email: user.email,
            alamat: user.alamat,
          })
        }
        style={{
          padding: 20,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: windowWidth / 20,
            fontFamily: fonts.secondary[600],
            color: colors.white,
          }}>
          CHECKOUT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
