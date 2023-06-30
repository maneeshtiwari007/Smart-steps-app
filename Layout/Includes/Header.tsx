import { Component } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import Theming from "../../utilty/styling/theming";
import {Ionicons,Feather} from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import { DrawerActions } from "@react-navigation/native";
interface ContentProps {
    style:any
}
export default class Header extends Component<{}> {
    constructor(props:ContentProps){
        super(props);
    }
    componentDidMount() {
        //console.log(this.props?.style);
    }
    toggleDrawer(){
        this.props.navigation.toggleDrawer();
    }
    render() {
        return (
            <>
                <Animated.View style={[Theming.MainHeaderLayoutContainer,this.props?.style]}>
                    <View style={Theming.MainHeaderLayoutContent}>
                        <View>
                            <Pressable style={Theming.headerLeftUserIcon} onPress={()=>{
                                this.toggleDrawer()
                                }}>
                                <Ionicons name="walk" color={'#7b7d80'} size={25}></Ionicons>
                            </Pressable>
                        </View>
                        <View style={Theming.headerRightIconContainer}>
                            <Pressable style={[Theming.headerRightIcon,{width:60,height:30,borderRadius:30,flexDirection:'row',backgroundColor:Colors.primary_light_color,marginRight:6}]} onPress={()=>{
                                this.props?.navigation?.navigate("WalletScreen");
                            }}>
                                    <View style={{ width:25,height:25,borderRadius:100,borderColor:'white',backgroundColor:Colors.white,alignContent:'center',alignItems:'center',justifyContent:'center' }}>
                                        <Feather name="dollar-sign" color={Colors.primary_color} size={16}></Feather>
                                    </View>
                                    <View style={{ width:30,height:30,alignContent:'center',alignItems:'center',justifyContent:'center' }}>
                                        <Text style={{ color:Colors.white,fontSize:16 }}>0</Text>
                                    </View>
                            </Pressable>
                            <View style={[Theming.headerRightIcon]}>
                                <Ionicons name="notifications-outline" color={Colors.white} size={25}></Ionicons>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </>
        );
    }
}