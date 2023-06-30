import React, { Component } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
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

export default class RegisterScreenCopy extends Component<{}> {
    width = Dimensions.get('window').width;
    height = Dimensions.get('window').height;
    isDisabled:boolean=true;
    emailTypeStatrted:boolean=false;
    passwordTypeStatrted:boolean=false;
    state = {
        email: '',
        password: '',
        loaderVisible:false,
        uuid:'',
        showMessage:false,
        showErroMessage:false
    }
    regValidation:any={
        email: true,
        password: true,
        isValidated:false
    }
    _guidGenerator(){
        var S4 = function(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    _updateMasterState = async (attrName, value) => {
        if(attrName==='email'){
            this.emailTypeStatrted=true;
        }
        if(attrName==='password'){
            this.passwordTypeStatrted=true;
        }
        this.setState({ [attrName]: value });
        setTimeout(async()=>{
            this.regValidation = await CommonHelper.registerValidation(this.state);
        },200);
    }
    oncClickLogin(){
        this.props?.navigation.navigate("Login");
    }
    registerUser(){
        this.setState({loaderVisible:true})
        CommonApiRequest.registerCustomer(this.state).then((response)=>{
            if(response){
                this.setState({loaderVisible:false,showMessage:true})
            } else {
                this.setState({loaderVisible:false,showErroMessage:true})
            }
        }).catch((error)=>{
            error;
            this.setState({loaderVisible:false,showErroMessage:true})
        })
    }
    componentDidMount() {
        this.setState({uuid:this._guidGenerator()})
    }
    render() {
        return (
            <KeyboardAwareScrollView>
                <ScrollView  style={Theming.LoginLayoutContainer}>
                    <StatusBar  style={'light'} />
                    {this.state?.showMessage &&
                        <SuccessMessage title="Success" subMessage="Your account created successfully!"></SuccessMessage>
                    }
                    {this.state?.showErroMessage &&
                        <ErrorMessage title="Success" subMessage="Something went wrong please try after sometime!" hideAuto={true} onHide={()=>{this.setState({showErroMessage:false})}}></ErrorMessage>
                    }
                    <AnimatedLoader
                        visible={this.state.loaderVisible}
                        overlayColor="rgba(255,255,255,0.75)"
                        animationStyle={styles.lottie}
                        speed={1}>
                        <Text>Please wait...</Text>
                    </AnimatedLoader>
                    <View style={{ height:(this.height-45),flex:1 }}>
                        <View style={{ alignItems:'center',height:'100%',justifyContent:'center' }}>
                            <View style={{ width:'90%',marginTop:'auto',marginBottom:0 }}>
                                <View style={{ width:'100%',alignItems:'center',marginBottom:50 }}>
                                    <ImageComponent src={require('../assets/staticimages/avatar.png')} type={'avatar'} style={{ marginBottom:20 }}/>
                                    <Text style={{fontSize:Colors.FontSize.h1,color:Colors.white,marginBottom:20}}>Create Account </Text>
                                </View>
                                <View>
                                    <InputComponent
                                        attrName='email'
                                        title='Email'
                                        value={this.state.email}
                                        updateMasterState={this._updateMasterState}
                                        textInputStyles={{ // here you can add additional TextInput styles
                                            fontSize: 15,
                                            color:Colors.white
                                        }}
                                        otherTextInputProps={{   // here you can add other TextInput props of your choice
                                            maxLength: 200,
                                        }}
                                        titleActiveColor={Colors.Gray}
                                        anyError={{isError:(!this.regValidation?.email && this.emailTypeStatrted)?true:false,errorText:'Please enter valid email addresss'}}
                                        placeholder={""}
                                        placeholderColor={""}
                                    />
                                    <InputComponent
                                        attrName='password'
                                        title='Password'
                                        value={this.state.password}
                                        updateMasterState={this._updateMasterState}
                                        titleActiveColor={Colors.Gray}
                                        textInputStyles={{ // here you can add additional TextInput styles
                                            fontSize: 15,
                                            color:Colors.white
                                            
                                        }}
                                        otherTextInputProps={{   // here you can add other TextInput props of your choice
                                            maxLength: 200,
                                            textContentType:'password'
                                        }}
                                        secureTextEntry={true}
                                        anyError={{isError:(!this.regValidation?.password && this.passwordTypeStatrted)?true:false,errorText:'Please enter valid password'}}
                                        placeholder={""}
                                        placeholderColor={""}
                                    />
                                    <View style={{ width:'100%',alignItems:'flex-end',marginBottom:Colors.FontSize.f20 }}>
                                    </View>
                                    <ButtonComponent 
                                        onPressCall={()=>this.registerUser()}
                                        title="Register"
                                        isDisabled={(!this.regValidation?.isValidated)?'true':'false'}
                                        style={(!this.regValidation?.isValidated)?Theming.button.disable:''}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop:'auto',marginBottom:40 }}>
                                <Text style={{ color:Colors.Gray }}>
                                    Already have an account? 
                                    <Text style={{ color:Colors.light_crystal_blue }} onPress={()=>{this.oncClickLogin()}}> Login</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
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