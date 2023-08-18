import { StatusBar } from "expo-status-bar";
import { Animated, Button, DeviceEventEmitter, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MainLayout from "./Layout/Index";
import Colors from "./utilty/Colors";
import React, { useEffect, useState } from "react";
//import { GTM } from './utilty/GTM';
import CircularProgress from './components/CircularProgress';
import { Pedometer } from 'expo-sensors';
import AppContainer from "./Layout/Routes/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import { Provider } from "react-redux";
import store from "./store";
import NetInfo from '@react-native-community/netinfo';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useTheme } from "react-native-paper";
import NetworkModal from "./screens/Modal/NetworkModal";
import { Constant } from "./utilty/Constant";

export default function App() {
  const [backGroundColor, setBackGroundColor] = useState(Colors.homeHeadColor);
  const [isNetAvil, setIsNetAvil] = useState(true);
  let AnimateHeaderValue = new Animated.Value(0);
  const HEADER_MAX_HEIGHT = 400;
  const HEADER_MIN_HEIGHT = 90;
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const Stack = createStackNavigator();
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  const animatedHeaderBackground = AnimateHeaderValue.interpolate;
  ({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ["blue", "red"],
    extrapolate: "clamp",
  });
  const animatedHeaderHeight = AnimateHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, 0],
    extrapolate: "clamp",
  });
  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetAvil(state?.isInternetReachable);
      DeviceEventEmitter.emit(Constant.WIFI_NOT_AVIL,{data:state});
    });
  })

  const data = [
    {

    },
    {

    },
    {

    },
  ];
  const calculateSteps = async (e) => {
    await subscribe();
  }
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };
  const Auth = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  if (!fontsLoaded) {
  } else {
    return (
      // <AppContainer></AppContainer>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{gestureEnabled: false}}>
            {/* SplashScreen which will come once for 5 Seconds */}
            {isNetAvil &&
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{ headerShown: false,gestureEnabled:false }}
              />
            }
            {!isNetAvil &&
            <Stack.Screen
              name="NetworkModal"
              component={NetworkModal}
              // Hiding header for Splash Screen
              options={{ headerShown: false,gestureEnabled:false }}
            />
            }
            {/* Auth Navigator: Include Login and Signup */}
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
              name="AppContainer"
              component={AppContainer}
              // Hiding header for Navigation Drawer
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    height: 20,
    flexDirection: "row",
    width: '100%',
    borderColor: '#fff',
    borderWidth: 4,
  }
});
