import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {windowWidth, fonts} from '../../utils/fonts';
import {getData, storeData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {MyButton, MyGap} from '../../components';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

export default function Account({navigation, route}) {
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(user);
      });
    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
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
            warna={colors.primary}
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
                  color: colors.primary,
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
                    color: colors.primary,
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
                    color: colors.primary,
                  }}>
                  Transaksi
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                  }}>
                  Informasi Transaksi Anda
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
            colorText={colors.primary}
            iconColor={colors.primary}
            Icons="log-out-outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
