import React, {useState, useEffect, useRef} from 'react';
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
import {Modalize} from 'react-native-modalize';
import {getData} from '../../utils/localStorage';

export default function Search2({navigation, route}) {
  const modalizeRef = useRef();
  const [liked, setLiked] = useState([]);
  const [user, setUser] = useState([]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const item = route.params;
  console.log(route.params);

  navigation.setOptions({
    title: item.nama_kategori,
  });

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);

  const cariSub = (nama_sub, filter) => {
    axios
      .post('https://zavalabs.com/niagabusana/api/barang_cari_key.php', {
        cari: nama_sub,
        filter: filter,
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
        // setData(res.data.data);
      });
  };

  const getFilter = (nama_kategori = item.nama_kategori, filter) => {
    axios
      .post('https://zavalabs.com/niagabusana/api/barang_kategori.php', {
        cari: nama_kategori,
        filter: filter,
      })
      .then(res => {
        console.log(filter);
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    getFilter(item.nama_kategori, filter);

    getData('user').then(res => {
      setUser(res);
    });

    axios
      .post('https://zavalabs.com/niagabusana/api/sub_kategori.php', {
        cari: item.nama_kategori,
      })
      .then(res => {
        console.log('subkategori', res.data);
        setCat(res.data);
        // setData(res.data.data);
      });
  }, []);

  const [filter, setFilter] = useState('Harga: Rendah ke Tinggi');

  const renderItemSubKategori = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => cariSub(item.nama_sub_kategori)}
        style={{
          backgroundColor: colors.primary,
          margin: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
        }}>
        <Text
          style={{
            color: colors.white,
          }}>
          {item.nama_sub_kategori}
        </Text>
      </TouchableOpacity>
    );
  };

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

  return (
    <>
      <View
        style={{
          padding: 10,
          backgroundColor: colors.white,
        }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={cat}
          renderItem={renderItemSubKategori}
        />
        <TouchableOpacity
          onPress={onOpen}
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="filter-outline" />
            <Text style={{left: 10, fontFamily: fonts.secondary[400]}}>
              Filters
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="funnel-outline" />
            <Text style={{left: 10, fontFamily: fonts.secondary[400]}}>
              {filter}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Icon type="ionicon" name="list" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: colors.white,
        }}>
        <FlatList
          numColumns={3}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>

      <Modalize
        withHandle={true}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={300}
        HeaderComponent={
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 12,
                  }}>
                  Sortir Dengan :{' '}
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        withHandle={false}
        ref={modalizeRef}>
        <View style={{flex: 1, height: 330}}>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={() => {
                setFilter('Diskon');

                getFilter(item.nama_kategori, 'Diskon');

                modalizeRef.current.close();
              }}
              style={{padding: 10, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 15,
                }}>
                Diskon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('Terbaru');

                getFilter(item.nama_kategori, 'Terbaru');

                modalizeRef.current.close();
              }}
              style={{padding: 10, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 15,
                }}>
                Terbaru
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('Harga: Rendah ke Tinggi');
                getFilter(item.nama_kategori, 'Harga: Rendah ke Tinggi');
                modalizeRef.current.close();
              }}
              style={{padding: 10, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 15,
                }}>
                Harga: Rendah ke Tinggi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('Harga: Tinggi ke Rendah');
                getFilter(item.nama_kategori, 'Harga: Tinggi ke Rendah');
                modalizeRef.current.close();
              }}
              style={{padding: 10, marginBottom: 5}}>
              <Text
                style={{
                  fontFamily: fonts.secondary[400],
                  fontSize: windowWidth / 15,
                }}>
                Harga: Tinggi ke Rendah
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>

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
    flex: 0.3,

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
