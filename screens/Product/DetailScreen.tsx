import { Component } from "react";
import MainLayout from "../../Layout/Index";
import Theming from "../../utilty/styling/theming";
import Colors from "../../utilty/Colors";
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ImageComponent from '../../components/Common/ImageComponent';
import { Pressable, Text } from "react-native";
import { View } from "react-native";
import BadgeComponent from "../../components/Common/BadgeComponent";
import ProgressBar from "../../components/Core/ProgressBar";
import { Entypo } from '@expo/vector-icons';
import ButtonComponent from "../../components/Common/ButtonComponent";

export default class DetailScreen extends Component<{}> {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //console.log(this.props?.navigation)
    }
    render() {
        const item = this.props?.route?.params?.item;
        return (
            <>
                <MainLayout style={{ backgroundColor: Colors.ligtest_gray }} extraHeaderStyle={{}} isBack={true}>
                    <View style={{ width: '100%', height: 250 }}>
                        <View style={{ padding: 0, alignItems: 'center' }}>
                            <View style={{ width: '70%', height: '100%', justifyContent: 'center' }}>
                                <ImageComponent
                                    style={{ width: '100%', height: '70%', marginBottom: 10, padding: 10 }}
                                    type={"productImage"}
                                    src={{ uri: item?.images?.[0] }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <BadgeComponent item={item?.productCode} isIcon={true} iconName={'hash'} background={Colors.light_blue} border={Colors.light_crystal_blue} />
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <BadgeComponent item={'Common'} isIcon={false} background={Colors.primary_color} border={Colors.primary_color} textColor={Colors.white} textSize={12} style={{ paddingLeft: 10, paddingRight: 10 }} minWidth={100} />
                        <BadgeComponent item={'Runner'} isIcon={false} background={Colors.warning} border={Colors.warning} textColor={Colors.white} textSize={12} style={{ paddingLeft: 10, paddingRight: 10 }} minWidth={100} />
                        <BadgeComponent item={'100.0/100.0'} isIcon={false} background={Colors.success} border={Colors.success} textColor={Colors.white} textSize={12} style={{ paddingLeft: 10, paddingRight: 10 }} minWidth={100} />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <ProgressBar label={"Level 1"} stokesWidth={16} activeBackgroundColor={Colors.light_crystal_blue}></ProgressBar>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <ProgressBar label={"Shoe Mint 0/7"} stokesWidth={30} activeBackgroundColor={Colors.light_crystal_blue} isMultiState={true} numberOfState={7}></ProgressBar>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: Colors.FontSize.h1, fontWeight: '700', marginBottom: 20 }}>Attributes</Text>
                        <View style={{ width: '90%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 22, width: 22, backgroundColor: '#a6e9d5', borderRadius: 50, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Entypo name="plus" size={18} color="gray" />
                                    </View>
                                    <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>Comfort</Text>
                                </View>
                                <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>{item?.attr?.comfort}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 22, width: 22, backgroundColor: '#ffe69c', borderRadius: 50, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <Entypo name="list" size={16} color="gray" />
                                    </View>
                                    <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>Efficiency</Text>
                                </View>
                                <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>{item?.attr?.efficiency}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 22, width: 22, backgroundColor: Colors.light_blue, borderRadius: 50, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <MaterialCommunityIcons name="rectangle-outline" size={16} color="gray" />
                                    </View>
                                    <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>Resillience</Text>
                                </View>
                                <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>{item?.attr?.resillience}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ height: 22, width: 22, backgroundColor: Colors.light_blue, borderRadius: 50, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                                        <MaterialCommunityIcons name="thumb-up" size={16} color="gray" />
                                    </View>
                                    <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>Luck</Text>
                                </View>
                                <Text style={{ fontSize: Colors.FontSize.f16, fontWeight: '600' }}>{item?.attr?.luck}</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ height: 90, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ minHeight:70,width: '90%', flexDirection: 'row', justifyContent: 'center',backgroundColor:Colors.light_crystal_blue,borderRadius:35,paddingLeft:25,paddingRight:20,alignItems:'center' }}>
                            <Text style={{ fontSize:18 }}>$270 </Text>
                            {/* <ButtonComponent title="Buy Now" style={{ width: 110,backgroundColor:Colors.primary_color,maxHeight:50,borderRadius:30 }} buttonTextStyle={{color:Colors.white,fontSize:12,paddingLeft:20,paddingRight:20}}></ButtonComponent> */}
                        </View>
                    </View>
                </MainLayout>
            </>
        );
    }
}