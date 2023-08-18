import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../utilty/Colors";
import Theming from "../utilty/styling/theming";
import Header from "./Includes/Header";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import AnimatedLoader from 'react-native-animated-loader';
import { Ionicons } from '@expo/vector-icons';
import store from "../store";
import ErrorMessage from "../components/ErrorMessage";
import { normal_error } from "../store/modules/error/actions";
interface PropsData {
  children?;
  style?;
  extraHeaderStyle?;
  loaderVisible?: boolean;
  isBack?: boolean;
  scrollEnable?: boolean,
  colorsType?: any;
  type?: string;
  onBackCallback?;
  isHistory?;
  isWebViewBackEnable?: boolean;
  isModal?:boolean;
  refreshCoin?:boolean;
  isHeaderEnable?:boolean;
}
const MainLayout = ({ children, style = {}, extraHeaderStyle = {}, loaderVisible = false, isBack = false, scrollEnable = true, colorsType = undefined, type = 'dark', onBackCallback, isHistory = true, isWebViewBackEnable = false,isModal=false,refreshCoin=false,isHeaderEnable=true }: PropsData) => {
  const navigation = useNavigation();
  return (
    <View style={[(type == 'dark') ? Theming.LayoutContainer : Theming.LayoutContainerLight, style]} ref={navigatorRef => { }}>
      {/* <AnimatedLoader
        visible={loaderVisible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("./loader.json")}
        animationStyle={Theming.lottie}
        speed={1}>
        <Text>Please wait...</Text>
      </AnimatedLoader> */}
      {loaderVisible &&
        <Modal visible={loaderVisible} transparent>
          <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.4)', zIndex: 99999, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Image source={require('../assets/loader.gif')} style={{ width: 100, height: 100 }} />
            </View>
          </View>
        </Modal>
      }
      <StatusBar style="light" animated={true}></StatusBar>
     
      {isHeaderEnable && 
        <>
          <View style={{ height: 45, backgroundColor: Colors.primary_color }}></View>
          <Header refreshCoin={refreshCoin} isModal={isModal} isWebViewBackEnable={isWebViewBackEnable} route={useRoute()} isHistory={isHistory} onBackCallBack={() => { (typeof onBackCallback === 'function') ? onBackCallback() : '' }} style={extraHeaderStyle} navigation={useNavigation()} colorsType={'liniarColorHome'} isBack={isBack}></Header>
        </>
      }
      <ScrollView scrollEnabled={scrollEnable} bounces={false} style={{ margin:0,padding:0 }}>
        {isBack &&
          <></>
          // <Pressable onPress={() => { navigation?.goBack() }} style={{ marginLeft: 10, borderWidth: 1, width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
          //   <Ionicons name="ios-arrow-back" size={24} color="black" />
          // </Pressable>
        }
        {children}
        {/* <View style={{ height:45,backgroundColor:Colors.backGroundColor }}></View> */}
      </ScrollView>
    </View>
  );
}

export default MainLayout;
