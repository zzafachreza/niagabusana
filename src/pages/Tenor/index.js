import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
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
import {Icon} from 'react-native-elements/dist/icons/Icon';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {useIsFocused} from '@react-navigation/native';
export default function Tenor({navigation, route}) {
  const isFocused = useIsFocused();
  const item = route.params;
  const [data, setData] = useState([]);
  const getTenor = () => {
    axios
      .post('https://zavalabs.com/bmelektronik/api/kredit_cicilan.php', {
        kode: route.params.kode,
      })
      .then(res => {
        console.log('tenor', res.data);
        setData(res.data);
      });
  };
  useEffect(() => {
    if (isFocused) {
      getTenor();
    }
  }, [isFocused]);

  const __renderItem = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
          marginVertical: 5,
          borderRadius: 10,
          elevation: 2,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[600],
              }}>
              Angsuran Ke - {item.angsuran}
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary.normal,
              }}>
              Jatuh Tempo
            </Text>
            <Text
              style={{
                color: colors.primary,
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[600],
              }}>
              {item.jatuh_tempo}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                color: colors.black,

                fontSize: windowWidth / 17,
                fontFamily: fonts.secondary[600],
              }}>
              Rp. {new Intl.NumberFormat().format(item.total)}
            </Text>
          </View>
          <View
            style={{
              width: windowWidth / 3,
              padding: 5,
              borderRadius: 10,
              backgroundColor:
                item.status == 'LUNAS' ? colors.success : colors.primary,
            }}>
            <Text
              style={{
                color: colors.white,
                textAlign: 'center',
                fontSize: windowWidth / 30,
                fontFamily: fonts.secondary[400],
              }}>
              {item.status}
            </Text>
          </View>
        </View>

        {item.status == 'LUNAS' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              type="ionicon"
              name="checkmark-circle"
              color={colors.success}
            />
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 33,
                fontFamily: fonts.secondary.normal,
              }}>
              Dibayar
            </Text>
            <Text
              style={{
                color: colors.success,
                fontSize: windowWidth / 33,
                fontFamily: fonts.secondary.normal,
              }}>
              {item.tanggal}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('Bayar2', item)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.success,
              padding: 10,
              borderRadius: 10,
            }}>
            <Icon type="ionicon" name="wallet-outline" color={colors.white} />
            <Text
              style={{
                color: colors.white,
                fontSize: windowWidth / 33,
                fontFamily: fonts.secondary[400],
              }}>
              Bayar Sekarang
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{padding: 10}}>
      <FlatList data={data} key={item => item.id} renderItem={__renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
