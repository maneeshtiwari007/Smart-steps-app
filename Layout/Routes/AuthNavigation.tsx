import React, { Component} from "react";
import {
  NavigationContainer,
  
} from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeEventEmitter, StyleSheet,NativeModules } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class AuthNavigation extends Component<{}> {
  //global.isLoggedin=true;
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    }
    
  }

  componentDidMount() {
    //this.RegisterStackNavigator()
  }
  loginStackNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
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
      </NavigationContainer>
    );
  }
  RegisterStackNavigator() {
   
  }
  render() {
    //this.RegisterStackNavigator();
    return (
      <>
          this.loginStackNavigator()
      </>
    );
  }
}
const styles = StyleSheet.create({
  tabScreen: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});
