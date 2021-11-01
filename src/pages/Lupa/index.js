import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import axios from 'axios';
import {colors} from '../../utils/colors';

export default function Lupa({navigation, route}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setEmail(text);
      setValid(false);
      return false;
    } else {
      setEmail(text);
      setValid(true);
      // console.log('Email is Correct');
    }
  };

  const simpan = () => {
    setLoading(true);
    axios
      .post('https://zavalabs.com/niagabusana/api/lupa.php', {
        email: email,
      })
      .then(res => {
        // console.log(res.data);
        setLoading(false);
        showMessage({
          message: 'berhasil dikirim, silahkan cek email Anda',
          type: 'success',
        });
        // navigation.replace('Login');
      });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        {/* {validasi} */}
        Masukan Alamat E - mail
      </Text>

      <TextInput
        autoFocus={true}
        keyboardType="email-address"
        autoCapitalize="none"
        maxLength={100}
        style={{
          borderBottomWidth: 1,
          width: '100%',
          textAlign: 'center',
          fontSize: 20,
          color: 'black',
          fontFamily: 'Montserrat-Light',
        }}
        onChangeText={value => validate(value)}
      />
      <TouchableOpacity
        onPress={simpan}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
          height: 45,
          paddingHorizontal: 50,
          marginVertical: 50,
          borderRadius: 5,
        }}>
        <Text
          style={{
            // fontSize: 50,
            color: colors.black,
            fontFamily: 'Montserrat-Medium',
          }}>
          KIRIM RESET PASSWORD
        </Text>
      </TouchableOpacity>
      {loading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100%',
            top: 0,
            opacity: 0.4,
            height: '100%',
          }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
