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
import { NativeEventEmitter, StyleSheet, NativeModules, Image } from "react-native";
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
import OtherRoutes, { OtherRoutesHome, OtherRoutesNft, OtherRoutesProduct, OtherRoutesWallet } from "./OtherRoutes";
import Suport from "../../screens/Suport";
import Profile from "../../screens/Profile";
import PedometerScreen from "../../screens/Modal/PedometerScreen";
import NetworkModal from "../../screens/Modal/NetworkModal";
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
  HeaderScreenStack(){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeSscreen}
        ></Stack.Screen>
        <Stack.Screen
          name="WalletScreen" component={UserWalletScreen}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }
  BottomTabStack() {
    return (
      <>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor={Colors.light_crystal_blue}
          inactiveColor={Colors.primary_color}
          barStyle={{ height:75,backgroundColor: Colors.white}}
          labeled={true}
        >
          <Tab.Screen
            name="Homes"
            component={OtherRoutesHome}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused,color }) => (
                <Image source={(focused)?require('../../assets/staticimages/running-man-blue.png'):require('../../assets/staticimages/running-man-black.png')} style={{ height:40,width:40 }}/>
              ),
            }}
          />
          <Tab.Screen
            name="NFTs"
            component={OtherRoutesNft}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused,color }) => (
                <Image source={(focused)?require('../../assets/staticimages/shoe-blue.png'):require('../../assets/staticimages/shoe-black.png')} style={{ height:40,width:40 }}/>
              ),
              tabBarAccessibilityLabel:"NFT"
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={OtherRoutesWallet}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused,color }) => (
                <Image source={(focused)?require('../../assets/staticimages/user-star-blue.png'):require('../../assets/staticimages/user-star-black.png')} style={{ height:40,width:40 }}/>
              ),
            }}
          />
          <Tab.Screen
            name="Productss"
            component={OtherRoutesProduct}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused,color }) => (
                <Image source={(focused)?require('../../assets/staticimages/cart-moving-blue.png'):require('../../assets/staticimages/cart-moving-black.png')} style={{ height:40,width:40 }}/>
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
        screenOptions={{ headerShown: false,gestureEnabled: false }}>
        <Stack.Screen name="BottomTabStack" component={this.BottomTabStack} options={{gestureEnabled:false}}/>
        <Stack.Screen name="ProductDetailScreen" component={DetailScreen} options={{gestureEnabled:false}}></Stack.Screen>
        <Stack.Screen name="WalletScreen" component={UserWalletScreen}  options={{gestureEnabled:false}}/>
        <Stack.Screen name="Suport" component={Suport}  options={{gestureEnabled:false}}/>
        <Stack.Screen name="Profile" component={Profile}  options={{gestureEnabled:false}}/>
        <Stack.Screen name="Pedometer" component={PedometerScreen}  options={{gestureEnabled:false}}/>
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
