import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('https://zavalabs.com/sebatiku/api/slider.php').then(res => {
    //   setData(res.data);
    // });
  }, []);

  const [data, setData] = useState([
    {
      image:
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
  ]);

  const renderCarouselItem = ({item}) => (
    <TouchableOpacity style={styles.cardContainer} key={item.id}>
      <Image
        source={{uri: item.image}}
        style={{widht: 200, height: 180, resizeMode: 'cover'}}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        style={{
          padding: 10,
          marginBottom: 10,
          backgroundColor: colors.white,
          borderBottomColor: colors.secondary,
          // justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{width: 60, height: 60}}
        />
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            color: colors.primary,
            left: 10,
            fontSize: windowWidth / 18,
          }}>
          NIAGA BUSANA
        </Text>
      </View>
      <Carousel
        loop={true}
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        containerCustomStyle={styles.carousel}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  cardContainer: {
    // backgroundColor: colors.black,
    opacity: 1,
    height: 180,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 50,
    width: 300,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
});
