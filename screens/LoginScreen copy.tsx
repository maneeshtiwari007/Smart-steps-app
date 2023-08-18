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

export default class LoginScreenCopy extends Component<{}> {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    eventEmitter: any;
    state = {
        email: '',
        password: '',
        loaderVisible: false,
        showErroMessage: false,
        isOptpSend: false,
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
        this.setState({ loaderVisible: true, showErroMessage: false });
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
            CommonApiRequest.loginCustomer(this.state).then((response) => {
                this.setState({ loaderVisible: false })
                if (response?.success) {
                    CommonHelper.saveData('user', JSON.stringify(response?.data));
                    setTimeout(() => {
                        this.props?.navigation.navigate("AppContainer");
                    }, 500)
                }
            }).catch(async (error) => {
                this.setState({ loaderVisible: false, showErroMessage: true })
            });
        }
        //
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <KeyboardAwareScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ minHeight: "100%" }}>
                <AnimatedLoader
                    visible={this.state.loaderVisible}
                    overlayColor="rgba(255,255,255,0.75)"
                    animationStyle={styles.lottie}
                    speed={1}>
                    <Text>Please wait...</Text>
                </AnimatedLoader>
                <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ minHeight: "100%" }}>
                    <ImageBackground source={require('../assets/staticimages/bg-login2.jpg')} style={ThemeStyling.bgLogin}>
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
                    </ImageBackground>
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