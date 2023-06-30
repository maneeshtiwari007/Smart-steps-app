import { Component } from "react"
import { Pressable, ScrollView } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Theming from "../../utilty/styling/theming";
import Colors from "../../utilty/Colors";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SecuredWalletInterface } from "../../interfaces/Components/SecuredWalletInterface";
import { MaterialIcons } from '@expo/vector-icons'; 
export default class SecuredWalletComponent extends Component<SecuredWalletInterface> {
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    constructor(props) {
        super(props);
        this.state = {
            passWordModal: true,
            numberofPasswordField: [null, null, null, null, null, null],
            isModalVisible: this.props.modelVisible,
            passCode:[],
            isValidated:false
        }
    }
    onPressNumbber(event){
        if(this.state?.passCode?.length < 6){
            const passCode = this.state?.passCode;
            passCode.push(event);
            this.setState({passCode:passCode});
            this.props.onPressNum(this.state?.passCode);
        }
        if(this.state?.passCode?.length < 6){
            this.setState({isValidated:false});
        } else {
            this.setState({isValidated:true});
        }
    }
    clearPassCode(){
        this.setState({passCode:[]});
        this.setState({passCode:[]});
        this.props.onPressNum([]);
        this.setState({isValidated:false});
    }
    returnData(index){
        return {backgroundColor:(this.state?.passCode?.[index]!==undefined)?'white':'transparent'}
    }
    sendData(){
        this.props.dataCallBack(this.state?.passCode);
        this.props.onCloseModal(false);
        this.setState({ isModalVisible: false })
    }
    render() {
        return (
            <View style={{ backgroundColor: 'red', zIndex: 9 }}>
                <Modal
                    animationType={'slide'}
                    visible={this.state?.isModalVisible}
                    onRequestClose={() => {
                        this.props.onCloseModal(false)
                    }}>
                    <ScrollView style={{ paddingTop: 50, backgroundColor: Colors.primary_color }}>
                        <View style={{ marginBottom: 100 }}>
                            <Pressable onPress={() => { this.props.onCloseModal(false);this.setState({ isModalVisible: false }) }} style={{ marginLeft: 10, borderWidth: 1, width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderColor: 'white' }}>
                                <Ionicons name="ios-arrow-back" size={24} color="white" />
                            </Pressable>
                        </View>
                        <View style={Theming.modal}>
                            <View style={{ marginBottom: 50, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.h1, marginBottom: 10 }}> Secured Wallet </Text>
                                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14, textAlign: 'center' }}> Enter your passcode </Text>
                            </View>
                            <View style={{ alignItems: 'center', width: '100%', marginBottom: 50 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {this.state?.numberofPasswordField && this.state?.numberofPasswordField?.map((item, index) => {
                                        return (
                                            <View key={index} style={[Theming.passwordInActiveField,this.returnData(index)]}></View>
                                        );
                                    })}
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', width: '100%' }}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '70%',alignItems:'center',justifyContent:'center' }}>
                                    {this.numbers?.map((data, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={[Theming.numPad]} onPress={()=>{this.onPressNumbber(data)}} disabled={this.props.disablePad}>
                                                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f20 }}>{data}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={{ width:'100%',marginBottom:'auto',marginTop:'auto',bottom:40 }}>
                                <View style={{ width:'100%',flexDirection:'row',justifyContent:'space-between',marginLeft:30,paddingRight:50,alignItems:'center' }}>
                                    <Pressable onPress={this.clearPassCode.bind(this)}>
                                        <Text style={{ color:'white' }}>Clear</Text>
                                    </Pressable>
                                    <TouchableOpacity style={[Theming.numPad,{width:40,height:40,backgroundColor:(this.state?.isValidated)?'green':'transparent'}]} onPress={()=>{this.sendData()}} disabled={(this.state?.isValidated)?false:true}>
                                        <MaterialIcons name="done" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        )
    }
}