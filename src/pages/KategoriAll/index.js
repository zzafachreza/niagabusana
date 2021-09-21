import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {windowWidth, fonts} from '../../utils/fonts';
import axios from 'axios';
import {MyButton, MyInput} from '../../components';
import {colors} from '../../utils/colors';

export default function KategoriAll({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://zavalabs.com/bmelektronik/api/kategori.php')
      .then(res => {
        console.log('get kategori', res.data);
        setData(res.data);
      });
  }, []);

  const _renderITem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Search2', item)}
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderRadius: 10,
        }}>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
          }}>
          {item.nama_kategori}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          height: 70,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 10,
          }}>
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            size={windowWidth / 15}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
            }}>
            Semua Kategori
          </Text>
          {/* <TextInput
            autoFocus
            style={{
              borderWidth: 1,
              borderRadius: 10,
              fontFamily: fonts.secondary[400],
              paddingLeft: 10,
              fontSize: windowWidth / 22,
            }}
            placeholder="Pencarian Kategori"
          /> */}
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList data={data} renderItem={_renderITem} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
