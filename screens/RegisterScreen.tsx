import React, { Component } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

export default class RegisterScreen extends Component<{}> {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    isDisabled: boolean = true;
    emailTypeStatrted: boolean = false;
    passwordTypeStatrted: boolean = false;
    video: any = null;
    state = {
        email: '',
        password: null,
        loaderVisible: false,
        uuid: '',
        showMessage: false,
        showErroMessage: false,
        referalCode: '',
        placement: "Left",
        isOptpSend: true,
        confirm_password: '',
        isSecureEntery:false
    }
    regValidation: any = {
        email: false,
        password: false,
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
        if (this.regValidation?.isValidated) {
            this.setState({ loaderVisible: true });
            console.log({ email: this.state.email, password: this.state.password, uuid: this.state.uuid, sponsor: this.state.referalCode, placement: this.state.placement });
            CommonApiRequest.registerCustomer({ email: this.state.email, password: this.state.password, uuid: this.state.uuid, sponsor: this.state.referalCode, placement: this.state.placement }).then((response) => {
                this.setState({ loaderVisible: false, showMessage: true });
                console.log(response);
                if (response?.success) {
                        CommonHelper.saveData('user', JSON.stringify(response?.data));
                        setTimeout(() => {
                            this.props?.navigation.navigate("AppContainer");
                        }, 500)
                } else {
                    this.setState({ loaderVisible: false, showErroMessage: true })
                }
            }).catch((error: any) => {
                error;
                console.log(error);
                this.setState({ loaderVisible: false, showErroMessage: true });
            })
        } else {
            alert('All fileds are required')
        }
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
                        colors={(this.props?.colorsType) ? Colors?.liniarColorLogin : Colors?.liniarColorLogin}
                        start={{ x: -0.1, y: 0 }}

                        end={{ x: 1, y: 0 }} style={[Theming.MainHeaderLayoutContent, { padding: 10, zIndex: 99, position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, right: 0, bottom: 0, justifyContent: 'center' }]}>
                        <View style={[ThemeStyling.container, { flex: 1 }]}>
                            <View>
                                <View style={{ marginBottom: 0 }}>
                                    <Text style={ThemeStyling.heading3}>Welcome to</Text>
                                </View>
                                <View style={{ width: '100%', minHeight: (this.state?.isOptpSend) ? 600 : 420 }}>
                                    <View style={ThemeStyling.imagecontainer}>
                                        <Image style={ThemeStyling.image} source={require('../assets/staticimages/logo.png')} />
                                    </View>

                                    <View>
                                        <Text style={ThemeStyling.heading4}>Login / Sign Up</Text>
                                    </View>

                                    <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                        <TextInput value={this.state.email} onChangeText={(data: any) => { this._updateMasterState('email', data) }} style={ThemeStyling.formcontrol} placeholder="Enter username e.g. example" placeholderTextColor="#fff" />
                                    </View>

                                    <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                        <TextInput onFocus={()=>{this.setState({isSecureEntery:true})}} secureTextEntry={this.state.isSecureEntery} onChangeText={(data: any) => { this._updateMasterState('password', data) }} style={ThemeStyling.formcontrol} placeholder="Enter password" placeholderTextColor="#fff" />
                                        {/* <TouchableOpacity onPress={() => { this.sendOtp() }} style={[ThemeStyling.inputbtn, { height: '100%', top: 0, justifyContent: 'center' }]}>
                                            <Text style={{ fontSize: 12, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold' }}>Send code</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                    <View style={[ThemeStyling.formgroup, { marginBottom: 15 }]}>
                                        <TextInput onFocus={()=>{this.setState({isSecureEntery:true})}} secureTextEntry={this.state.isSecureEntery} onChangeText={(data: any) => { this._updateMasterState('confirm_password', data) }} style={ThemeStyling.formcontrol} placeholder="Enter confirm password" placeholderTextColor="#fff" />

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
                                        <LinearGradient
                                            // Background Linear Gradient
                                            colors={(!this.state.isOptpSend) ? Colors.disbaleLoginColor : Colors.enableLoginColor}
                                            start={{ x: -0.1, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={ThemeStyling.btnprimary}>
                                            <TouchableOpacity style={[ThemeStyling.btnprimary, (!this.state?.isOptpSend) ? ThemeStyling.btnprimarydisable : {}]} onPress={() => { this.registerUser() }} disabled={(!this.state.isOptpSend) ? true : false}>
                                                <Text style={ThemeStyling.btnText}>Sign Up</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                    <View style={ThemeStyling.fixedbottom}>
                                        <TouchableOpacity onPress={() => { this.oncClickLogin() }}>
                                            <Text style={{ fontSize: 20, color: '#fff', fontWeight: "600", textAlign: "center", fontFamily: 'Inter_600SemiBold', borderBottomWidth: 1, borderBottomColor: "#fff" }}>Account Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
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