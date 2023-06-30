import React, { Component, useContext, useEffect, useState } from "react";
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5
} from "@expo/vector-icons";
import { NativeEventEmitter, StyleSheet, NativeModules } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeSscreen from "../../screens/HomeScreen";
import Colors from "../../utilty/Colors";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import global from "../../utilty/states/global";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomSidebarMenu from "./CustomSideBarMenu";
import ProductSscreen from "../../screens/ProductScreen";
import DetailScreen from "../../screens/Product/DetailScreen";
import UserWalletScreen from "../../screens/Wallet/UserWalletScreen";
import StaticSCreen from "../../screens/StaticScreen";
import CustomerProductScreen from "../../screens/Product/CustomerProductScreen";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class AppContainer extends Component<{}> {
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
  ProductStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={ProductSscreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ProductDetailScreen" component={DetailScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    )
  }
  CustomerProductStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NFT"
          component={CustomerProductScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ProductDetailScreen" component={DetailScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    )
  }
  BottomTabStack() {
    return (
      <>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor={Colors.light_crystal_blue}
          inactiveColor={Colors.white}
          barStyle={{ backgroundColor: Colors.primary_color }}
        >
          <Tab.Screen
            name="Home"
            component={HomeSscreen}
            options={{
              tabBarLabel: "Sports",
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="running" size={26} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="NFT"
            component={CustomerProductScreen}
            options={{
              tabBarLabel: "NFT",
              tabBarIcon: ({ focused,color }) => (
                <MaterialCommunityIcons name="shoe-sneaker" size={26} color={color} />
              ),
              tabBarAccessibilityLabel:"NFT"
            }}
          />
          <Tab.Screen
            name="Notification"
            component={StaticSCreen}
            options={{
              tabBarLabel: "Statistics",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductSscreen}
            options={{
              tabBarLabel: "Product",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cart-outline" size={26} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </>

    );
  }
  HomeScreenStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabStack" component={this.BottomTabStack} />
        <Stack.Screen name="ProductDetailScreen" component={DetailScreen}></Stack.Screen>
        <Stack.Screen name="WalletScreen" component={UserWalletScreen}></Stack.Screen>
      </Stack.Navigator>
    );
  };
  WalletScreenStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="UserWallet"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserWallet" component={UserWalletScreen} />
      </Stack.Navigator>
    );
  };
  Logout = () => {
    alert('Hi');
    this.props?.navigation.navigate("LoginScreen");
    return ("");
  }
  render() {
    //this.RegisterStackNavigator();
    return (
      <>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
          }}
          drawerContent={CustomSidebarMenu}
        >
          <Drawer.Screen
            name="HomeScreenStack"
            options={{
              drawerLabel: 'Home',
              title: 'Home Screen',
              headerShown: false
            }}
            component={this.HomeScreenStack}
          />
          {/* <Drawer.Screen
            name="WalletScreenStack"
            options={{
              drawerLabel: 'User Wallet',
              title: 'User Wallet',
              headerShown: false
            }}
            component={this.WalletScreenStack}
          /> */}
        </Drawer.Navigator>
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
