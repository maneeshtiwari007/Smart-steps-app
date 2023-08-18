import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserWalletScreen from '../../screens/Wallet/UserWalletScreen'
import HomeSscreen from '../../screens/HomeScreen';
import CustomerProductScreen from '../../screens/Product/CustomerProductScreen';
import StaticSCreen from '../../screens/StaticScreen';
import ProductSscreen from '../../screens/ProductScreen';
import Suport from '../../screens/Suport';
import Profile from '../../screens/Profile';
const Stack = createStackNavigator()
function OtherRoutesHome() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeSscreen} />
        
      </Stack.Navigator>
  )
}
function OtherRoutesNft() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="NFT" component={CustomerProductScreen} />
      </Stack.Navigator>
  )
}
function OtherRoutesWallet() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Notification" component={StaticSCreen} />
      </Stack.Navigator>
  )
}
function OtherRoutesProduct() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Products" component={ProductSscreen} />
        <Stack.Screen name="WalletScreen" component={UserWalletScreen} />
      </Stack.Navigator>
  )
}
export {OtherRoutesHome,OtherRoutesNft,OtherRoutesProduct,OtherRoutesWallet}