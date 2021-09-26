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
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {showMessage} from 'react-native-flash-message';

export default function Wishlist({navigation, route}) {
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
      .post('https://zavalabs.com/niagabusana/api/fav.php', {
        id_member: id_member,
      })
      .then(res => {
        console.log('data barang,', res.data);
        setData(res.data);
      });
  };

  const hanldeHapus = (id, id_member) => {
    console.log(id + id_member);
    axios
      .post('https://zavalabs.com/niagabusana/api/fav_delete.php', {
        id: id,
        id_member: id_member,
      })
      .then(res => {
        console.log('delete', res);
        __getDataBarang(id_member);
      });
  };

  const addToCart = item => {
    console.log(item);
    axios
      .post('https://zavalabs.com/niagabusana/api/barang_add.php', item)
      .then(res => {
        console.log(res);
        // navigation.navigate('Success2', {
        //   message: 'Berhasil Tambah Keranjang',
        // });
        showMessage({
          type: 'success',
          message: 'Berhasil Masuk Keranjang',
        });
      });
  };

  var sub = 0;
  data.map(item => {
    sub += parseFloat(item.total);

    console.log(sub);
  });

  const __renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableWithoutFeedback
              onPress={() => hanldeHapus(item.id, item.id_member)}>
              <View
                style={{
                  // flex: 1,
                  width: 100,
                  //   backgroundColor: 'blue',
                  // padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="ionicon"
                  name="trash"
                  size={40}
                  color={colors.danger}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        }}>
        <View
          style={{
            marginVertical: 10,
            borderRadius: 10,
            padding: 10,
            elevation: 2,
            backgroundColor: colors.white,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              style={{
                width: 70,
                borderRadius: 20,
                aspectRatio: 1,
              }}
              source={{uri: item.foto}}
            />
            <View style={{marginLeft: 10, flex: 1}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 20,
                }}>
                {item.nama_barang}
              </Text>

              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.warning,
                  fontSize: windowWidth / 20,
                }}>
                {new Intl.NumberFormat().format(item.total)}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {item.stok > 0 ? (
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <Icon type="ionicon" name="cart" color={colors.success} />
                  <Text
                    style={{
                      color: colors.success,
                      fontFamily: fonts.secondary[600],
                    }}>
                    Tambah
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      color: colors.white,
                    }}>
                    Stok Habis
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // padding: 10,
      }}>
      <View style={{padding: 20, backgroundColor: colors.primary}}>
        <Text
          style={{
            fontSize: windowWidth / 20,
            fontFamily: fonts.secondary[600],
            color: colors.white,
          }}>
          Favorit Saya
        </Text>
      </View>
      <View style={{padding: 10, flex: 1}}>
        <FlatList data={data} renderItem={__renderItem} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
