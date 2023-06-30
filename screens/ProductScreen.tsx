import { Component, Key } from "react";
import MainLayout from "../Layout/Index";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SegmentedControl } from '@react-native-segmented-control/segmented-control';
import Colors from "../utilty/Colors";
import { CommonApiRequest } from "../utilty/api/commonApiRequest";
import Theming from "../utilty/styling/theming";
import ImageComponent from "../components/Common/ImageComponent";
import { Feather, Ionicons } from '@expo/vector-icons';
import ButtonComponent from "../components/Common/ButtonComponent";
import CardComponent from "../components/Common/CardComponent";
import Dropdown from "../components/Common/DropDown";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CommonHelper } from "../utilty/CommonHelper";

class ProductSscreen extends Component<{}> {
    state = {
        selectedIndex: '',
        selectedIndeBuy: 0,
        productData: {},
        loader: false,
        selectedPrice: {},
        allCategory: [],
        buyModal: false,
        buttonSiubmit: { label: 'Confirm', isDisable: 'false' },
        coinData: [],
        selectedProduct:{},
        selectedCoin:{}
    }
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }
    handleSelectIndex(index) {
        this.setState({ selectedIndex: index });
        if(index!==""){
            this.setState({loader:true})
            CommonApiRequest.getProduct(index).then((response) => {
                this.setState({loader:false})
                this.setState({ productData: response?.data })
                this.setState({ loader: false });
            }).catch(()=>{
                this.setState({loader:false})
            });
        }
    }
    handleSelectIndexBuy(index) {
        this.setState({ selectedIndeBuy: index });
        
    }
    componentDidMount() {
        this.setState({ loader: true });
        CommonApiRequest.storeProductCategory({}).then((response)=>{
            //console.log(response);
            if(response?.success){
                response?.data?.forEach((entry) => {
                    if (!this.state.allCategory?.find(item => item.label === entry)) {
                        this.state.allCategory.push({ label: entry, value: entry });
                        this.setState({ allCategory: this.state.allCategory });
                        this.setState({ selectedIndex: response?.data?.[0] });
                    }
                });
            }
        })
        CommonApiRequest.getProduct(this.state.selectedIndex).then((response) => {
            response?.data?.forEach((entry) => {
                if (!this.state.allCategory?.find(item => item.label === entry?.category)) {
                    //this.state.allCategory.push({ label: entry?.category, value: entry?.category });
                    //this.setState({ allCategory: this.state.allCategory });
                }
            });
            this.setState({ productData: response?.data })
            this.setState({ loader: false });
        });
        CommonApiRequest.customerGet({}).then((response) => {
            if (response?.success) {
                if (response?.data?.spending?.[0]) {
                    const objMap = []
                    response?.data?.spending?.map((item) => {
                        objMap.push({ label: item?.name, value: item?.name, alldata: item });
                        this.setState({ coinData: objMap });
                    })
                }
            }
        });
    }
    setSelected(ele) {
        //console.log(ele);
    }
    setShowModal(type: boolean) {
        this.setState({ buyModal: type });
    }
    async initBuyProduct() {
        if(this.state.selectedCoin?.label){
        const sendToAPi = await CommonHelper.formatBuyProductData(this.state.selectedProduct,this.state.selectedCoin);
        this.setState({buttonSiubmit: { label: 'Please wait...', isDisable: 'true' }});
        CommonApiRequest.customerBuyProduct(sendToAPi).then((response)=>{
            this.setState({buttonSiubmit: { label: 'Confirm', isDisable: 'false' }});
            if(response?.success){
                alert("Thank you for order");
                this.setState({ buyModal: false });
            }
        });
        } else {
            alert("Please select Asset");
        }
    }
    callBackCardComponent(data: any) {
        this.setState({ buyModal: true,selectedProduct:data });
    }
    onSelectCoin(data: any) {
        this.setState({selectedCoin:data});
    }
    render() {
        return (
            <MainLayout loaderVisible={this.state.loader} scrollEnable={true}>
                <View style={{ justifyContent: 'center', marginBottom: 20, alignItems: 'center', width: '100%', borderRadius: 12, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <View style={{ backgroundColor: Colors.ligtest_gray, flexDirection: 'row', width: '100%', borderColor: Colors.Gray, borderWidth: 1, borderRadius: 30, justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        {this.state?.allCategory && this.state?.allCategory?.map((cat, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        this.handleSelectIndex(cat?.label);
                                    }}
                                    key={index}
                                    style={{ borderWidth: (this.state.selectedIndex === cat?.label) ? 1 : 0, width: (100 / 3) + '%', padding: 10, borderRadius: 30, alignItems: 'center' }}>
                                    <Text>{cat?.label}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
                <View style={{ height: '100%', flex: 1 }}>
                    <View style={Theming.cardContainer}>
                        {this.state.productData?.[0] && this.state?.productData?.map((item: any, index: Key) => {
                            return (
                                <CardComponent key={index + '_ card'} item={item} navigation={this.props?.navigation} buyCallBack={(data) => { this.callBackCardComponent(data) }}></CardComponent>
                            );
                        })}

                    </View>
                </View>
                {this.state?.buyModal &&
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={this.state?.buyModal}
                    >
                        <ScrollView keyboardShouldPersistTaps='handled' style={styles.Container}>
                            <View style={{ marginTop: 65 }}>
                                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 20 }}>
                                    <View style={{}}>
                                        <TouchableOpacity onPress={() => { this.setShowModal(false); }} style={{ marginLeft: 10, borderWidth: 1, width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderColor: 'white' }}>
                                            <Ionicons name="ios-arrow-back" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto', position: 'relative', left: -20 }}>
                                        <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f20 }}>Send To</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.modal}>
                                <View style={{ marginTop: 25, width: '100%' }}>
                                    <View>
                                        <View style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: Colors.Gray, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, marginBottom: 5 }}>
                                            <Text style={[Theming.card.cardTitle, { fontWeight: 600 }]}>{this.state.selectedProduct?.name}</Text>
                                            <Text style={Theming.card.cardTitle}>{this.state.selectedProduct?.attr?.speed + " km/h"}</Text>
                                        </View>
                                        <Pressable style={{ padding: 15 }}>
                                            <ImageComponent
                                                style={{ width: '100%', height: 300, marginBottom: 10 }}
                                                type="productImage"
                                                src={{ uri: this.state.selectedProduct?.images?.[0] }}
                                            />
                                            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.light_blue, minWidth: 75, justifyContent: 'center', padding: 6, borderRadius: 20, marginLeft: 'auto', marginRight: 'auto', borderColor: Colors.light_crystal_blue, borderWidth: 1, marginBottom: 10 }}>
                                                <View style={{ backgroundColor: Colors.Gray, width: 20, height: 20, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                                                    <Feather name="hash" size={12} color={Colors.white} />
                                                </View>
                                                <View style={{ justifyContent: 'center' }}><Text style={{ fontSize: 10 }}>{this.state.selectedProduct?.productCode}</Text></View>
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: Colors.light_crystal_blue, borderBottomWidth: 4, paddingBottom: 3 }}>
                                                    <Text style={{ fontSize: 12 }}>Mint: {this.state.selectedProduct?.attr?.mint}</Text>
                                                    <Text>lv: {this.state.selectedProduct?.attr?.level}</Text>
                                                </View>
                                            </View>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={[Theming.pTagWhite]}>Select Coin</Text>
                                            <Dropdown dropDownItemStyle={{ width: '93.1%', left: '2.9%' }} label="Select Asset" containerstyle={{ width: '100%', height: 60, paddingLeft: 0, paddinRight: 10, borderRadius: 10, backgroundColor: Colors.white }} style={{ width: '100%', margingLeft: 'auto', marginRight: 'auto', height: 60, borderRadius: 10, backgroundColor: Colors.lightest_crystal_blue }} data={this.state?.coinData} onSelect={(data: any) => { this.onSelectCoin(data) }}></Dropdown>
                                        </View>
                                        <ButtonComponent title={this.state?.buttonSiubmit?.label} isDisabled={this.state?.buttonSiubmit?.isDisable} onPressCall={() => { this.initBuyProduct() }} buttonTextStyle={{ fontSize: 18 }}></ButtonComponent>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                }
            </MainLayout>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        width: '100%',
        height: '100%'
    },
    modal: {
        alignItems: 'center',
        bottom: 0,
        left: 0,
        minHeight: '100%',
        backgroundColor: Colors.primary_color,
        width: '100%'
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    }
});
const mapStateToState = state => ({
    user: state.errors,
})
export default connect(mapStateToState, null)(ProductSscreen)