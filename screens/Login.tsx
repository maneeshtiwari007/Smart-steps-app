import { Component } from "react";
import { ScrollView, View, Text, Image, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import { ThemeStyling } from "../Themes/Styles";

export default class Login extends Component<{}> {

    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <ScrollView style={ThemeStyling.scrollView} contentContainerStyle={{ minHeight: "100%" }}>
                <ImageBackground source={require('../../assets/bg-login2.jpg')} style={ThemeStyling.bgLogin}>
                    <View style={ThemeStyling.container}>
                        <View>
                            <View style={{ marginBottom: 0 }}>
                                <Text style={ThemeStyling.heading3}>Welcome to</Text>
                            </View>

                            <View style={ThemeStyling.imagecontainer}>
                                <Image style={ThemeStyling.image} source={require('../../assets/logo.png')} />
                            </View>

                            <View>
                                <Text style={ThemeStyling.heading4}>Login / Sign Up</Text>
                            </View>

                            <View style={ThemeStyling.formgroup} style={{ marginBottom: 15 }}>
                                <TextInput style={ThemeStyling.formcontrol} placeholder="userdemo@gmail.com" placeholderTextColor="#fff" />
                            </View>

                            <View style={ThemeStyling.formgroup}>
                                <TextInput style={ThemeStyling.formcontrol} placeholder="Email verfication code" placeholderTextColor="#fff" />
                                <TouchableOpacity onPress={() => { alert("Account Login") }} style={ThemeStyling.inputbtn}>
                                    <Text style={{ fontSize: 12, color: '#fff', fontWeight:"600", textAlign: "center",  fontFamily: 'Inter_600SemiBold' }}>Send code</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={ThemeStyling.textTmc}>
                                <Text style={{ textAlign: "center", fontSize: 12, color: "#fff", fontWeight:"400" }}>I agree to SMART Terms of use & Privacy Policy</Text>
                            </View>

                            <View style={ThemeStyling.btncontainer}>
                                <TouchableOpacity style={ThemeStyling.btnprimary} onPress={() => { alert("Pressed") }}>
                                    <Text style={ThemeStyling.btnText}>Login / Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ThemeStyling.fixedbottom}>
                                <TouchableOpacity onPress={() => { alert("Account Login") }}>
                                    <Text style={{ fontSize: 20, color: '#fff', fontWeight:"600", textAlign: "center",  fontFamily: 'Inter_600SemiBold', borderBottomWidth:1, borderBottomColor: "#fff" }}>Account Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}