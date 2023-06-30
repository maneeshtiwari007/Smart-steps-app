import { Component, ReactNode } from "react";
import SpendingWalletInterface from "../../interfaces/Components/SpendingWalletInterface";
import { Text, View } from "react-native";
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";

export default class SpendingWallet extends Component<SpendingWalletInterface>{
    constructor(props) {
        super(props);
        this.state = {
            historyType: 0,
            historyData: []
        }
    }
    componentDidMount() {
        this.changeHistoryType(0);
    }
    changeHistoryType(type: any) {
        this.setState({ historyType: type });
        const historyType = (type === 0) ? 'Pending' : 'Confirmed';
        CommonApiRequest.walletHistory(historyType).then((response) => {
            this.setState({ historyData: response?.data });
        })
    }
    render() {
        return (
            <>
                <View style={{ minHeight: 250, backgroundColor: Colors.primary_color, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: '100%', marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'space-between', marginBottom: 20 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ marginRight: 10, width: 30, height: 30, borderRadius: 50, borderColor: Colors.white, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <FontAwesome5 name="coins" size={18} color={Colors.white} />
                            </View>
                            <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f17 }}>
                                Spending Wallet
                            </Text>
                        </View>
                        <View style={{ width: 30, height: 30, borderRadius: 50, borderColor: Colors.white, borderWidth: 1, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="help" size={20} color={Colors.white} />
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: '95%', borderColor: Colors.white, borderRadius: 15, borderWidth: 1 }}>
                            {this.props?.objbData?.coins?.map((item: any, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Colors.white, borderBottomWidth: ((this.props?.objbData?.coins?.length - 1) === index) ? 0 : 1, padding: 15 }}>
                                        <Text style={{ fontSize: Colors.FontSize.f16, color: Colors.white }}>{item?.coin}</Text>
                                        <Text style={{ fontSize: Colors.FontSize.f16, color: Colors.white }}>{item?.amount}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '95%' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Pressable onPress={() => { this.changeHistoryType(0) }}>
                                <Text style={{ fontSize: Colors.FontSize.f17, marginRight: 30, color: (this.state?.historyType == 0) ? Colors.primary_color : Colors.lightest_primary_color }}>Pending</Text>
                            </Pressable>
                            <Pressable onPress={() => { this.changeHistoryType(1) }}>
                                <Text style={{ fontSize: Colors.FontSize.f17, color: (this.state?.historyType == 1) ? Colors.primary_color : Colors.lightest_primary_color }}>History</Text>
                            </Pressable>
                        </View>
                        <View>
                            {this.state?.historyData?.[0] && this.state?.historyData?.map((item, index) => {
                                return (
                                    <View key={index} style={{ borderWidth: 1, borderColor: Colors.lightest_primary_color, padding: 10, borderRadius: 10, marginBottom: 15 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ marginRight: 10, width: '13%' }}>
                                                <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: Colors.light_spotlight_green, justifyContent: 'center', alignItems: 'center' }}>
                                                    <MaterialCommunityIcons name="download" size={24} color={Colors.white} />
                                                </View>
                                            </View>
                                            <View style={{ width: "83%" }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                                    <Text style={{ color: Colors.light_spotlight_green, fontWeight: '700' }}>{item?.status}</Text>
                                                    <Text style={{ color: Colors.light_spotlight_green, fontWeight: '700' }}>${item?.attr?.amount}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ color: Colors.lightest_primary_color, fontSize: Colors.FontSize.f12 }}>{item?.createDate}</Text>
                                                    <Text style={{ color: Colors.lightest_primary_color, fontSize: Colors.FontSize.f12 }}>{item?.attr?.toAddress?.substring(0, 4) + "..." + item?.attr?.toAddress?.substring(9, 4)}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                )
                            })}
                            {!this.state?.historyData?.[0] &&
                                <View style={{ width:'100%',height:200,justifyContent:'center',alignItems:'center' }}>
                                    <Text>No Data Found!!</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </>
        );
    }
}