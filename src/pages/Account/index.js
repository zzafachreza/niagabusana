import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import {windowWidth, fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {MyButton, MyGap} from '../../components';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

export default function Account({navigation, route}) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');

  const getWa = () => {
    axios.get('https://zavalabs.com/niagabusana/api/company.php').then(res => {
      setCom(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(user);
      });
      getWa();
    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  const kirimWa = x => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=' +
        x +
        '&text=Halo%20NIAGA%20BUSANA',
    );
  };

  return (
    <SafeAreaView>
      <View style={{padding: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              borderRadius: 75,

              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri:
                  user.foto == ''
                    ? 'https://zavalabs.com/nogambar.jpg'
                    : user.foto,
              }}
              resizeMode="cover"
              style={{width: 150, aspectRatio: 1}}
            />
          </View>

          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 20,
              color: colors.primary,
            }}>
            {user.nama_lengkap}
          </Text>
        </View>
        {/* data detail */}
        <View style={{padding: 10}}>
          <MyButton
            onPress={() => navigation.navigate('EditProfile', user)}
            title="Edit Profile"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.secondary}
            Icons="create-outline"
          />

          <MyGap jarak={10} />
          <View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                E-mail
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.email}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: colors.white,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  color: colors.black,
                }}>
                Telepon / Whatsapp
              </Text>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  color: colors.primary,
                }}>
                {user.tlp}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Alamat', user)}
              style={{
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
                backgroundColor: colors.white,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  Alamat
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                  }}>
                  {user.alamat}
                </Text>
              </View>
              <View>
                <Icon type="ionicon" name="chevron-forward-outline" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListData')}
              style={{
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
                backgroundColor: colors.white,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                  }}>
                  Pesanan Saya
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                  }}>
                  Informasi Pesanan
                </Text>
              </View>
              <View>
                <Icon type="ionicon" name="chevron-forward-outline" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* button */}
        <View style={{padding: 10}}>
          <MyButton
            onPress={btnKeluar}
            title="Keluar"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.tertiary}
            Icons="log-out-outline"
          />
          <MyGap jarak={10} />
          <MyButton
            onPress={() => kirimWa(com.tlp)}
            title="Hubungi Admin NIAGA BUSANA"
            colorText={colors.black}
            iconColor={colors.black}
            warna={colors.secondary}
            Icons="logo-whatsapp"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
