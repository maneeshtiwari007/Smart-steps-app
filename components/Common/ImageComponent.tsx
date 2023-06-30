import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { func,string,any } from 'prop-types';
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";

export default class ImageComponent extends Component<{}> {
    static propTypes = {
        src:any,
        title:string,
        type:string,
        style:any,
        imageType:string
    }
    static defaultProps = {
        title:'Image',
        type:'avatar',
        imageType:'avatar'
    }
    constructor(props){
        super(props);
    }
    render (){
        return (
            <View style={[this.props.style]}>
                 <Image
                        source={this.props.src}
                        style={[(this.props.type)?Theming[this.props.type]:{}]}
                        alt={this.props.title}
                    />
            </View>
        );
    }
}