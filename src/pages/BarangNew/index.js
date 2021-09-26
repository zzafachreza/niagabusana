import React, {useState, useEffect} from 'react';
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
import {getData} from '../../utils/localStorage';
import {useIsFocused} from '@react-navigation/native';

export default function BarangDiskon({navigation, route}) {
  const isFocused = useIsFocused();
  const [user, setUser] = useState({});

  const [key, setKey] = useState('');
  const [cari, setCari] = useState(false);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState([]);

  const [data, setData] = useState([]);
  const getDataBarang = () => {
    getData('user').then(res => {
      setUser(res);
      axios
        .post('https://zavalabs.com/niagabusana/api/barang_baru.php', {
          id_member: res.id,
        })
        .then(res => {
          console.log('barang diskon', res.data);
          setData(res.data);
        });
    });
  };

  useEffect(() => {
    if (isFocused) {
      getDataBarang();
    }
  }, [isFocused]);

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
              padding: 10,
              flexDirection: 'row',
            }}>
            {item.stok > 0 && (
              <Text
                style={{
                  backgroundColor: colors.success,
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
                  backgroundColor: colors.primary,
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
              fontSize: windowWidth / 28,
              flex: 1,
              // backgroundColor: colors.primary,
              paddingHorizontal: 5,

              // borderBottomLeftRadius: 20,
              // borderTopRightRadius: 20,
              color: colors.black,
              // textAlign: 'center',
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
                fontSize: windowWidth / 25,
                color: colors.warning,
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
                      fontSize: windowWidth / 30,
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
                      backgroundColor: colors.warning,
                      borderRadius: 5,
                      color: colors.white,
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
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#FFF',
          }}>
          <FlatList
            numColumns={2}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
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
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

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
    color: '#000',
    marginBottom: 5,
  },
});
