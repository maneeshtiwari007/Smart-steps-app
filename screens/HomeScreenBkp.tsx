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
import { home_data } from "../store/action";
import ImageComponent from "../components/Common/ImageComponent";
import WebView from "react-native-webview";
import Constants from 'expo-constants';
import { CommonHelper } from "../utilty/CommonHelper";

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
  user: {}
}
class HomeSscreenBkp extends Component<{}> {
  _subscription = {};
  _gyroscopeSubscription = {};
  _accelerometerScubscription = {};
  _locationSubscription = {};
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
      token:""
    };
  }
  async componentDidMount() {
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
      this.setState({toke:new Date()});
    });
    this.setState({toke:new Date()});
    // CommonApiRequest.getProduct({}).then((response)=>{
    //   console.log(response);
    // }).catch((error)=>{
    //   console.log(error);
    // })

  }
  getCustomerProduct() {
    this.setState({ loader: true });
    CommonApiRequest.customerProduct({}).then((response) => {
      console.log(response?.data)
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
    this._subscription = Pedometer.watchStepCount(async (result) => {
      //console.log(result);
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
      //console.log(ev);
    })
  }
  async subscribeSteps() {
    if (this.state.isPedometerAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);
      console.log(start);
      this._subscribeGyroscope();
      this._subscribe();
      this._subscriptionAccelerometer();
    }
  }
  render() {
    return (
      <MainLayout style={{}} extraHeaderStyle={{}} scrollEnable={true} loaderVisible={this.state?.loader}>
        {/* {this.state?.productData?.[0] &&
          <View style={{ width: '100%', minHeight: 350, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '90%', borderColor: Colors.white, borderWidth: 1, borderRadius: 20, height: 350 }}>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                <ImageComponent
                  style={{ width: 250, height: 150, marginBottom: 10, padding: 10 }}
                  type={"productImage"}
                  src={(this.state?.productData?.[0]?.images?.[0]) ? { uri: this.state?.productData?.[0]?.images?.[0] } : require('../assets/staticimages/shoe.png')}
                />
                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f20 }}>{this.state?.productData?.[0]?.name}</Text>
              </View>
            </View>
          </View>
        }
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: 300
          }}
        >
          {this.state.isPedometerAvailable === true && (
            <View style={{ marginBottom: 25 }}>
              <Text style={{ fontSize: 18, color: "#fff", marginBottom: 5 }}>
                Pedometer Status : {String(this.state.isPedometerAvailable)}
              </Text>
              <Text style={{ fontSize: 18, color: "#fff" }}>
                Steps Count : {this.state.currentStepCount}
              </Text>
              <Text style={{ fontSize: 18, color: "#fff" }}>Speed : {(this.state?.currentSpeed) ? this.state?.currentSpeed + ' km/hr' : 0 + ' km/hr'}</Text>
              <Text style={{ fontSize: 18, color: "#fff" }}>Distance : {(this.state.distance / 100) + " km"}</Text>
            </View>
          )}
          {this.state.isPedometerAvailable === "checking" && (
            <View>
              <Text style={{ fontSize: 18, color: "#fff" }}>
                Checking your pedometer sensors please wait....
              </Text>
            </View>
          )}
          {!this.state.isPedometerAvailable && (
            <View>
              <Text style={{ fontSize: 18, color: "#fff" }}>
                Pedometer sensors is not avilable in your device....
              </Text>
            </View>
          )}
          {!this.state.isStart && (
            <View style={{ width: "100%", alignItems: "center" }}>
              <Pressable
                style={styles.button}
                onPress={() => this.calculateSteps()}
              >
                <Text style={styles.text}>{"Start"}</Text>
              </Pressable>
            </View>
          )}
          {this.state.isStart && (
            <View style={{ width: "100%", alignItems: "center" }}>
              <Pressable
                style={styles.buttonDanger}
                onPress={() => this.stopCalculateSteps()}
              >
                <Text style={styles.text}>{"Stop"}</Text>
              </Pressable>
            </View>
          )}
        </View> */}
        <WebView
                    originWhitelist={['*']}
                    style={styles.container}
                    source={{ uri: CommonHelper.returnWebViewHomeUrl(this.state?.toke) }}
                    onLoadStart={()=>{
                        this.setState({ loader: true })
                    }}
                    onLoadEnd={()=>{
                        this.setState({ loader: false })
                    }}
                />
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
    height: Dimensions.get('window').height-(Constants.statusBarHeight+135),
    width: '100%',
    paddingTop:100
},
});
