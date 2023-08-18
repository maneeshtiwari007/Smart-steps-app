import React, { Component } from "react";
import {
    DeviceEventEmitter,
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getDistance } from 'geolib';
import MainLayout from "../Layout/Index";
import { Button } from "react-native";
import { Pedometer, Gyroscope, Accelerometer } from "expo-sensors";
import Colors from "../utilty/Colors";
import * as Location from 'expo-location';
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { connect } from "react-redux";
import store from "../store";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { HomeStyle } from "../utilty/styling/HomeStyle";
import { ThemeStyling } from "../utilty/styling/Styles";
import { ProgressBar } from "react-native-paper";
import WebView from "react-native-webview";
import { CommonHelper } from "../utilty/CommonHelper";
import { Constant } from "../utilty/Constant";
import { PermissionsAndroid } from 'react-native';
import * as Device from 'expo-device';
import ServerErrorMessage from "../components/Common/ServerErrorMessage";

interface StateInterface {
    pastStepCount: number;
    currentStepCount: null;
    isPedometerAvailable: "checking";
    isStart: false;
    pediMeterSubscription: {};
    gyroscopeData: {};
    isStillRunning: false,
    locationData: {},
    currentSpeed: 0,
    isLocation: true,
    isLocationBackground: false,
    startCords: {},
    stopCords: {},
    distance: 0,
    user: {},
    isStartButton: false
    refreshCoin: false
}
class HomeSscreen extends Component<{}> {
    _subscription = {};
    _gyroscopeSubscription = {};
    _accelerometerScubscription = {};
    _locationSubscription = {};
    webViewRef: any = null;
    constructor(props) {
        super(props);

        this.state = {
            isPedometerAvailable: "checking",
            pastStepCount: 0,
            currentStepCount: 0,
            isStart: false,
            pediMeterSubscription: {},
            abourtController: new AbortController(),
            gyroscopeData: {},
            isStillRunning: false,
            locationData: {},
            currentSpeed: 0,
            isLocation: true,
            isLocationBackground: false,
            startCords: {},
            stopCords: {},
            distance: 0,
            store: store.getState(),
            startTime: '',
            endTime: '',
            loader: false,
            productData: {},
            token: "",
            startDateTime: "",
            timer: "00:00",
            intervalId: "",
            url: null,
            webViewStateData: {},
            isWebViewBackEnable: false,
            httpError:false
        };
    }
    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
        return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
                {
                    title: 'Allow Smart Steps to access your physical activity?',
                    message:
                        'Allow Smart Steps to access your physical activity ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };
    async componentDidMount() {
        if (Device?.osName !== 'iOS') {
            this.requestCameraPermission();
        }
        this.setState({ timer: "00:00" });
        const isAvailable = await Pedometer.isAvailableAsync();
        this.setState({ isPedometerAvailable: isAvailable });
        const status = await Pedometer.requestPermissionsAsync();
        this.setState({
            isLocation: await Location.requestForegroundPermissionsAsync(),
            isLocationBackground: await Location.getBackgroundPermissionsAsync()
        });
        this.getCustomerProduct();
        setTimeout(() => {
            //store.dispatch(home_data("Testing"));
        })
        this.props.navigation.addListener('focus', async () => {
            this.getCustomerProduct();
            this.setState({ toke: new Date() });
            this.setState({ url: null });
            this?.webViewData?.goBack();
            const user = await CommonHelper.getData('user');
            if(this.state.httpError){
                setTimeout(() => {
                    this.setState({ url: CommonHelper.returnWebViewSports(user?.token) });
                }, 500)
            }
            if (user?.token) {
                setTimeout(() => {
                    this.setState({ url: CommonHelper.returnWebViewSports(user?.token) });
                }, 500)
            }
        });
        this.setState({ toke: new Date() });
        const user = await CommonHelper.getData('user');
        if (user?.token) {
            this.setState({ url: CommonHelper.returnWebViewSports(user?.token) });
        }

    }
    getCustomerProduct() {
        this.setState({ loader: false });
        CommonApiRequest.customerProduct({}).then((response) => {
            if (response?.success) {
                this.setState({ productData: response?.data })
                this.setState({ loader: false });
            } else {
                this.setState({ loader: false });
                this.setState({ productData: [] })
            }
        });
    }
    async calculateSteps() {
        this._locationSubscription = await Location.watchPositionAsync({ accuracy: Location.LocationAccuracy.Highest, mayShowUserSettingsDialog: true, timeInterval: 500 }, (loc) => {
            if (!this.state?.startCords?.latitude) {
                this.setState({ startCords: loc?.coords });
            }
        })
        this.setState({ isStart: true });
        this.setState({ startTime: new Date() });
        await this.subscribeSteps();
    }
    async stopCalculateSteps() {
        this._unsubscribe();
        this.setState({ isStart: false });
    }
    _subscribe = () => {
        this.setState({ isStillRunning: true });
        this.setState({ startDateTime: new Date() });
        this.setState({
            intervalId: setInterval(() => {
                const startDate = (this.state.startDateTime?.getTime());
                const endDate = (new Date()?.getTime());
                const msDiff = endDate - startDate;
                this.setState({ timer: this.millisToMinutesAndSeconds(msDiff) });
            }, 1000)
        });
        this._subscription = Pedometer.watchStepCount(async (result) => {
            const currentLocation = await Location.getCurrentPositionAsync();
            const distance = getDistance(this.state?.startCords, currentLocation?.coords, 1);
            this.setState({ currentSpeed: currentLocation?.coords?.speed });
            if (this.state.isStillRunning) {
                this.setState({ distance: distance });
                this.setState({
                    currentStepCount: result.steps,
                });
            }
        });
    };
    _unsubscribe = async () => {
        clearInterval(this.state?.intervalId);
        this.setState({ loader: true });
        this._subscription && this._subscription.remove();
        this._gyroscopeSubscription && this._gyroscopeSubscription.remove();
        this._accelerometerScubscription && this._accelerometerScubscription.remove();
        this._locationSubscription && this._locationSubscription.remove();
        this._subscription = null;
        this.setState({ endTime: new Date() });
        const currentLocation = await Location.getCurrentPositionAsync();
        this.setState({ stopCords: currentLocation?.coords });
        var seconds = (this.state?.endTime?.getTime() - this.state?.startTime?.getTime()) / 1000;
        const dataSend = {
            event: "Step",
            totalValue: this.state.currentStepCount,
            startDateTime: this.state?.startTime,
            endDateTime: this.state?.endTime,
            statistics: JSON.stringify({
                startPoint: this.state?.startCords,
                endPoint: this.state?.stopCords,
                distance: (this.state.distance / 100) + " km",
                rawDistance: this.state.distance
            })
        }
        CommonApiRequest.customerEvent(dataSend).then((response) => {
            this.setState({ currentStepCount: 0, distance: 0, currentSpeed: 0 });
            this.setState({ loader: false });
            if (response?.success) {
                alert("Your activity saved successfully!");
            }
        }).then(() => {
            this.setState({ loader: false });
            this.setState({ isStartButton: false });
        })
    };

    _subscribeGyroscope = () => {
        this._gyroscopeSubscription = Gyroscope.addListener((gyroscopeData) => {
            Gyroscope.setUpdateInterval(1000);
            //this.setState({ isStillRunning: true });
        });
    };
    _subscriptionAccelerometer = () => {
        this._accelerometerScubscription = Accelerometer.addListener((ev) => {
            Accelerometer.setUpdateInterval(1000);
        })
    }
    async subscribeSteps() {
        if (this.state.isPedometerAvailable) {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);
            this._subscribeGyroscope();
            this._subscribe();
            this._subscriptionAccelerometer();
        }
    }
    componentWillUnmount() {
        clearInterval(this.state?.intervalId);
    }
    handleWebViewNavigationStateChange(data: any) {
        this.setState({ refreshCoin: true })
        if (data?.url?.includes(Constant.check_for_start_url)) {

            this.props.navigation.navigate("Pedometer");
            //this.setState({isStartButton:true});
            this.setState({ loader: false });

        } else {
            this.setState({ isWebViewBackEnable: false });
        }
    }
    onBackHistory() {
        if (this.state.webViewStateData?.canGoBack) {
            if (this.state.isStartButton) {
                this.setState({ isStartButton: false });
            }
            this.setState({ isWebViewBackEnable: true });
            this?.webViewData?.goBack();
        } else {
            this.setState({ isStartButton: false })
            this.setState({ isWebViewBackEnable: false });
            //this.props?.navigation?.goBack(-1);
        }
    }
    render() {
        return (
            <MainLayout isWebViewBackEnable={this.state.isWebViewBackEnable} style={{}} extraHeaderStyle={{}} scrollEnable={false} loaderVisible={this.state?.loader} colorsType={'liniarColorHome'} onBackCallback={() => { this.onBackHistory() }}>
                {this.state?.url && !this.state?.isStartButton && 
                    <WebView
                        ref={(webViewRefData) => { this.webViewRef = webViewRefData }}
                        originWhitelist={['*']}
                        style={styles.WebViewcontainer}
                        source={{ uri: this.state?.url }}//this.state?.url
                        onLoadStart={() => {
                            this.setState({ loader: true })
                        }}
                        onLoadEnd={() => {
                            this.setState({ loader: false,httpError:false })
                        }}
                        onLoad={() => {
                            this.setState({ loader: false,httpError:false });
                        }}
                        onError={()=>{
                            this.setState({ loader: false });
                            this.setState({url:null,httpError:true})
                        }}
                        onHttpError={()=>{
                            this.setState({ loader: false })
                            this.setState({url:null,httpError:true})
                        }}
                        bounces={false}
                        onNavigationStateChange={(data: any) => { 
                            if(data?.url?.includes(Constant.check_for_logout_url)){
                                CommonHelper.removeData('user');
                                this.props.navigation.replace('Auth');
                            }
                            this.setState({ webViewStateData: data }); this.handleWebViewNavigationStateChange(data) 
                        }}
                        sharedCookiesEnabled={true}
                        mixedContentMode='always'
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                }
                {!this.state?.url && this.state?.httpError &&
                    <ServerErrorMessage/>
                }
                {this.state?.isStartButton &&
                    <ImageBackground source={require('../assets/staticimages/bg-home-old.jpg')} style={HomeStyle.bgHome}>
                        <View style={[ThemeStyling.container, { paddingBottom: 0, minHeight: '90%' }]}>
                            <View style={HomeStyle.progressBarGroup}>
                                <View style={HomeStyle.progressBarCol}>
                                    <View style={HomeStyle.progressBarLabel}>
                                        <Image style={HomeStyle.imageIcon} source={require('../assets/staticimages/shoe-white.png')}></Image>
                                        <Text style={HomeStyle.progressBarText}>0.00/0.00</Text>
                                    </View>
                                    <ProgressBar style={HomeStyle.progressBar} progress={0.5} color="#004aad" />
                                </View>
                                <View style={HomeStyle.progressBarCol}>
                                    <View style={HomeStyle.progressBarLabel}>
                                        <Image style={HomeStyle.imageIcon} source={require('../assets/staticimages/shoe-white.png')}></Image>
                                        <Text style={HomeStyle.progressBarText}>0.00/0.00</Text>
                                    </View>
                                    <ProgressBar style={HomeStyle.progressBar} progress={0} color="#004aad" />
                                </View>
                            </View>
                            <View style={HomeStyle.pedometerRow}>
                                <View style={[HomeStyle.pedometerCol, { width: '30%' }]}>
                                    <Text style={HomeStyle.pedometerText}>{this.state?.timer}</Text>
                                    <Feather style={HomeStyle.fontIcon} name="clock" size={24} color="black" />
                                </View>
                                <View style={[HomeStyle.pedometerCol, { width: '40%' }]}>

                                    <View style={HomeStyle.pedometerContent}>
                                        <Text style={HomeStyle.totalSpeed}>{(this.state?.currentSpeed) ? this.state?.currentSpeed?.toFixed(2) + ' km/hr Avg' : 0 + ' km/hr Avg'}</Text>
                                        <Image style={HomeStyle.ImagePedometer} source={require('../assets/staticimages/pedometer.png')}></Image>
                                        <Text style={HomeStyle.pedometerSpeed}>1.0-20.0 km/h</Text>
                                    </View>

                                    <View style={HomeStyle.pedometerContent}>
                                        <Text style={HomeStyle.totaldistance}> {(this.state?.distance / 100)}</Text>
                                        <Text style={HomeStyle.textUnit}>Kilometers</Text>
                                    </View>

                                    <View style={HomeStyle.pedometerContent}>
                                        <View style={HomeStyle.walkingHourswrap}>
                                            <Image style={HomeStyle.imageIcon2} source={require('../assets/staticimages/shoe-white.png')}></Image>
                                            <Text style={HomeStyle.walkingHours}>+0.00</Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={[HomeStyle.pedometerCol, { width: '30%', marginBottom: 0 }]}>
                                    <Text style={HomeStyle.pedometerText}>{this.state?.currentStepCount}</Text>
                                    <MaterialCommunityIcons style={HomeStyle.fontIcon} name="shoe-print" size={24} color="black" />
                                </View>
                            </View>
                        </View>
                        <ImageBackground source={require('../assets/staticimages/bg-pattern.jpg')} style={HomeStyle.bgPattern}>
                            <View style={ThemeStyling.container}>
                                <View style={HomeStyle.threeColLayout}>
                                    <View style={HomeStyle.col3}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <Image style={HomeStyle.imageIcon3} source={require('../assets/staticimages/map-location.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={HomeStyle.col3}>
                                        {this.state.isStart &&
                                            <TouchableOpacity onPress={() => { this.stopCalculateSteps() }}>
                                                <Feather style={HomeStyle.fontIcon2} name="stop-circle" size={24} color="black" />
                                            </TouchableOpacity>
                                        }
                                        {!this.state.isStart &&
                                            <TouchableOpacity onPress={() => { this.calculateSteps() }}>
                                                <Feather style={HomeStyle.fontIcon2} name="play-circle" size={24} color="black" />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={HomeStyle.col3}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <Image style={[HomeStyle.imageIcon3, { width: 80, height: 80 }]} source={require('../assets/staticimages/shoe-black.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                }
            </MainLayout>
        );
    }
}
const mapStateToState = state => ({
    user: state,
})

export default connect(mapStateToState, null)(HomeSscreen)
const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 200,
        backgroundColor: Colors.light_crystal_blue,
    },
    buttonDanger: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 200,
        backgroundColor: "red",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    container: {
        height: Dimensions.get('window').height - (Constants.statusBarHeight + 135),
        width: '100%',
        paddingTop: 100
    },
    WebViewcontainer: {
        height: Dimensions.get('window').height,
        width: '100%',
        paddingTop: 100,
        zIndex: 99
        //height:'100%'
    },
});
//webViewHeight    - (Constants.statusBarHeight + 135)
