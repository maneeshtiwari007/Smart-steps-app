import React, { Component } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../utilty/Colors";
import Theming from '../utilty/styling/theming';
import Carousel from 'react-native-reanimated-carousel';
import InputComponent from '../components/Common/InputComponent';
import ButtonComponent from "../components/Common/ButtonComponent";
import ImageComponent from "../components/Common/ImageComponent";
import { StatusBar } from "expo-status-bar";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import { CommonHelper } from "../utilty/CommonHelper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AnimatedLoader from 'react-native-animated-loader';
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import { ThemeStyling } from "../utilty/styling/Styles";
import { ImageBackground } from "react-native";
import { TextInput } from "react-native";
import Dropdown from "../components/Common/DropDown";

export default class RegisterScreen extends Component<{}> {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    isDisabled: boolean = true;
    emailTypeStatrted: boolean = false;
    passwordTypeStatrted: boolean = false;
    state = {
        email: '',
        password: '',
        loaderVisible: false,
        uuid: '',
        showMessage: false,
        showErroMessage: false,
        referalCode: '',
        placement: "Left",
        isOptpSend: false
    }
    regValidation: any = {
        email: true,
        password: true,
        isValidated: false
    }
    _guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    _updateMasterState = async (attrName, value) => {
        if (attrName === 'email') {
            this.emailTypeStatrted = true;
        }
        if (attrName === 'password') {
            this.passwordTypeStatrted = true;
        }
        this.setState({ [attrName]: value });
        setTimeout(async () => {
            this.regValidation = await CommonHelper.registerValidation(this.state);
        }, 200);
    }
    oncClickLogin() {
        this.props?.navigation.navigate("Login");
    }
    registerUser() {
        this.setState({ loaderVisible: true })
        CommonApiRequest.registerCustomer({email:this.state.email,password:this.state.password,uuid:this.state.uuid,sponsor:this.state.referalCode,placement:this.state.placement}).then((response) => {
            this.setState({ loaderVisible: false, showMessage: true });
            if (response?.success) {
                
                if (response?.success) {
                    CommonHelper.saveData('user', JSON.stringify(response?.data));
                    setTimeout(() => {
                    this.props?.navigation.navigate("AppContainer");
                    },500)
                }
            } else {
                this.setState({ loaderVisible: false, showErroMessage: true })
            }
        }).catch((error:any) => {
            error;
            
            this.setState({ loaderVisible: false, showErroMessage: true });
        })
    }
    componentDidMount() {
        this.setState({ uuid: this._guidGenerator() })
    }
    selectPlacement(data: any) {
        this.setState({ placement: data?.label })
    }
    sendOtp() {
        if (this.state.email !== "") {
            this.setState({ loaderVisible: true, showErroMessage: false });
            CommonApiRequest.sendOtp(this.state.email).then((response) => {
                if(response?.success){
                    alert('Otp send to your email address')
                }
                this.setState({ loaderVisible: false,isOptpSend:true });
            }).catch(() => {
                this.setState({ loaderVisible: false });
            });
        } else {
            alert('Enter email address');
        }
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

                                <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                    <TextInput onChangeText={(data: any) => { this._updateMasterState('password', data) }} style={ThemeStyling.formcontrol} placeholder="Email verfication code" placeholderTextColor="#fff" />
                                    <TouchableOpacity onPress={() => { this.sendOtp() }} style={[ThemeStyling.inputbtn, { height: '100%', top: 0, justifyContent: 'center' }]}>
                                        <Text style={{ fontSize: 12, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold' }}>Send code</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.state?.isOptpSend &&
                                    <>
                                        <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                            <TextInput value={this.state.referalCode} onChangeText={(data: any) => { this._updateMasterState('referalCode', data) }} style={ThemeStyling.formcontrol} placeholder="Please enter referal code" placeholderTextColor="#fff" />
                                        </View>
                                        <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                            <Dropdown onSelect={(data: any) => { this.selectPlacement(data) }} value={{ label: 'Left', value: 'Left' }} label={'Select Value'} containerstyle={{ width: '100%', borderRadius: 100 }} style={{ borderRadius: 100 }} dropDownItemStyle={{ width: '90%', borderRadius: 10, left: '5%' }} data={[{ label: 'Left', value: 'Left' }, { label: 'Right', value: 'Right' }]}></Dropdown>
                                        </View>
                                    </>
                                }
                                <View style={ThemeStyling.textTmc}>
                                    <Text style={{ textAlign: "center", fontSize: 12, color: "#fff", fontWeight: "400" }}>I agree to SMART Terms of use & Privacy Policy</Text>
                                </View>

                                <View style={ThemeStyling.btncontainer}>
                                    <TouchableOpacity style={[ThemeStyling.btnprimary, (!this.state?.isOptpSend) ? ThemeStyling.btnprimarydisable : {}]} onPress={() => { this.registerUser() }} disabled={(!this.state.isOptpSend) ? true : false}>
                                        <Text style={ThemeStyling.btnText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={ThemeStyling.fixedbottom}>
                                    <TouchableOpacity onPress={() => { this.oncClickLogin() }}>
                                        <Text style={{ fontSize: 20, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold', borderBottomWidth: 1, borderBottomColor: "#fff" }}>Account Login</Text>
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