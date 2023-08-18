// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../utilty/Colors';
import { CommonHelper } from '../utilty/CommonHelper';
import { ResizeMode, Video } from 'expo-av';
import * as Device from 'expo-device';
const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  let video=null;

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      //CommonHelper.removeData('user');
      AsyncStorage.getItem('user').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'AppContainer'//AppContainer
        ),
      );
    }, 6000);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={(ref) => video = ref}
        style={{ width: '100%', height: '100%', zIndex: 9 }}
        source={((Device?.osName === 'iOS'))?require('../assets/splash.mp4'):require('../assets/splash.mp4')}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
      />
      {/* <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      /> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'//Colors.light_crystal_blue,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});