import { Component, Key } from "react";
import MainLayout from "../Layout/Index";
import { BackHandler, DeviceEventEmitter, Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
import Constants from 'expo-constants';
import { Constant } from "../utilty/Constant";
import ServerErrorMessage from "../components/Common/ServerErrorMessage";

class ProductSscreen extends Component<{}> {
    webViewData: any = null;
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
        selectedProduct: {},
        selectedCoin: {},
        url: '',
        token: null,
        webView: null,
        webViewStateData: {},
        isWebViewBackEnable: false,
        httpError: false
    }
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }
    handleSelectIndex(index) {
        this.setState({ selectedIndex: index });
        if (index !== "") {
            this.setState({ loader: true })
            CommonApiRequest.getProduct(index).then((response) => {
                this.setState({ loader: false })
                this.setState({ productData: response?.data })
                this.setState({ loader: false });
            }).catch(() => {
                this.setState({ loader: false })
            });
        }
    }
    handleSelectIndexBuy(index) {
        this.setState({ selectedIndeBuy: index });

    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        this.setState({ loader: true });
        this.props.navigation.addListener('focus', () => {
            if(this.state.httpError){
                setTimeout(() => {
                    this.setState({ url: CommonHelper.returnWebViewMarketPlace(this.state?.token) });
                }, 500)
            }
            //this.setState({ url: CommonHelper.returnWebViewMarketPlace(this.state?.token) });
        });
        CommonHelper.getData('user').then((user) => {
            if (user?.token) {
                this.setState({ token: user?.token });
                this.setState({ loader: false })
                this.setState({ url: CommonHelper.returnWebViewMarketPlace(this.state?.token) });
            }
        })
        CommonApiRequest.storeProductCategory({}).then((response) => {
            if (response?.success) {
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
    }
    setShowModal(type: boolean) {
        this.setState({ buyModal: type });
    }
    async initBuyProduct() {
        if (this.state.selectedCoin?.label) {
            const sendToAPi = await CommonHelper.formatBuyProductData(this.state.selectedProduct, this.state.selectedCoin);
            this.setState({ buttonSiubmit: { label: 'Please wait...', isDisable: 'true' } });
            CommonApiRequest.customerBuyProduct(sendToAPi).then((response) => {
                this.setState({ buttonSiubmit: { label: 'Confirm', isDisable: 'false' } });
                if (response?.success) {
                    alert("Thank you for order");
                    this.setState({ buyModal: false });
                }
            });
        } else {
            alert("Please select Asset");
        }
    }
    callBackCardComponent(data: any) {
        this.setState({ buyModal: true, selectedProduct: data });
    }
    onSelectCoin(data: any) {
        this.setState({ selectedCoin: data });
    }
    onBackHistory() {
        if (this.state.webViewStateData?.canGoBack) {
            this.setState({ isWebViewBackEnable: true });
            this?.webViewData?.goBack();
        } else {
            this.setState({ isWebViewBackEnable: false });
            //this.props?.navigation?.goBack(-1);
        }
    }
    render() {
        return (
            <MainLayout isWebViewBackEnable={this.state?.isWebViewBackEnable} loaderVisible={this.state.loader} scrollEnable={false} type="light" onBackCallback={() => { this.onBackHistory() }}>
                {/* <LinearGradient
                    // Background Linear Gradient
                    colors={['#1aa5c6', '#0455ad']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }} style={{ padding: 20 , marginBottom: 30}}>
                    <View style={{ justifyContent: 'center', marginBottom: 15, alignItems: 'center', width: '100%', backgroundColor: '#e2e2e2', borderRadius: 12, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                        <View style={{ backgroundColor: Colors.ligtest_gray, flexDirection: 'row', flex: 1, borderColor: Colors.Gray, borderWidth: 1, borderRadius: 30, justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            {this.state?.allCategory && this.state?.allCategory?.map((cat, index) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            this.handleSelectIndex(cat?.label);
                                        }}
                                        key={index}
                                        style={{ backgroundColor: (this.state.selectedIndex === cat?.label) ? '#004aad' : 'transparent', borderWidth: (this.state.selectedIndex === cat?.label) ? 1 : 0, width: (100 / 3) + '%', padding: 10, borderRadius: 30, alignItems: 'center' }}>
                                        <Text style={{ color: (this.state.selectedIndex === cat?.label) ? '#fff' : '#000' }}>{cat?.label}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{ width: '40%', marginRight: '10%' }}>
                                <Dropdown containerstyle={{ backgroundColor: 'transparent' }} onSelect={(data: any) => { this.selectPlacement(data) }} value={{ label: 'Lowest Price', value: 'Lowest Price' }} label={'Select Value'} style={{ borderRadius: 50, borderColor: Colors.Gray, borderWidth: 1, height: 30, backgroundColor: '#fff', fontSize: 5, paddingLeft: 0, paddingRight: 10 }} dropDownItemStyle={{ borderRadius: 10, left: '5%' }} data={[{ label: 'Left', value: 'Left' }, { label: 'Right', value: 'Right' }]}></Dropdown>
                            </View>
                            <View style={{ width: '40%', backgroundColor: Colors.ligtest_gray, borderColor: Colors.Gray, borderWidth: 1, borderRadius: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: (100 / 2) + '%', backgroundColor: "#004aad", padding: 6, paddingLeft: 10, paddingRight: 10, borderRadius: 30, flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                    <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f12 }}>Buy</Text>
                                </View>
                                <View style={{ width: (100 / 2) + '%', padding: 6, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: Colors.FontSize.f12 }}>Rent</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', width: 25, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/staticimages/circleStar.png')} style={{ width: '100%', height: 25, borderRadius: 100, }}></Image>
                            <Text style={{
                                marginLeft: 5,
                                fontSize: Colors.FontSize.f14,
                                fontFamily: 'Inter_600SemiBold',
                                fontWeight: '600',
                                color: Colors.white,
                            }}>0</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={{}} onPress={() => { alert("Spark") }}>
                                <Text style={{
                                    fontSize: Colors.FontSize.f12,
                                    fontFamily: 'Inter_500Medium',
                                    fontWeight: '600',
                                    color: Colors.primary_color,
                                    backgroundColor: '#ffcc00',
                                    padding: 5,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    borderRadius: 30,
                                }}>+ Spark</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient> */}
                {/* <View style={{ height: '100%', flex: 1 }}>
                    <View style={Theming.cardContainer}>
                        {this.state.productData?.[0] && this.state?.productData?.map((item: any, index: Key) => {
                            return (
                                <CardComponent key={index + '_ card'} item={item} navigation={this.props?.navigation} buyCallBack={(data) => { this.callBackCardComponent(data) }}></CardComponent>
                            );
                        })}

                    </View>
                </View> */}
                {this.state?.url && !this.state?.httpError &&
                    <WebView
                        ref={(viewData) => { this.webViewData = viewData }}
                        style={styles.WebViewcontainer}
                        source={{ uri: this.state?.url }}
                        bounces={false}
                        onLoadStart={() => {
                            this.setState({ loader: true })
                        }}
                        onLoadEnd={() => {
                            this.setState({ loader: false })
                        }}
                        onLoad={() => {
                            this.setState({ loader: false })
                        }}

                        onNavigationStateChange={(state: any) => {
                            this.setState({ webViewStateData: state });
                            if (state?.url?.includes("smartapp.coin.update")) {
                                DeviceEventEmitter.emit(Constant.REFRESH_COINT_EVENT, { data: 'data' });
                                this.setState({ url: null });
                                setTimeout(() => {
                                    this.setState({ url: CommonHelper.returnWebViewMarketPlace(this.state?.token) });
                                }, 500)
                            }
                            if (state?.url?.includes(Constant.check_market_place_url)) {
                                this.setState({ isWebViewBackEnable: false });
                            } else {
                                this.setState({ isWebViewBackEnable: true });
                            }
                        }}
                        onError={() => {
                            this.setState({ loader: false });
                            this.setState({ url: null, httpError: true })
                        }}
                        onHttpError={() => {
                            this.setState({ loader: false });
                        }}
                    />
                }
                {!this.state?.url && this.state?.httpError &&
                    <ServerErrorMessage />
                }
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
    },
    WebViewcontainer: {
        height: Dimensions.get('window').height,
        width: '100%',
        paddingTop: 100
    },
});
const mapStateToState = state => ({
    user: state.errors,
})
export default connect(mapStateToState, null)(ProductSscreen)