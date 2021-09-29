import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../utils/colors';
import {getData, storeData} from '../../utils/localStorage';
import {useIsFocused} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const isFocused = useIsFocused();

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const [cart, setCart] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        console.log('data user', res);
        setUser(res);
      });
      getData('cart').then(res => {
        console.log('cart pada bottom', res);
        setCart('cart', res);
      });
    }
  }, [isFocused]);

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        let iconType = 'ionicon';

        if (label === 'Home') {
          iconName = 'home-outline';
        } else if (label === 'Account') {
          iconName = 'person-outline';
        } else if (label === 'Transaksi') {
          iconName = 'grid-outline';
        } else if (label === 'Kategori') {
          iconName = 'grid-outline';
        } else if (label === 'Cart') {
          iconName = 'cart-outline';
          // iconType = 'simplelineicons';
        } else if (label === 'Wistlist') {
          iconName = 'heart-outline';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <View
              style={{
                color: isFocused ? colors.primary : colors.primary,
                backgroundColor: isFocused ? 'white' : '#FFFFFF',
                paddingTop: 5,
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  position: 'relative',
                  backgroundColor: 'white',
                  borderTopWidth: 0,
                  borderWidth: 3,

                  position: 'relative',
                  borderColor: 'white',
                  borderRadius: 0,
                  width: 80,
                  marginBottom: 0,
                  bottom: 0,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={iconName}
                  type={iconType}
                  size={windowWidth / 20}
                  color={isFocused ? colors.primary : ''}
                />

                <Text
                  style={{
                    fontSize: windowWidth / 45,
                    color:
                      isFocused && iconName == 'cart'
                        ? 'cart'
                        : !isFocused && iconName == 'cart'
                        ? 'white'
                        : isFocused
                        ? colors.primary
                        : colors.primary,
                  }}></Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
