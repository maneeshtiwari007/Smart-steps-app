import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../utilty/Colors";
import Theming from "../utilty/styling/theming";
import Header from "./Includes/Header";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import AnimatedLoader from 'react-native-animated-loader';
import { Ionicons } from '@expo/vector-icons';
import store from "../store";
import ErrorMessage from "../components/ErrorMessage";
import { normal_error } from "../store/modules/error/actions";
interface PropsData {
  children?;
  style?;
  extraHeaderStyle?;
  loaderVisible?:boolean;
  isBack?:boolean;
  scrollEnable?:boolean
}
const MainLayout = ({ children, style = {}, extraHeaderStyle = {}, loaderVisible = false,isBack=false,scrollEnable=true }:PropsData) => {
  const navigation = useNavigation();
  return (
    <View style={[Theming.LayoutContainer, style]} ref={navigatorRef => { }}>
      <AnimatedLoader
        visible={loaderVisible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={Theming.lottie}
        speed={1}>
        <Text>Please wait...</Text>
      </AnimatedLoader>
      <StatusBar style="light" animated={true}></StatusBar>
      <View style={{ height:45,backgroundColor:Colors.primary_color }}></View>
      <Header style={extraHeaderStyle} navigation={useNavigation()}></Header>
      <ScrollView scrollEnabled={scrollEnable}>
        {isBack && 
          <Pressable onPress={() => { navigation?.goBack() }} style={{ marginLeft: 10, borderWidth: 1, width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
          </Pressable>
        }
        {children}
        <View style={{ marginBottom:45 }}></View>
      </ScrollView>
    </View>
  );
}

export default MainLayout;
