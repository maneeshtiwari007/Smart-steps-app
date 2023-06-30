import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { func, string, any } from 'prop-types';
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

interface PropertyData  {
    item?:any;
    isIcon?:boolean;
    textColor?:any;
    textSize?:any;
    onPress?:func;
}
export default class BadgeComponent extends Component<{props:PropertyData}> {

    constructor(props){
        super(props)
    }
    state = {
        class:'button'
    }
    componentDidMount() {
        this.setState({class:this.props.class});
    }
    onPressBack(text){
        if(this.props?.onPress){
            this.props?.onPress(text);
        }
    }
    render() {
        return (
            <TouchableOpacity onPress={()=>{this.onPressBack(this.props?.item)}} style={[this.props?.style,{ flexDirection: 'row', backgroundColor: this.props?.background, minWidth: (this.props?.minWidth)?this.props?.minWidth:75, justifyContent: 'center',borderRadius: 20, marginLeft: 'auto', marginRight: 'auto',borderColor: this.props?.border, borderWidth: 1,padding:6 }]}>
                {this.props?.isIcon &&
                    <View style={{ backgroundColor: Colors.Gray, width: 20, height: 20, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                        <Feather name={this.props?.iconName} size={12} color={Colors.white} />
                    </View>
                }
                <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: (this.props?.textSize)?this.props?.textSize:10,color:this.props?.textColor,fontWeight:'700' }}>{this.props?.item}</Text></View>
            </TouchableOpacity>
        );
    }
}