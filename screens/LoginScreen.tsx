import React, { Component } from "react";
import { Dimensions, EventEmitter, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../utilty/Colors";
import Theming from '../utilty/styling/theming';
import InputComponent from '../components/Common/InputComponent';
import ButtonComponent from "../components/Common/ButtonComponent";
import ImageComponent from "../components/Common/ImageComponent";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { CommonHelper } from "../utilty/CommonHelper";
import AnimatedLoader from 'react-native-animated-loader';
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import { ThemeStyling } from "../utilty/styling/Styles";
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from "expo-linear-gradient";
import { Modal } from "react-native";

export default class LoginScreen extends Component<{}> {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    eventEmitter: any;
    video: any = null
    state = {
        email: '',
        password: '',
        loaderVisible: false,
        showErroMessage: false,
        isOptpSend: true,
        resendOtp: false,
        step: 2,
    }

    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    oncClickRegister() {
        this.props?.navigation.navigate("Register");
    }
    callRegisterRequest(type: any) {
        const dataSend = {
            "sponsor": "login",
            "placement": "Left",
            password: '1',
            email: this.state.email,
            uuid: 'test'
        }
    }
    sendOtp() {
        if (this.state.email !== "") {
            this.setState({ loaderVisible: true, showErroMessage: false });
            CommonApiRequest.sendOtp(this.state.email).then((response) => {
                if (response?.success) {
                    alert('Otp send to your email address')
                }
                this.setState({ loaderVisible: false, isOptpSend: true });
            }).catch(() => {
                this.setState({ loaderVisible: false });
            });
        } else {
            alert('Enter email address');
        }
    }
    onClickLogin() {
        if (this.state.step == 1) {
            this.sendOtp();
            CommonApiRequest.registerCustomer({
                "sponsor": "login",
                "placement": "Left",
                password: '1',
                email: this.state.email,
                uuid: 'test'
            }).then((response) => {
                this.setState({ loaderVisible: false })
            }).catch((error) => {
                this.setState({ loaderVisible: false })
                if (error == 406) {

                }
            })
        } else {
            if (this.state.email !== "") {
                this.setState({ loaderVisible: true, showErroMessage: false });
                CommonApiRequest.loginCustomer(this.state).then((response) => {
                    this.setState({ loaderVisible: false });
                    console.log(response);
                    if (response?.success) {
                        CommonHelper.saveData('user', JSON.stringify(response?.data));
                        setTimeout(() => {
                            this.props?.navigation.navigate("AppContainer");
                        }, 500)
                    }
                }).catch(async (error) => {
                    this.setState({ loaderVisible: false, showErroMessage: true })
                });
            } else {
                alert('Enter username');
            }
        }
        //
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <KeyboardAwareScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ minHeight: "100%" }}>

                <Modal visible={this.state.loaderVisible} transparent>
                    <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.4)', zIndex: 99999, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Image source={require('../assets/loader.gif')} style={{ width: 100, height: 100 }} />
                        </View>
                    </View>
                </Modal>
                <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ minHeight: "100%" }} scrollEnabled={false} bounces={false}>
                    <Video
                        ref={(ref) => this.video = ref}
                        style={{ width: '100%', height: '100%', zIndex: 9 }}
                        source={require('../assets/video_bg_03.mp4')}
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        shouldPlay={true}
                    //onLoad={() => { console.log('Loaded'); setTimeout(() => { this?.video?.playAsync() }, 1000) }}
                    />
                    <LinearGradient
                        // Background Linear Gradient
                        colors={(this.props.colorsType) ? Colors?.liniarColorLogin : Colors?.liniarColorLogin}
                        start={{ x: -0.1, y: 0 }}

                        end={{ x: 1, y: 0 }} style={[Theming.MainHeaderLayoutContent, { padding: 10, zIndex: 99, position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, right: 0, bottom: 0, justifyContent: 'center' }]}>
                        <View style={[ThemeStyling.container, { flex: 1 }]}>
                            <View style={{ width: '100%' }}>
                                <View style={{ marginBottom: 0 }}>
                                    <Text style={ThemeStyling.heading3}>Welcome to</Text>
                                </View>
                                <View style={{ width: '100%', minHeight: 400 }}>
                                    <View style={ThemeStyling.imagecontainer}>
                                        <Image style={ThemeStyling.image} source={require('../assets/staticimages/logo.png')} />
                                    </View>

                                    <View>
                                        <Text style={ThemeStyling.heading4}>Login / Sign Up</Text>
                                    </View>

                                    <View style={[ThemeStyling.formgroup, { marginBottom: 15, flex: 1 }]}>
                                        <TextInput value={this.state.email} onChangeText={(data: any) => { this._updateMasterState('email', data) }} style={ThemeStyling.formcontrol} placeholder="Enter username e.g. example" placeholderTextColor="#fff" />
                                    </View>


                                    <View style={ThemeStyling.formgroup}>
                                        <TextInput secureTextEntry={true} onChangeText={(data: any) => { this._updateMasterState('password', data) }} style={ThemeStyling.formcontrol} placeholder="Enter password" placeholderTextColor="#fff" />
                                        {/* <TouchableOpacity onPress={() => { this.sendOtp() }} style={[ThemeStyling.inputbtn, { height: '100%', top: 0, justifyContent: 'center' }]}>
                                            <Text style={{ fontSize: 12, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold' }}>Send code</Text>
                                        </TouchableOpacity> */}
                                    </View>

                                    <View style={ThemeStyling.textTmc}>
                                        <Text style={{ textAlign: "center", fontSize: 12, color: "#fff", fontWeight: "400" }}>I agree to SMART Terms of use & Privacy Policy</Text>
                                    </View>

                                    <View style={ThemeStyling.btncontainer}>
                                        {/* <TouchableOpacity style={[ThemeStyling.btnprimary, (!this.state.isOptpSend) ? ThemeStyling.btnprimarydisable : {}]} onPress={() => { this.onClickLogin() }} disabled={(!this.state.isOptpSend) ? true : false}>
                                        <Text style={ThemeStyling.btnText}>Login</Text>
                                    </TouchableOpacity> */}
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={(!this.state.isOptpSend) ? Colors.disbaleLoginColor : Colors.enableLoginColor}
                                            start={{ x: -0.1, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={ThemeStyling.btnprimary}>
                                            <TouchableOpacity style={[ThemeStyling.btnprimary, (!this.state.isOptpSend) ? ThemeStyling.btnprimarydisable : {}]} onPress={() => { this.onClickLogin() }} disabled={(!this.state.isOptpSend) ? true : false}>
                                                <Text style={ThemeStyling.btnText}>Login</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </View>
                                <View style={ThemeStyling.fixedbottom}>
                                    <TouchableOpacity onPress={() => { this.oncClickRegister() }}>
                                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold', borderBottomWidth: 1, borderBottomColor: "#fff" }}>New User</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    {/* <ImageBackground source={require('../assets/staticimages/bg-login2.jpg')} style={ThemeStyling.bgLogin}>
                        <View style={ThemeStyling.container}>
                            <View>
                                <View style={{ marginBottom: 0 }}>
                                    <Text style={ThemeStyling.heading3}>Welcome to</Text>
                                </View>

                                <View style={ThemeStyling.imagecontainer}>
                                    <Image style={ThemeStyling.image} source={require('../assets/staticimages/logo.png')} />
                                </View>

                                <View>
                                    <Text style={ThemeStyling.heading4}>Login / Sign Up</Text>
                                </View>

                                <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                    <TextInput value={this.state.email} onChangeText={(data: any) => { this._updateMasterState('email', data) }} style={ThemeStyling.formcontrol} placeholder="example@example.com" placeholderTextColor="#fff" />
                                </View>

                                <View style={ThemeStyling.formgroup}>
                                    <TextInput onChangeText={(data: any) => { this._updateMasterState('password', data) }} style={ThemeStyling.formcontrol} placeholder="Email verfication code" placeholderTextColor="#fff" />
                                    <TouchableOpacity onPress={() => { this.sendOtp() }} style={[ThemeStyling.inputbtn, { height: '100%', top: 0, justifyContent: 'center' }]}>
                                        <Text style={{ fontSize: 12, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold' }}>Send code</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={ThemeStyling.textTmc}>
                                    <Text style={{ textAlign: "center", fontSize: 12, color: "#fff", fontWeight: "400" }}>I agree to SMART Terms of use & Privacy Policy</Text>
                                </View>

                                <View style={ThemeStyling.btncontainer}>
                                    <TouchableOpacity style={[ThemeStyling.btnprimary, (!this.state.isOptpSend) ? ThemeStyling.btnprimarydisable : {}]} onPress={() => { this.onClickLogin() }} disabled={(!this.state.isOptpSend) ? true : false}>
                                        <Text style={ThemeStyling.btnText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={ThemeStyling.fixedbottom}>
                                    <TouchableOpacity onPress={() => { this.oncClickRegister() }}>
                                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold', borderBottomWidth: 1, borderBottomColor: "#fff" }}>New User</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground> */}
                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
});