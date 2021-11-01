import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {MyHeader} from '../../components';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {colors} from '../../utils/colors';
import LottieView from 'lottie-react-native';
import {fonts, windowWidth} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Search({navigation, route}) {
  const [key, setKey] = useState('');
  const [cari, setCari] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState([]);

  const [data, setData] = useState([]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Barang', item)}
        activeOpacity={1.0}>
        <Image
          style={styles.image}
          source={{
            uri: item.foto,
          }}
        />

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: 5,
              flexDirection: 'row',
            }}>
            {item.stok > 0 && (
              <Text
                style={{
                  backgroundColor: colors.tertiary,
                  borderRadius: 5,
                  color: colors.white,
                  paddingHorizontal: 5,
                }}>
                Tersisa {item.stok}
              </Text>
            )}
            {item.stok == 0 && (
              <Text
                style={{
                  backgroundColor: colors.border,
                  borderRadius: 5,
                  color: colors.white,
                  paddingHorizontal: 5,
                }}>
                Habis
              </Text>
            )}
          </View>
          <View
            style={{
              padding: 10,
            }}>
            {item.favorit > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  let unlike = liked.filter(elem => elem !== index);
                  setLiked(unlike);
                  axios
                    .post(
                      'https://zavalabs.com/niagabusana/api/fav_delete_barang.php',
                      {
                        id: item.id,
                        id_member: user.id,
                      },
                    )
                    .then(res => {
                      console.log('delete', res);
                      getDataBarang();
                    });
                }}>
                <Icon
                  type="ionicon"
                  name={liked.includes(index) ? 'heart' : 'heart'}
                  size={windowWidth / 15}
                  color={colors.primary}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  console.log(liked);
                  if (liked.includes(index)) {
                    let unlike = liked.filter(elem => elem !== index);
                    setLiked(unlike);
                    axios
                      .post(
                        'https://zavalabs.com/niagabusana/api/fav_delete_barang.php',
                        {
                          id: item.id,
                          id_member: user.id,
                        },
                      )
                      .then(res => {
                        console.log('delete', res);
                      });
                  } else {
                    setLiked([...liked, index]);
                    const kirim = {
                      id_member: user.id,
                      id_barang: item.id,
                      nama_barang: item.nama_barang,
                      qty: 1,
                      uom: item.uom,
                      harga: item.harga,
                      total: item.harga,
                      foto: item.foto,
                    };

                    axios
                      .post(
                        'https://zavalabs.com/niagabusana/api/fav_add.php',
                        kirim,
                      )
                      .then(res => {});
                  }
                }}>
                <Icon
                  type="ionicon"
                  name={liked.includes(index) ? 'heart' : 'heart-outline'}
                  size={windowWidth / 15}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Text style={styles.subTitle}>{item.nama_kategori}</Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35,
              flex: 1,
              paddingHorizontal: 5,
              color: colors.black,
            }}>
            {item.nama_barang}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 30,
                color: colors.primary,
              }}>
              {' '}
              Rp. {new Intl.NumberFormat().format(item.harga)}
            </Text>

            {item.diskon > 0 ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 35,
                      color: colors.border,
                      left: 5,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                      textDecorationColor: colors.black,
                    }}>
                    {' '}
                    Rp. {new Intl.NumberFormat().format(item.harga_awal)}
                  </Text>
                  <Text
                    style={{
                      left: 10,
                      backgroundColor: colors.fourty,
                      borderRadius: 5,
                      color: colors.black,
                      paddingHorizontal: 5,
                    }}>
                    {Math.round(100 - (item.harga / item.harga_awal) * 100)}%
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                  }}></View>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  padding: 10,
                }}></View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const pencarian = () => {
    setLoading(true);
    console.log(
      'lik',
      'https://zavalabs.com/niagabusana/api/barang_cari_key.php',
    );
    setTimeout(() => {
      setCari(true);
      axios
        .post('https://zavalabs.com/niagabusana/api/barang_cari_key.php', {
          cari: key,
        })
        .then(res => {
          console.log('hasil cari', res.data);
          setData(res.data);
          // setData(res.data.data);
        });
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            // flex: 1,
            backgroundColor: colors.primary,
            height: 70,
            flexDirection: 'row',

            padding: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon type="ionicon" name="arrow-back" color="#FFF" size={25} />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
              }}>
              <TextInput
                value={key}
                onSubmitEditing={pencarian}
                onChangeText={value => setKey(value)}
                selectionColor={'#FFF'}
                autoCapitalize="none"
                autoFocus
                style={{
                  paddingLeft: 20,
                  borderWidth: 1,
                  height: 45,
                  borderRadius: 10,
                  borderColor: '#FFF',
                  color: '#FFF',
                  flexDirection: 'row',
                  fontSize: 18,
                  justifyContent: 'center',
                }}
              />
            </View>
          </View>
        </View>
        {cari && (
          <View
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: '#FFF',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Icon
                type="ionicon"
                name="search"
                color={colors.primary}
                size={16}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: colors.primary,
                  left: 10,
                  fontSize: 16,
                }}>
                Kata Kunci "{key}"
              </Text>
            </View>
            <FlatList
              numColumns={3}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{flex: 1, backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    flex: 0.5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,

    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  detailsContainer: {
    // padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: fonts.secondary[800],
    fontSize: 15,
    color: colors.warning,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    paddingHorizontal: 5,
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 5,
  },
});
