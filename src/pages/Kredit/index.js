import React, {useState, useEffect} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';
import {getData, storeData} from '../../utils/localStorage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Kredit({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const simpan = () => {
    console.log('kirim ke server', data);
    axios
      .post('https://zavalabs.com/niagabusana/api/kredit_update.php', data)
      .then(res => {
        console.log(res.data);
        storeData('user', res.data);
        navigation.navigate('Checkout');
      });
  };

  const getUser = () => {
    getData('user').then(res => {
      setUser(res);
      setData({
        id_member: res.id,
        nama_pendaftar: res.nama_lengkap,
        telepon_pendaftar: res.tlp,
        alamat_pendaftar: res.alamat,
        ktp_pendaftar: 'https://zavalabs.com/nogambar.jpg',
        nama_penanggung: null,
        telepon_penanggung: null,
        alamat_penanggung: null,
        ktp_penanggung: 'https://zavalabs.com/nogambar.jpg',
      });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  // upload documents configuration

  const options = {
    includeBase64: true,
    quality: 0.3,
  };

  const getGallery = xyz => {
    launchImageLibrary(options, response => {
      console.log('All Response = ', response);

      console.log('Ukuran = ', response.fileSize);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        if (response.fileSize <= 2000000) {
          let source = {uri: response.uri};
          switch (xyz) {
            case 1:
              setData({
                ...data,
                ktp_pendaftar: `data:${response.type};base64, ${response.base64}`,
              });
              break;
            case 2:
              setData({
                ...data,
                ktp_penanggung: `data:${response.type};base64, ${response.base64}`,
              });
              break;
          }
        } else {
          showMessage({
            message: 'Ukuran Foto Terlalu Besar Max 500 KB',
            type: 'danger',
          });
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <MyGap jarak={20} />
        <MyInput
          label="Nama Pendaftar"
          iconname="person"
          value={data.nama_pendaftar}
          onChangeText={value =>
            setData({
              ...data,
              nama_pendaftar: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Nomor Telepon Pendaftar"
          iconname="call"
          keyboardType="number-pad"
          value={data.telepon_pendaftar}
          onChangeText={value =>
            setData({
              ...data,
              telepon_pendaftar: value,
            })
          }
        />
        <MyInput
          label="Alamat Pendaftar"
          iconname="map"
          value={data.alamat_pendaftar}
          onChangeText={value =>
            setData({
              ...data,
              alamat_pendaftar: value,
            })
          }
        />
        <MyGap jarak={10} />
        <View
          style={{
            padding: 10,
          }}>
          <Image
            source={{uri: data.ktp_pendaftar}}
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
          />
        </View>
        <TouchableOpacity
          onPress={() => getGallery(1)}
          style={{
            paddingVertical: 20,
            borderRadius: 10,
            backgroundColor: colors.border,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Fotocopy KTP Pendaftar
            </Text>
          </View>
          <View>
            <Icon
              color={colors.white}
              type="ionicon"
              name="cloud-upload-outline"
            />
          </View>
        </TouchableOpacity>
        <MyGap jarak={10} />
        <MyInput
          label="Nama Penanggung Jawab"
          iconname="person-outline"
          value={data.nama_penanggung}
          onChangeText={value =>
            setData({
              ...data,
              nama_penanggung: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Nomor Telepon Penanggung Jawab"
          iconname="call-outline"
          value={data.telepon_penanggung}
          onChangeText={value =>
            setData({
              ...data,
              telepon_penanggung: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Alamat Penanggung Jawab"
          iconname="map-outline"
          value={data.alamat_penanggung}
          onChangeText={value =>
            setData({
              ...data,
              alamat_penanggung: value,
            })
          }
        />
        <MyGap jarak={10} />
        <View
          style={{
            padding: 10,
          }}>
          <Image
            source={{uri: data.ktp_penanggung}}
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
          />
        </View>
        <TouchableOpacity
          onPress={() => getGallery(2)}
          style={{
            paddingVertical: 20,
            borderRadius: 10,
            backgroundColor: colors.border,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Fotocopy KTP Penanggung Jawab
            </Text>
          </View>
          <View>
            <Icon
              color={colors.white}
              type="ionicon"
              name="cloud-upload-outline"
            />
          </View>
        </TouchableOpacity>
        <MyGap jarak={20} />
        <MyButton
          warna={colors.primary}
          title="DAFTAR KREDIT"
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
    backgroundColor: colors.white,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
