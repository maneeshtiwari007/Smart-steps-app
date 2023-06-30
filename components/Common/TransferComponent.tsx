import { Component, ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../../utilty/Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import Theming from '../../utilty/styling/theming';
import Dropdown from "./DropDown";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";

export default class TransferComponent extends Component<TransferComponentInterface>{
    constructor(props) {
        super(props);
        this.state = {
            coinData: [],
            items: [],
            amount: '',
            type: 'from',
            selectedCoin:{},
            buttonSiubmit:{label:"Transfer",isDisable:'false'}
        }
    }
    componentDidMount() {
        this.props?.ojbData?.coins?.map((item) => {
            this.state?.coinData?.push({ label: item?.coin, value: item?.coin, amount: item?.amount?.toString() });
            this.setState({ coinData: this.state?.coinData });
        })
    }
    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    swapForm() {
        if (this.state?.type == 'from') {
            this.setState({ type: 'to' })
        } else {
            this.setState({ type: 'from' })
        }
    }
    onSelectCoin(data:any){
        this.setState({ selectedCoin: data });
    }
    initiateTransfer(){
        if(this.state?.selectedCoin?.label && this.state?.amount!==""){
            this.setState({buttonSiubmit:{label:"Please wait...",isDisable:'true'}})
            const transferData = {
                "fromGroup": (this.state?.type==='to')?this.props.transferTypeFrom:this.props.transferTypeTo,
                "toGroup": (this.state?.type==='from')?this.props.transferTypeFrom:this.props.transferTypeTo,
                "toAddress": this.props?.ojbData?.address,
                "token": this.state?.selectedCoin?.label,
                "amount": this.state?.amount,
                "authPassword": this.props?.authPassword,
                "kind": "ToCompany"
            }
            CommonApiRequest.walletTraansfer(transferData).then((response)=>{
                if(response?.success){
                    alert('Transfer successfully!');
                }
                this.setState({buttonSiubmit:{label:"Transfer",isDisable:'false'}})
                this.setState({amount:''});
            }).catch(()=>{
                this.setState({buttonSiubmit:{label:"Transfer",isDisable:'false'}})
            })
        } else {
            alert('All Fields are required')
        }
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled' style={{ height: '100%' }}>
                <View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: '95%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: Colors.white, borderRadius: 15, borderWidth: 1, padding: 10, paddingTop: 35, paddingLeft: 20, paddingBottom: 35, marginBottom: 20 }}>
                                <View style={{ width: '85%' }}>
                                    {this.state.type == 'from' &&
                                        <View>
                                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 20, height: 20, borderRadius: 3, borderColor: Colors.white, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                        <MaterialIcons name="account-balance-wallet" size={20} color="white" />
                                                    </View>
                                                    <Text style={{ color: Colors.lightest_primary_color, marginLeft: 10 }}>From</Text>
                                                </View>
                                                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <Text style={{ color: Colors.white, marginLeft: 10, fontSize: Colors.FontSize.f17 }}>{this.props?.transferTypeTo}</Text>
                                                </View>
                                            </View>
                                            <Divider style={{ marginBottom: 20, height: 0.17, backgroundColor: Colors.lightest_primary_color }} />
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 20, height: 20, borderRadius: 3, borderColor: Colors.white, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                        <MaterialIcons name="location-searching" size={10} color="white" />
                                                    </View>
                                                    <Text style={{ color: Colors.lightest_primary_color, marginLeft: 10 }}>To</Text>
                                                </View>
                                                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <Text style={{ color: Colors.white, marginLeft: 10, fontSize: Colors.FontSize.f17 }}>{this.props?.transferTypeFrom}</Text>
                                                </View>
                                            </View>
                                            
                                        </View>
                                    }
                                    {this.state.type == 'to' &&
                                        <View>
                                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 20, height: 20, borderRadius: 3, borderColor: Colors.white, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                        <MaterialIcons name="account-balance-wallet" size={20} color="white" />
                                                    </View>
                                                    <Text style={{ color: Colors.lightest_primary_color, marginLeft: 10 }}>To</Text>
                                                </View>
                                                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <Text style={{ color: Colors.white, marginLeft: 10, fontSize: Colors.FontSize.f17 }}>{this.props?.transferTypeFrom}</Text>
                                                </View>
                                            </View>
                                            <Divider style={{ marginBottom: 20, height: 0.17, backgroundColor: Colors.lightest_primary_color }} />
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 20, height: 20, borderRadius: 3, borderColor: Colors.white, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                        <MaterialIcons name="location-searching" size={10} color="white" />
                                                    </View>
                                                    <Text style={{ color: Colors.lightest_primary_color, marginLeft: 10 }}>From</Text>
                                                </View>
                                                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <Text style={{ color: Colors.white, marginLeft: 10, fontSize: Colors.FontSize.f17 }}>{this.props?.transferTypeTo}</Text>
                                                </View>
                                            </View>
                                            
                                            
                                        </View>
                                    }
                                </View>
                                <View style={{ width: '15%' }}>
                                    <TouchableOpacity onPress={() => { this.swapForm() }} style={{ width: 35, height: 35, borderRadius: 50, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightest_primary_color }}>
                                        <Ionicons name="swap-vertical-sharp" size={20} color={Colors.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{}}>
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={[Theming.pTagWhite]}>Asset</Text>
                                    <Dropdown dropDownItemStyle={{ width: '93.1%', left: '2.9%' }} label="Select Asset" containerstyle={{ width: '100%', height: 60, paddingLeft: 0, paddinRight: 10, borderRadius: 10, backgroundColor: Colors.white }} style={{ width: '100%', margingLeft: 'auto', marginRight: 'auto', height: 60, borderRadius: 10, backgroundColor: Colors.lightest_crystal_blue }} data={this.state?.coinData} onSelect={(data: any) => { this.onSelectCoin(data)}}></Dropdown>
                                </View>
                                <TouchableOpacity style={{ position: 'relative' }} >
                                    <View>
                                        <Text style={[Theming.pTagWhite]}>Amount</Text>
                                        <InputComponent
                                            attrName='amount'
                                            title=""
                                            value={this.state?.amount}
                                            updateMasterState={this._updateMasterState}
                                            textInputStyles={{ // here you can add additional TextInput styles
                                                fontSize: 15,
                                                color: Colors.white
                                            }}
                                            otherTextInputProps={{   // here you can add other TextInput props of your choice
                                                maxLength: 200,
                                            }}
                                            titleActiveColor={Colors.Gray}
                                            constaineStyle={{ marginBottom: 20 }}
                                            placeholder={"Enter Amount"}
                                            placeholderColor={Colors.lightest_primary_color}
                                            keyboardType="numeric"
                                        />
                                        <Text style={[Theming.pTagWhite, { marginBottom: 10 }]}>Avaliable Amount : {(this.state?.selectedCoin?.amount)?this.state?.selectedCoin?.amount:0}</Text>
                                        <ButtonComponent title={this.state?.buttonSiubmit?.label} isDisabled={this.state?.buttonSiubmit?.isDisable} onPressCall={() => { this.initiateTransfer()}} buttonTextStyle={{ fontSize: 18 }}></ButtonComponent>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}