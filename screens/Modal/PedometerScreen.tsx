import React, { Component } from "react";
import {
    DeviceEventEmitter,
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getDistance } from 'geolib';
import MainLayout from "../../Layout/Index";
import { Button } from "react-native";
import { Pedometer, Gyroscope, Accelerometer } from "expo-sensors";
import Colors from "../../utilty/Colors";
import * as Location from 'expo-location';
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import { connect } from "react-redux";
import store from "../../store";
import Constants from 'expo-constants';
import { MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { HomeStyle } from "../../utilty/styling/HomeStyle";
import { ThemeStyling } from "../../utilty/styling/Styles";
import { ProgressBar } from "react-native-paper";
import WebView from "react-native-webview";
import { CommonHelper } from "../../utilty/CommonHelper";
import { Constant } from "../../utilty/Constant";
import { PermissionsAndroid } from 'react-native';
import * as Device from 'expo-device';

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
    isStartButton: true
    refreshCoin: false
}
class PedometerScreen extends Component<{}> {
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
            isStartButton: true,
            device: null,
            customerEventStart: null,
            stepPregress: 0,
            rawSeconds: 0,
            rawTimeRemain: 0,
            apiTry: 0,
            currentRawStepCount: 0,
            allCords: [],
            overAllAvgSpeed: 0,
            startUtcDate:''
        };
    }
    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
        return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    async componentDidMount() {
        const addHeight = (Device?.osName !== 'iOS') ? 50 : 0;
        const deviceHeight = Dimensions.get('window').height + addHeight;
        this.setState({ device: deviceHeight });
        DeviceEventEmitter.emit(Constant.REFRESH_COINT_EVENT, { data: 'data' });
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
        this.props.navigation.addListener('focus', () => {
            this.getCustomerProduct();
            this.setState({ toke: new Date() });
        });
        this.setState({ toke: new Date() });
        const user = await CommonHelper.getData('user');
        await CommonApiRequest.customerEventStart({}).then((response) => {
            //console.log(response);
            if (response?.success) {
                this.setState({ customerEventStart: response?.data });
            }
        })
        setTimeout(() => {
            if (this.state?.customerEventStart?.start) {
                this.calculateSteps();
            }
        }, 500);
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
        this.setState({ startUtcDate: new Date().toUTCString() });
        this.setState({
            intervalId: setInterval(() => {
                if (this.state?.rawSeconds < this.state?.customerEventStart?.secondsRemain) {
                    const rawSeconds = this.state?.rawSeconds;
                    const startDate = (this.state.startDateTime?.getTime());
                    const endDate = (new Date()?.getTime());
                    const msDiff = endDate - startDate;
                    const timeRemain = (this.state?.customerEventStart?.secondsRemain - rawSeconds) * 1000;
                    this.setState({ timer: this.millisToMinutesAndSeconds(msDiff), rawSeconds: rawSeconds + 1, rawTimeRemain: this.millisToMinutesAndSeconds(timeRemain) });
                }
            }, 1000)
        });
        this._subscription = Pedometer.watchStepCount(async (result) => {
            if (this.state?.customerEventStart?.totalStepAllowed >= this.state?.currentStepCount) {
                var stepsRun = Math.round((this.state?.customerEventStart?.stepFactor * result.steps) / 100);
                if (this.state?.customerEventStart?.totalStepAllowed <= this.state?.currentStepCount) {
                    stepsRun = this.state?.customerEventStart?.totalStepAllowed;
                }
                //const currentLocation = await Location.getCurrentPositionAsync();
                //currentLocation?.coords?.speed
                const distance = stepsRun * 0.75;//getDistance(this.state?.startCords, currentLocation?.coords, 1);
                const currentSpeed = (distance > 0)?((distance / this.state.rawSeconds) * 3.6):0;
                const avgSpeed = (this.state?.overAllAvgSpeed + currentSpeed) / 2
                this.setState({ currentSpeed: currentSpeed });
                this.setState({ overAllAvgSpeed: avgSpeed });
                if (this.state.isStillRunning) {
                    this.setState({ distance: distance });
                    this.setState({
                        currentStepCount: stepsRun,
                        currentRawStepCount: result.steps,
                        stepPregress: (stepsRun / this.state?.customerEventStart?.totalStepAllowed) * 100
                    });
                }
                const currentLocation = await Location.getCurrentPositionAsync();
                let allCords = (this.state?.allCords) ? this.state?.allCords : [];
                allCords?.push(currentLocation);
                this.setState({ allCords: allCords });
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
            startDateTime: new Date(this.state?.startUtcDate),
            endDateTime: new Date(new Date().toUTCString()),
            statistics: JSON.stringify({
                startPoint: this.state?.startCords,
                endPoint: this.state?.stopCords,
                distance: (this.state.distance / 1000) + " km",
                rawDistance: this.state.distance,
                Product: this.state?.customerEventStart?.products,
                TotalTimeSeconds: this.state?.rawSeconds,
                AverageSpeed: 5,
                allCords: this.state?.allCords,
                avgSpeed: this.state?.overAllAvgSpeed
            })
        }
        await this.saveCustomerEventData(dataSend);

    };
    async saveCustomerEventData(dataSend: any) {
        CommonApiRequest.customerEvent(dataSend).then((response) => {
            this.setState({ currentStepCount: 0, distance: 0, currentSpeed: 0 });
            this.setState({ loader: false });
            if (response?.success) {
                this.setState({ apiTry: 0 })
                alert("Your activity saved successfully!");
                DeviceEventEmitter.emit(Constant.REFRESH_COINT_EVENT, { data: 'data' });
                this.setState({ loader: false });
                setTimeout(() => {
                    this.setState({ allCords: [] });
                    this.props.navigation.navigate("Home");
                }, 500);
            } else {
                console.log("error");
                this.props.navigation.navigate("Home");
            }
        }).catch(async () => {
            if (this.state?.apiTry >= 3) {
                this.setState({ apiTry: this.state?.apiTry + 1 });
                await this.saveCustomerEventData(dataSend);
                this.setState({ allCords: [] });
                this.props.navigation.navigate("Home");
            } else {
                await CommonHelper.saveData(Constant.ACTIVITY_NAME, JSON.stringify(dataSend));
                this.setState({ allCords: [] });
                this.props.navigation.navigate("Home");
            }
            
        })
    }
    _subscribeGyroscope = () => {
        this._gyroscopeSubscription = Gyroscope.addListener((gyroscopeData) => {
            Gyroscope.setUpdateInterval(1000);
            //this.setState({ isStillRunning: true });
        });
    };
    _subscriptionAccelerometer = () => {
        this._accelerometerScubscription = Accelerometer.addListener((ev) => {
            Accelerometer.setUpdateInterval(500);
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
            this.setState({ isStartButton: true });
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
            this.props?.navigation?.goBack();
        }
    }
    render() {
        return (
            <MainLayout isHeaderEnable={false} refreshCoin={this.state?.refreshCoin} isWebViewBackEnable={this.state.isWebViewBackEnable} style={{ backgroundColor: 'transparent' }} extraHeaderStyle={{}} scrollEnable={true} loaderVisible={this.state?.loader} colorsType={'liniarColorHome'} onBackCallback={() => { this.onBackHistory() }}>
                <View style={{ minHeight: this.state?.device, zIndex: 9999, width: '100%' }}>
                    <ImageBackground source={require('../../assets/staticimages/bg-home-old.jpg')} style={[HomeStyle.bgHome, ThemeStyling.container, { minHeight: '80%', paddingTop: 50 }]}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={[HomeStyle.progressBarGroup, { marginTop: 0, marginBottom: 'auto' }]}>
                                <View style={HomeStyle.progressBarCol}>
                                    <View style={HomeStyle.progressBarLabel}>
                                        <Image style={HomeStyle.imageIcon} source={require('../../assets/staticimages/shoe-white.png')}></Image>
                                        <Text style={HomeStyle.progressBarText}>{(this.state?.customerEventStart?.secondsRemain) ? (this.state?.rawTimeRemain) : '0.00'}</Text>
                                    </View>
                                    <ProgressBar style={HomeStyle.progressBar} progress={(this.state?.customerEventStart?.secondsRemain) ? (((this.state?.customerEventStart?.secondsRemain - this.state.rawSeconds) / this.state?.customerEventStart?.secondsRemain) * 100) / 100 : 1} color="#004aad" />
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: Colors.white, fontWeight: 'bold' }}>Time Remaining</Text>
                                    </View>
                                </View>
                                <View style={HomeStyle.progressBarCol}>
                                    <View style={HomeStyle.progressBarLabel}>
                                        <Image style={HomeStyle.imageIcon} source={require('../../assets/staticimages/shoe-white.png')}></Image>
                                        <Text style={HomeStyle.progressBarText}>{(this.state?.currentStepCount) ? Math.round((this.state.currentStepCount)) : '0'}/{(this.state?.customerEventStart?.totalStepAllowed) ? this.state?.customerEventStart?.totalStepAllowed : '0.00'}</Text>
                                    </View>
                                    <ProgressBar style={HomeStyle.progressBar} progress={(this.state?.stepPregress) ? this.state?.stepPregress / 100 : 0} color="#004aad" />
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ color: Colors.white, fontWeight: 'bold' }}>Steps Achieved</Text>
                                    </View>
                                </View>
                            </View>

                            {/* {!this.state?.customerEventStart?.start && this.state?.customerEventStart?.message &&
                                <View style={{ marginBottom: 10, backgroundColor: 'rgba(0,0,0,.3)', padding: 12, borderRadius: 10, alignItems: "center", flexDirection: "row" }}>
                                    <FontAwesome5 name="exclamation-triangle" size={24} color="red" />
                                    <Text style={{ textAlign: 'center', color: 'red', fontSize: 16, marginLeft: 10 }}>{this.state?.customerEventStart?.message?.onTimeOut}</Text>
                                </View>
                            } */}
                            {((this.state?.customerEventStart?.totalStepAllowed <= this.state?.currentStepCount) || (this.state?.rawSeconds >= this.state?.customerEventStart?.secondsRemain) || !this.state?.customerEventStart?.start) && this.state?.customerEventStart &&
                                <>
                                    <View style={{ marginBottom: 10, backgroundColor: 'rgba(0,0,0,.3)', padding: 12, borderRadius: 10, alignItems: "center", flexDirection: "row" }}>
                                        <FontAwesome5 name="exclamation-triangle" size={24} color="red" />
                                        <Text style={{ textAlign: 'center', color: 'red', fontSize: 15, marginLeft: 10 }}>{this.state?.customerEventStart?.message?.onTimeOut}</Text>
                                    </View>
                                    {this.state?.customerEventStart && !this.state?.customerEventStart?.start &&
                                        <View style={ThemeStyling.btncontainer}>
                                            <Pressable onPress={() => {
                                                this.props?.navigation?.goBack()
                                            }} style={[ThemeStyling.btnprimary, { backgroundColor: 'transparent', borderColor: '#fff', borderWidth: 1, flexDirection: 'row' }]}>
                                                <AntDesign name="arrowleft" size={24} color={Colors.white} style={{ marginRight: 5 }} />
                                                <Text style={[ThemeStyling.btnText]}>
                                                    Back
                                                </Text>
                                            </Pressable>
                                        </View>
                                    }
                                </>
                            }
                            <ScrollView horizontal style={{ maxHeight: 100 }}>
                                <View style={{ flexDirection: 'row', maxWidth: '100%', width: '100%', columnGap: 7, marginTop: 'auto', padding: 0, marginBottom: 'auto' }}>
                                    {this.state?.customerEventStart?.imageUrl?.[0] && this.state?.customerEventStart?.imageUrl?.map((data, index) => {
                                        return (<Image key={index} source={{ uri: data }} style={{ width: 80, height: 80, borderRadius: 10 }}></Image>)
                                    })
                                    }
                                </View>
                            </ScrollView>
                            <View style={[HomeStyle.pedometerRow, { marginTop: 'auto', marginBottom: 'auto' }]}>
                                <View style={[HomeStyle.pedometerCol, { width: '30%' }]}>
                                    <Text style={HomeStyle.pedometerText}>{this.state?.timer}</Text>
                                    <Feather style={HomeStyle.fontIcon} name="clock" size={24} color="black" />
                                </View>
                                <View style={[HomeStyle.pedometerCol, { width: '40%' }]}>

                                    <View style={HomeStyle.pedometerContent}>
                                        <Text style={[HomeStyle.pedometerSpeed, { marginTop: 10 }]}>{(this.state?.customerEventStart?.range?.min) ? this.state?.customerEventStart?.range?.min : 0.0}-{(this.state?.customerEventStart?.range?.max) ? this.state?.customerEventStart?.range?.max : 0.0} km/h</Text>
                                        <Text style={[HomeStyle.totalSpeed, { top: 15 }]}>{(this.state?.currentSpeed) ? Math.abs(this.state?.currentSpeed?.toFixed(2)) + ' km/h Avg' : 0 + ' km/h Avg'}</Text>
                                        {/* <Image style={HomeStyle.ImagePedometer} source={require('../../assets/staticimages/pedometer.png')}></Image> */}

                                    </View>

                                    <View style={HomeStyle.pedometerContent}>
                                        <Text style={HomeStyle.totaldistance}> {(this.state?.distance) ? (this.state?.distance / 1000).toFixed(2) : 0}</Text>
                                        <Text style={HomeStyle.textUnit}>Kilometers</Text>
                                    </View>

                                    <View style={HomeStyle.pedometerContent}>
                                        <View style={HomeStyle.walkingHourswrap}>
                                            <Image style={HomeStyle.imageIcon2} source={require('../../assets/staticimages/shoe-white.png')}></Image>
                                            <Text style={HomeStyle.walkingHours}>+{(this.state?.customerEventStart?.tokenFactor) ? Math.round(((this.state?.customerEventStart?.tokenFactor * this.state.currentStepCount) / 100)) : 0}</Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={[HomeStyle.pedometerCol, { width: '30%', marginBottom: 0 }]}>
                                    <Text style={HomeStyle.pedometerText}>{Math.round((this.state.currentStepCount))}</Text>
                                    <MaterialCommunityIcons style={HomeStyle.fontIcon} name="shoe-print" size={24} color="black" />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <ImageBackground source={require('../../assets/staticimages/bg-pattern.jpg')} style={[HomeStyle.bgPattern]}>
                        <View style={{ minHeight: '20%' }}>
                            <View style={HomeStyle.threeColLayout}>
                                <View style={HomeStyle.col3}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image style={HomeStyle.imageIcon3} source={require('../../assets/staticimages/map-location.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={HomeStyle.col3}>
                                    {this.state.isStart && this.state?.customerEventStart?.start &&
                                        <TouchableOpacity onPress={() => { this.stopCalculateSteps() }}>
                                            <Feather style={HomeStyle.fontIcon2} name="stop-circle" size={24} color="red" />
                                        </TouchableOpacity>
                                    }
                                    {!this.state.isStart && this.state?.customerEventStart?.start &&
                                        <TouchableOpacity onPress={() => { this.calculateSteps() }}>
                                            <Feather style={HomeStyle.fontIcon2} name="play-circle" size={24} color="green" />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <View style={HomeStyle.col3}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image style={[HomeStyle.imageIcon3, { width: 80, height: 80 }]} source={require('../../assets/staticimages/shoe-black.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </MainLayout>
        );
    }
}
const mapStateToState = state => ({
    user: state,
})

export default connect(mapStateToState, null)(PedometerScreen)
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
        height: Dimensions.get('window').height,
        width: '100%',
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
