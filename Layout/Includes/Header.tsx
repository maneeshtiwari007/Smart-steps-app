import { Component } from "react";
import { Animated, DeviceEventEmitter, Image, Pressable, Text, View } from "react-native";
import Theming from "../../utilty/styling/theming";
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import store from "../../store";
import { is_wallet_customer, wallet_data } from "../../store/modules/wallet/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { home_customer_data } from "../../store/action";
import { NativeEventEmitter } from "react-native";
import { Constant } from "../../utilty/Constant";
import { CommonHelper } from "../../utilty/CommonHelper";
import NetInfo from '@react-native-community/netinfo';
interface ContentProps {
    style: any,
    colorsType?;
    navigation?;
    isBack?;
    onBackCallBack?;
    isHistory?;
    route?;
    isWebViewBackEnable?;
    isModal?;
    refreshCoin?;
}
class Header extends Component<ContentProps> {
    constructor(props: ContentProps) {
        super(props);
        this.state = {
            customerData: [],
            interValId:{}
        }
    }
    componentDidMount() {
        NetInfo.addEventListener(state => {
            if(state?.isInternetReachable){
                this.props.navigation.navigate("AppContainer");
            } else {
                this.props.navigation.navigate("NetworkModal");
            }
          });
        DeviceEventEmitter.addListener(Constant.REFRESH_COINT_EVENT,(data:any)=>{
            this.getCustomerData();

        });
        DeviceEventEmitter.addListener(Constant.LOGOUT_EVENT,(data:any)=>{
            setTimeout(()=>{
                CommonHelper.removeData('user');
                this.props.navigation.replace('Auth');
            },500)
        });
        this.props.navigation.addListener('focus', async () => {
            const getAcivityData = await CommonHelper.getData(Constant.ACTIVITY_NAME);
            if(getAcivityData){
                const parseData = JSON.stringify(getAcivityData);
                CommonApiRequest.customerEvent(parseData).then((response) => {
                    this.setState({ currentStepCount: 0, distance: 0, currentSpeed: 0 });
                    this.setState({ loader: false });
                    if (response?.success) {
                        DeviceEventEmitter.emit(Constant.REFRESH_COINT_EVENT, { data: 'data' });
                    }
                });
            }
            this.getCustomerData();
            store.dispatch(is_wallet_customer(true));
            const globalState = store.getState().wallet.data;

            var routeData = (globalState?.length) ? globalState : "";

            const reg = /,$/;
            const roteDataTrim = (globalState?.length) ? globalState?.replace(reg, '') : "";
            var arrayObj = roteDataTrim.split(",");
            const objLength = arrayObj.length;
            if (objLength >= 1) {
                if (arrayObj[objLength - 1] !== this.props.route?.name) {
                    routeData = (globalState?.length) ? globalState?.replace(reg, '') : ""
                    routeData = (routeData?.length > 0) ? routeData + "," + this.props.route?.name : routeData + this.props.route?.name + ",";
                }
            }

            //routeData?.push({name:this.props.route?.name});
            store.dispatch(wallet_data(routeData));
        });
        const globalState = store.getState().wallet.data;

        var routeData = (globalState?.length) ? globalState : "";

        const reg = /,$/;
        const roteDataTrim = (globalState?.length) ? globalState?.replace(reg, '') : "";
        var arrayObj = roteDataTrim.split(",");
        const objLength = arrayObj.length;
        if (objLength >= 1) {
            if (arrayObj[objLength - 1] !== this.props.route?.name) {
                routeData = (globalState?.length) ? globalState?.replace(reg, '') : ""
                routeData = (routeData?.length > 0) ? routeData + "," + this.props.route?.name : routeData + this.props.route?.name + ",";
            }
        }
        this.getCustomerData();
        // if(!store.getState().home?.isCustomerData){
        //     store.dispatch(home_customer_data(true));
        //     this.setState({interValId:setInterval(()=>{
        //         this.getCustomerData();
        //     },20000)});
        // }
        
        //routeData?.push({name:this.props.route?.name});
        store.dispatch(wallet_data(routeData));
        
    }
    getCustomerData(){
        CommonApiRequest.customerGet({}).then((response) => {
            if (response?.success) {
                this.setState({ customerData: response?.data });
            }
        })
    }
    toggleDrawer() {
        this.props.navigation.toggleDrawer();
    }
    onHomeScreen() {
        //console.log(this.props.isWebViewBackEnable);
        // if (!this.props.isWebViewBackEnable) {
        //     const reg = /,$/;
        //     const globalState = store.getState().wallet.data?.replace(reg, '');
        //     if (globalState?.length > 0) {
        //         var arrayObj = globalState.split(",");
        //         const lastLength = arrayObj.length;
        //         if (arrayObj?.[lastLength - 2]) {
        //             this.props.navigation.navigate(arrayObj[lastLength - 2]);
        //             arrayObj.pop();
        //             store.dispatch(wallet_data(arrayObj.toString()));
        //         }
        //     }
        // } else {
        //     this.props.onBackCallBack();
        // }
        if(this.props.isWebViewBackEnable){
            this.props.onBackCallBack();
        } else {
            this.props.navigation.goBack();
        }
        
        if (!this.props.isHistory) {
            //this.props.navigation.navigate('Home');
        }
    }
    componentWillUnmount() {
        //clearInterval(this?.state?.interValId);
    }
    render() {
        return (
            <>
                <Animated.View style={[Theming.MainHeaderLayoutContainer, this.props?.style]}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={(this.props.colorsType) ? Colors?.[this.props.colorsType] : Colors?.liniarColorProduct}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }} style={[Theming.MainHeaderLayoutContent, { padding: 10 }]}>
                        {!this.props.isBack && this.props.isWebViewBackEnable && !this.props.isModal &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Pressable style={{}} onPress={() => {
                                    this.onHomeScreen()
                                }}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/staticimages/back-icon-white.png')}></Image>
                                </Pressable>
                            </View>
                        }
                        {this.props.isModal &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                                <Pressable style={{}} onPress={() => {
                                    this.onHomeScreen()
                                }}>
                                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/staticimages/back-icon-white.png')}></Image>
                                </Pressable>
                            </View>
                        }
                        <View style={{ marginLeft: (this.props.isWebViewBackEnable) ? -20 : 0 }}>
                            <Pressable style={Theming.headerLeftUserIcon} onPress={() => {
                                this.props.navigation.navigate("Profile")
                            }}>
                                <Image style={{ width: 12, height: 18 }} source={require('../../assets/staticimages/user.png')}></Image>
                                <Text style={Theming.badgeWarning}>{(this?.customerData?.totalDistance) ? this?.customerData?.totalDistance : 0} km</Text>
                            </Pressable>
                        </View>
                        <View>
                            {/* <Pressable style={Theming.headerMiddileIcon} onPress={() => {
                                this.props?.navigation?.navigate("WalletScreen");
                            }}>
                                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f20, marginRight: 2, fontWeight: '600' }}>$</Text>
                                <Text style={{ color: Colors.white, fontSize: 16 }}>0</Text>
                            </Pressable> */}
                            <Pressable style={[Theming.headerRightIcon, { minWidth: 180, height: 38, borderColor: Colors.primary_color, borderStyle: "solid", borderWidth: 1, borderRadius: 30, flexDirection: 'row', justifyContent: "space-between", paddingLeft: 7, backgroundColor: Colors.white }]} onPress={() => {
                                this.props?.navigation?.navigate("WalletScreen");
                            }}>
                                {this.state?.customerData?.spending?.[0] && this.state?.customerData?.spending?.map((item, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', maxWidth: 'auto', height: 30, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                                            <Image source={{ uri: item?.imageUrl }} style={{ width: 25, height: 25, borderRadius: 100, }}></Image>
                                            <Text style={{ marginLeft: 2 }}>{item?.amountNotation}</Text>
                                        </View>
                                    )
                                })}
                                <View style={[Theming.iconStyle, { marginLeft: 2 }]}>
                                    <Image source={require('../../assets/staticimages/rect-icon.png')} style={{ width: 25, height: 25 }}></Image>
                                </View>
                            </Pressable>
                        </View>
                        <View style={Theming.headerRightIconContainer}>
                            {/* <Pressable style={[Theming.headerRightIcon, { width: 200, height: 38, borderColor: Colors.primary_color, borderStyle: "solid", borderWidth: 1, borderRadius: 30, flexDirection: 'row', justifyContent: "space-between", paddingLeft: 15, backgroundColor: Colors.white, marginRight: 6 }]} onPress={() => {
                                    this.props?.navigation?.navigate("WalletScreen");
                                }}>
                                    <View style={{ flexDirection: 'row', width: 25, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/staticimages/shoe-icon.png')} style={{ width: '100%', height: 25, borderRadius: 100, }}></Image>
                                        <Text style={{ marginLeft: 5 }}>0</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: 25, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/staticimages/circleRect.png')} style={{ width: '100%', height: 25 }}></Image>
                                        <Text style={{ marginLeft: 5 }}>0</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: 25, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/staticimages/circleBitcoin.png')} style={{ width: '100%', height: 25 }}></Image>
                                        <Text style={{ marginLeft: 5 }}>0</Text>
                                    </View>
                                    <View style={Theming.iconStyle}>
                                        <Image source={require('../../assets/staticimages/rect-icon.png')} style={{ width: 25, height: 25 }}></Image>
                                    </View>
                                </Pressable> */}
                            {/* <View style={[Theming.headerRightIcon]}>
                                <Ionicons name="notifications-outline" color={Colors.white} size={25}></Ionicons>
                            </View> */}
                            <Pressable style={[Theming.headerRightIcon]} onPress={() => {
                                this.props.navigation.navigate("Suport")
                            }}>
                                <MaterialIcons name="support-agent" size={25} color={Colors.white} />
                            </Pressable>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </>
        );
    }
}
function mapStateToProps(state: any) {
    return {
        data: state?.wallet?.data
    }
}
function mapDispatchToProps(dispatch) {
    return {
        bindGlogal: (data) => dispatch(wallet_data(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);