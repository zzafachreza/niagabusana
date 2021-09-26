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
    axios.get('https://zavalabs.com/niagabusana/api/kategori.php').then(res => {
      console.log('get kategori', res.data);
      setData(res.data);
    });
  }, []);

  const _renderITem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Search2', item)}
        style={{
          position: 'relative',

          marginHorizontal: 10,
          overflow: 'hidden',
          borderRadius: 10,
          height: 200,
          marginVertical: 10,
        }}>
        <Image
          source={{uri: item.foto}}
          style={{
            width: '100%',
            height: 200,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            padding: 10,
            backgroundColor: colors.primary,
            width: '100%',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 22,
              color: colors.white,
            }}>
            {item.nama_kategori}
          </Text>
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
          warna={colors.black}
          title="Lihat Semua Kategori"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
