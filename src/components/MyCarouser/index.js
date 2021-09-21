import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';

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
      image: {
        uri: 'https://static.bmdstatic.com/st/home/e0b7d3-small-banner_600x300.jpg',
      },
    },
    {
      image: {
        uri: 'https://static.bmdstatic.com/st/home/b518d3-small-banner_600x300.jpg',
      },
    },
    {
      image: {
        uri: 'https://static.bmdstatic.com/st/home/e74876-small-banner_600x300.jpg',
      },
    },
  ]);

  const Pagination = () => {
    const {entries, activeSlide} = useState();

    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableNativeFeedback>
        <ImageBackground
          key={item.id}
          // resizeMode="contain"
          source={item.image}
          style={{
            height: Math.round((windowWidth * 9) / 18),
          }}
        />
      </TouchableNativeFeedback>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.request[100],
            fontSize: windowWidth / 15,
            color: colors.white,
          }}>
          BM ELEKTRONIK
        </Text>
      </View>
      {/* <Carousel
        // layout="stack"
        layoutCardOffset={18}
        data={data}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        renderItem={_renderItem}
        activeDotIndex
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={3000}
        onSnapToItem={index => setActiveSlide(index)}
        activeAnimationType="timing"
        loop={true}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
