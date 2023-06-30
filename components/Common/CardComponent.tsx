import { Component, ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import ImageComponent from "./ImageComponent";
import { Feather } from '@expo/vector-icons';
import ButtonComponent from "./ButtonComponent";
import Theming from "../../utilty/styling/theming";
import Colors from "../../utilty/Colors";
import { any, number, func,bool } from 'prop-types';
import { CommonHelper } from "../../utilty/CommonHelper";

export default class CardComponent extends Component<{}> {
    static propTypes = {
        item: any,
        index: number,
        navigation: any,
        buyCallBack: func,
        isBuyButton: bool
    };
    static defaultProps = {
        item: {},
        index: 0,
        navigation: any,
        buyCallBack: func,
        isBuyButton: true
    };
    constructor(props) {
        super(props);
    }
    openDetailPage(item: any) {
        this.props?.navigation?.navigate("ProductDetailScreen", { item: item });
    }
    buyCallBackPress(data: any) {
        this.props?.buyCallBack(data);
    }
    render() {
        const item = this.props?.item;
        return (
            <View style={Theming.card} key={this.props?.index}>
                <View style={{ paddingTop: 0, padding: 15 }}>
                    <View style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: Colors.Gray, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, marginBottom: 5 }}>
                        <Text style={[Theming.card.cardTitle, { fontWeight: '600' }]}>{CommonHelper.suStringText(item?.name,8)}</Text>
                        <Text style={Theming.card.cardTitle}>{item?.attr?.speed + " km/h"}</Text>
                    </View>
                    <Pressable style={{ padding: 15 }} onPress={() => { this.openDetailPage(item) }}>
                        <ImageComponent
                            style={{ width: '100%', height: 100, marginBottom: 10 }}
                            type="productImage"
                            src={(item?.images?.[0])?{ uri: item?.images?.[0] }:require('../../assets/staticimages/shoe.png')}
                        />
                        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.light_blue, minWidth: 75, justifyContent: 'center', padding: 6, borderRadius: 20, marginLeft: 'auto', marginRight: 'auto', borderColor: Colors.light_crystal_blue, borderWidth: 1, marginBottom: 10 }}>
                            <View style={{ backgroundColor: Colors.Gray, width: 20, height: 20, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                                <Feather name="hash" size={12} color={Colors.white} />
                            </View>
                            <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 10 }}>{item?.productCode}</Text></View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Colors.light_crystal_blue, borderBottomWidth: 4, paddingBottom: 3 }}>
                                <Text style={{ fontSize: 12 }}>Mint: {item?.attr?.mint}</Text>
                                <Text>lv: {item?.attr?.level}</Text>
                            </View>
                        </View>
                    </Pressable>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%', justifyContent: 'center' }}>
                                <Text>${item?.price}</Text>
                            </View>
                            {this.props?.isBuyButton &&
                                <View style={{ width: '50%', justifyContent: 'center' }}>
                                    <ButtonComponent title="BUY" style={{}} class={'buyButton'} onPressCall={() => { this.buyCallBackPress(item) }} />
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}