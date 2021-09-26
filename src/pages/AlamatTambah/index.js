import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import Router from '../../routes';

export default function AlamatTambah({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id_member: route.params.id,
    nama_lengkap: route.params.nama_lengkap,
    alamat: null,
    kota: null,
    provinsi: null,
    pos: null,
  });

  const simpan = () => {
    // setLoading(true);
    console.log(data);
    axios
      .post('https://zavalabs.com/niagabusana/api/alamat_add.php', data)
      .then(res => {
        navigation.goBack();
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <MyGap jarak={20} />
        <MyInput
          label="Nama Lengkap"
          iconname="person"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Alamat"
          iconname="mail"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Kota"
          iconname="map"
          value={data.kota}
          onChangeText={value =>
            setData({
              ...data,
              kota: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Wilayah / Provinsi / daerah"
          iconname="map"
          value={data.provinsi}
          onChangeText={value =>
            setData({
              ...data,
              provinsi: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Kode Pos"
          iconname="key"
          value={data.pos}
          onChangeText={value =>
            setData({
              ...data,
              pos: value,
            })
          }
        />
        <MyGap jarak={20} />
        <MyButton
          warna={colors.primary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />
        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
