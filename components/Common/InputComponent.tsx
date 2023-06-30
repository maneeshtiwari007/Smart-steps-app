import { Component, ReactNode } from "react";
import { View, Animated, StyleSheet, TextInput, Text, TouchableWithoutFeedbackBase, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { string, func, object, number, any } from 'prop-types';
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from '@expo/vector-icons';


export default class InputComponent extends Component<{}> {
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        value: any.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        textInputStyles: object,
        otherTextInputProps: object,
        secureTextEntry:any,
        anyError:any,
        constaineStyle:any,
        placeholder:any,
        placeholderColor:any
    }


    static defaultProps = {
        keyboardType: 'default',
        titleActiveSize: 11.5,
        titleInActiveSize: 15,
        titleActiveColor: 'black',
        titleInactiveColor: 'dimgrey',
        textInputStyles: {},
        otherTextInputAttributes: {},
        secureTextEntry:false,
        anyError:{},
        constaineStyle:any,
        placeholder:"",
        placeholderColor:""
    }
    position: Animated.Value;

    constructor(props) {
        super(props);
        const { value } = this.props;
        this.position = new Animated.Value(value ? 1 : 0);
        this.state = {
            isFieldActive: false,
            showPassword:(this.props.secureTextEntry)
        }
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver:false
            }).start();
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 150,
                useNativeDriver:false
            }).start();
        }
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
        } = this.props;

        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [21, 0],
            }),
            fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
            marginTop:4
        }
    }
    _handleSecureEntry(){
        if(this.state.showPassword){
            this.setState({showPassword:false});
        } else {
            this.setState({showPassword:true});
        }
    }

    render() {
        return (
            <View style={[{ marginBottom:15 },this.props?.constaineStyle]}>
                <View style={Styles.container}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                    {this.state.showPassword &&
                        <TextInput
                            value={this.props.value}
                            style={[Styles.textInput, this.props.textInputStyles]}
                            underlineColorAndroid='transparent'
                            onFocus={this._handleFocus}
                            onBlur={this._handleBlur}
                            onChangeText={this._onChangeText}
                            keyboardType={this.props.keyboardType}
                            secureTextEntry={this.props.secureTextEntry}
                            {...this.props.otherTextInputProps}
                        />
                    }
                    {!this.state.showPassword &&
                        <TextInput
                            value={this.props.value}
                            style={[Styles.textInput, this.props.textInputStyles]}
                            underlineColorAndroid='transparent'
                            onFocus={this._handleFocus}
                            onBlur={this._handleBlur}
                            onChangeText={this._onChangeText}
                            keyboardType={this.props.keyboardType}
                            {...this.props.otherTextInputProps}
                            placeholder={this.props?.placeholder}
                            placeholderTextColor={this.props?.placeholderColor}
                            
                        />
                    }
                    {this.props.secureTextEntry &&
                        <Pressable
                            style={[Styles.passwordEyesStyles]}
                            onPress={()=>this._handleSecureEntry()}
                        >
                        {!this.state.showPassword &&
                            <FontAwesome5 name="eye" size={24} color={Colors.Gray}/>
                        }
                        {this.state.showPassword &&
                            <FontAwesome5 name="eye-slash" size={24} color={Colors.Gray}/>
                        }
                        </Pressable>
                    }
                </View>
            {this.props?.anyError?.isError &&
                <View style={Theming.errorContainer}>
                    <Text style={Theming.inputError}>{this.props?.anyError?.errorText}</Text>
                </View>
            }
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 0.5,
        height: 70,
        marginVertical: 4
    },
    textInput: {
        fontSize: 15,
        fontFamily: 'Avenir-Medium',
        height:'100%',
        paddingStart:10,
        paddingEnd:10,
        backgroundColor:'#252525',
        borderRadius:10,
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        left: 3,
        paddingStart:10,
        paddingEnd:10,
        zIndex:1,
    },
    passwordEyesStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        right: 3,
        paddingStart:10,
        paddingEnd:10,
        zIndex:1,
        justifyContent:'center',
        height:'100%'
    },
})