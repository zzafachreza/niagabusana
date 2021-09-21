import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {windowWidth, fonts} from '../../utils/fonts';
import axios from 'axios';
import {MyButton} from '../../components';
import {colors} from '../../utils/colors';

export default function Kategori({navigation}) {
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
          borderWidth: 1,
          borderRadius: 10,
          height: 100,
        }}>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 25,
          }}>
          {item.nama_kategori}
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={{uri: item.foto}}
            style={{
              width: 100,
              height: 50,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          height: 50,
        }}>
        <View>
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            size={windowWidth / 15}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 20,
            }}>
            Kategori
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon type="ionicon" name="search-outline" size={windowWidth / 15} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList data={data} renderItem={_renderITem} />
      </View>
      <View style={{padding: 10}}>
        <MyButton
          onPress={() => navigation.navigate('KategoriAll')}
          warna={colors.primary}
          title="Lihat Semua Kategori"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
