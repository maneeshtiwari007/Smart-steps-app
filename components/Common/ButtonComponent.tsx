import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { func, string, any } from 'prop-types';
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ButtonComponent extends Component<{}> {

    static propTypes = {
        onPressCall: func,
        title: string.isRequired,
        isDisabled: any,
        style: any,
        class: string,
        buttonTextStyle: any,
        icon: any
    }
    static defaultProps = {
        title: 'Button',
        isDisabled: 'false',
        style: {},
        class: 'button',
        buttonTextStyle: {},
        icon: {}
    }
    state = {
        class: 'button'
    }
    constructor(props) {
        super(props);

    }
    _handleOnPress = () => {

        const { onPressCall } = this.props;
        if (this.props.isDisabled !== 'true') {
            onPressCall();
        }
    }
    _isDisabledClas() {
        return (this.props.isDisabled === 'false') ? Theming.button.disable : ''
    }
    componentDidMount() {
        this.setState({ class: this.props.class });
    }
    render() {
        return (
            <View>
                <TouchableOpacity style={[Theming[this.state.class], this.props.style]} disabled={(this.props.isDisabled === 'true') ? true : false} onPress={() => this._handleOnPress()}>
                    <Text style={[Theming[this.state.class].text, this.props.buttonTextStyle]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}