import { Component } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import Theming from "../../utilty/styling/theming";
import { Ionicons, Feather } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
interface ContentProps {
    style: any
}
export default class Header extends Component<{}> {
    constructor(props: ContentProps) {
        super(props);
    }
    componentDidMount() {
        //console.log(this.props?.style);
    }
    toggleDrawer() {
        this.props.navigation.toggleDrawer();
    }
    render() {
        return (
            <>
                <Animated.View style={[Theming.MainHeaderLayoutContainer, this.props?.style]}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['#1aa5c6', '#0455ad']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }} style={[Theming.MainHeaderLayoutContent, {padding: 20}]}>
                            <View>
                                <Pressable style={Theming.headerLeftUserIcon} onPress={() => {
                                    this.toggleDrawer()
                                }}>
                                    <Image style={{ width: 12, height: 18 }} source={require('../../assets/staticimages/user.png')}></Image>
                                    <Text style={Theming.badgeWarning}>2.3 km</Text>
                                </Pressable>
                            </View>
                            <View style={Theming.headerRightIconContainer}>
                                <Pressable style={[Theming.headerRightIcon, { width: 200, height: 38, borderColor: Colors.primary_color, borderStyle: "solid", borderWidth: 1, borderRadius: 30, flexDirection: 'row', justifyContent: "space-between", paddingLeft: 15, backgroundColor: Colors.white, marginRight: 6 }]} onPress={() => {
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
                                </Pressable>
                                {/* <View style={[Theming.headerRightIcon]}>
                                <Ionicons name="notifications-outline" color={Colors.white} size={25}></Ionicons>
                            </View> */}
                            </View>
                    </LinearGradient>
                </Animated.View>
            </>
        );
    }
}