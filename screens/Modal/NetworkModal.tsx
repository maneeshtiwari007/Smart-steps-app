import { Component } from "react";
import { View } from "react-native";
import Colors from "../../utilty/Colors";
import { Text } from "react-native";
import Theming from "../../utilty/styling/theming";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
export default class NetworkModal extends Component<{}>{
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <View style={Theming.networkBody}>
            <View style={Theming.networkContainer}>
                <View>
                <MaterialCommunityIcons name="wifi-strength-off-outline" size={44} color="black" />
                </View>
                <Text style={Theming.networkTitle}>No internet</Text>
                <Text style={Theming.networkSubTitle}>The application will load automatically when the connection is back</Text>
            </View>
        </View>
        )
    }
}