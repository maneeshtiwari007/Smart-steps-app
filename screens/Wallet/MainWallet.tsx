import { Component, ReactNode } from "react";
import { Pressable, View } from "react-native";
import Dropdown from "../../components/Common/DropDown";
import { Text } from "react-native";
import BadgeComponent from "../../components/Common/BadgeComponent";
import { MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import ButtonComponent from "../../components/Common/ButtonComponent";
import Colors from "../../utilty/Colors";
import SpendingWalletInterface from "../../interfaces/Components/SpendingWalletInterface";

export default class MainWallet extends Component<SpendingWalletInterface>{
    constructor(props) {
        super(props);
        this.state = {
            isTransfer: false,
            transferType:'Spending'
        }
    }
    componentDidMount() {
        this.setState({ isTransfer: false })
    }
    setCallback(data: any, type: sny) {
        setTimeout(()=>{
            this.props.onShowModal({ data: data, type: type,transferType:this.state?.transferType });
        },500)
    }
    showTransferOption() {
        this.setState({ isTransfer: true })
    }
    hideTransferOption() {
        this.setState({ isTransfer: false })
    }
    changeTransferType(type:any){
        this.setState({ transferType: type })
    }
    render() {
        return (
            <>
                <Pressable style={{ minHeight: 350, backgroundColor: Colors.primary_color, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} onPress={()=>{this.hideTransferOption()}}>
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 30 }}>
                        <Dropdown dropDownItemStyle={{ width: '54%', left: '23%' }} label="BNB Smart Chain (BEP20)" containerstyle={{ width: '55%', height: 40, paddingLeft: 10, paddinRight: 10, borderRadius: 30, backgroundColor: Colors.lightest_crystal_blue }} style={{ width: '100%', margingLeft: 'auto', marginRight: 'auto', height: 40, borderRadius: 30, backgroundColor: Colors.lightest_crystal_blue }} data={[{ label: 'test', value: 'test' }, { label: 'test', value: 'test' }, { label: 'test', value: 'test' }]} onSelect={() => { }}></Dropdown>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 30 }}>
                        <Text style={{ fontSize: Colors.FontSize.h1, color: Colors.white }}>0.00 BNB</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 40 }}>
                        <BadgeComponent item={'0x65c76...83c508a'} isIcon={false} background={Colors.light_tran} textSize={14} style={{ paddingLeft: 10, paddingRight: 10 }}></BadgeComponent>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setCallback(true, 'sp') }}>
                                    <View style={{ borderColor: 'white', borderRadius: 50, borderWidth: 1, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                        <MaterialCommunityIcons name="call-received" size={16} color="white" />
                                    </View>
                                    <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14 }}>Receive</Text>
                                </Pressable>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                {!this.state?.isTransfer &&
                                    <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.showTransferOption() }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <View style={{ borderColor: 'white', borderRadius: 50, borderWidth: 1, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                                    <Feather name="arrow-up-right" size={16} color="white" />
                                                </View>
                                                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14 }}>Transfer</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                }
                                {this.state?.isTransfer &&
                                    <Pressable style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={{ alignItems: 'center',marginRight:10 }} onPress={() => {this.changeTransferType('Spending'); this.setCallback(true, 'mn') }}>
                                                <View style={{ borderColor: 'white', borderRadius: 50, borderWidth: 1, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                                    <Feather name="refresh-ccw" size={16} color="white" />
                                                </View>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14,alignItems:'center' }}>To</Text>
                                                    <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14,alignItems:'center' }}>Spending</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable style={{ alignItems: 'center' }} onPress={() => { this.changeTransferType('Wallet');this.setCallback(true, 'mn') }}>
                                                <View style={{ borderColor: 'white', borderRadius: 50, borderWidth: 1, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                                    <Feather name="arrow-up-right" size={16} color="white" />
                                                </View>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14,alignItems:'center' }}>To</Text>
                                                    <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14,alignItems:'center' }}>External</Text>
                                                </View>
                                            </Pressable>
                                        </View>

                                    </Pressable>
                                }
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ borderColor: 'white', borderRadius: 50, borderWidth: 1, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
                                    <Feather name="refresh-cw" size={16} color="white" />
                                </View>
                                <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f14 }}>Trade</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
                <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '95%' }}>
                        <Text style={{ fontSize: Colors.FontSize.f17, fontWeight: '700' }}>Wallet Account</Text>
                        <ButtonComponent
                            title="Buy"
                            icon={<FontAwesome5 name="coins" size={16} color="black" />}
                            onPressCall={() => { }}
                            style={{ width: 70, height: 40, backgroundColor: 'transparent', borderColor: Colors.light_crystal_blue, borderWidth: 1, flexDirection: 'row' }}
                        ></ButtonComponent>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: '95%', borderColor: Colors.primary_color, borderRadius: 15, borderWidth: 1 }}>
                            {this.props?.objbData?.coins?.map((item: any, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Colors.primary_color, borderBottomWidth: ((this.props?.objbData?.coins?.length - 1) === index) ? 0 : 1, padding: 15 }}>
                                        <Text style={{ fontSize: Colors.FontSize.f16, color: Colors.primary_color }}>{item?.coin}</Text>
                                        <Text style={{ fontSize: Colors.FontSize.f16, color: Colors.primary_color }}>{item?.amount}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </>
        )
    }
}