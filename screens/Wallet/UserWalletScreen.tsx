import { Component, ReactNode } from "react"
import MainLayout from "../../Layout/Index";
import Colors from "../../utilty/Colors";
import { Button, DeviceEventEmitter, Image, Modal, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Dropdown from "../../components/Common/DropDown";
import BadgeComponent from "../../components/Common/BadgeComponent";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import store from "../../store";
import Theming from "../../utilty/styling/theming";
import SecuredWalletComponent from "../../components/Common/SecuredWalletComponent";
import SuccessMessage from "../../components/SuccessMessage";
import ButtonComponent from "../../components/Common/ButtonComponent";
import MainWallet from "./MainWallet";
import SpendingWallet from "./SpendingWallet";
import * as Clipboard from 'expo-clipboard';
import TransferComponent from "../../components/Common/TransferComponent";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import InputComponent from "../../components/Common/InputComponent";
import WebView from "react-native-webview";
import { Dimensions } from "react-native";
import Constants from 'expo-constants';
import { CommonHelper } from "../../utilty/CommonHelper";
import { Constant } from "../../utilty/Constant";
import ServerErrorMessage from "../../components/Common/ServerErrorMessage";

export default class UserWalletScreen extends Component<{}> {
    walletView:any=null;
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            showModal: false,
            passModal: false,
            disableNumPad: false,
            loader: true,
            success: false,
            type: 'create',
            userWalletData: {},
            showTransferModal: false,
            transferTypeFrom: '',
            transferTypeTo: '',
            authPassword: '1',
            showTransferModalExternal: false,
            amount: '',
            address: '',
            obbjCoinData: {},
            selectedCoin: {},
            buttonSiubmit: { label: 'Confirm', isDisable: 'false' },
            spendingData: {},
            url: '',
            token: null,
            webViewStateData:{},
            isWebViewBackEnable:false,
            confirmPass:false,
            httpError:false
        }
    }
    setShowModal(data: any) {
        this.setState({ transferTypeFrom: data?.transferType })
        if (data?.transferType === 'Spending') {
            this.setState({ transferTypeTo: 'Wallet' })
        } else {
            this.setState({ transferTypeTo: 'Spending' })
        }
        if (data?.type == 'sp') {
            this.setState({ showModal: data?.data });
        } else {
            if (data?.transferType === 'Spending') {
                this.setState({ showTransferModal: data?.data });
            } else {
                this.setState({ showTransferModalExternal: data?.data });
            }
        }
    }
    changeSegment(index) {
        this.setState({ selectedIndex: index });
    }
    componentDidMount() {
        this.setState({ loader: true })
        this.props.navigation.addListener('focus', () => {
            if(this.state?.httpError){
                setTimeout(() => {
                    this.checkWalletAPi();
                }, 500)
            }
            this.checkWalletAPi()
        });
        this.checkWalletAPi()
        //this.setState({ passModal: true });
        // CommonApiRequest.walletView({ authPassword: this.state.authPassword }).then((response) => {
        //     //console.log(response?.data);
        //     this.setState({ userWalletData: response?.data });
        // }).catch((error) => { console.log('error') })
    }
    checkWalletAPi(){
        this.setState({ loader: true })
        CommonApiRequest.checkWalletExists({}).then((response) => {
            this.setState({ loader: false });
            if (response?.data === false) {
                this.setState({ passModal: true, type: 'create' })
            } else {
                this.setState({ passModal: true, type: 'log' }) //log
            }
        }).catch(() => {
            this.setState({ loader: false });
        });
    }
    onPressPassworddNum(data) {
        if (data?.length === 6) {
            this.setState({ disableNumPad: true })
        } else {
            this.setState({ disableNumPad: false })
        }
    }
    callBackPassword(data: any) {
        const joinedData = data?.join("");
        this.setState({ authPassword: joinedData })
        if (this.state.type === "create") {
            this.setState({ authPassword: joinedData });
            this.setState({ confirmPass: true });
            
            // CommonApiRequest.walletCreate({ authPassword: joinedData }).then((response) => {
            //     this.setState({ loader: false })
            //     this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, this.state?.token) });
            // }).catch(() => {
            //     this.setState({ loader: false });
            //     this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, this.state?.token) });
            // });
        } else {
            CommonApiRequest.customerGet({}).then((response) => {
                if (response?.success) {
                    this.setState({ spendingData: response?.data });
                }
            })
            // CommonApiRequest.walletView({ authPassword: joinedData }).then((response) => {
            //     if (response?.success) {
            //         CommonHelper.getData('user').then((user) => {
            //             if (user?.token) {
            //                 this.setState({ token: user?.token });
            //                 this.setState({ loader: false })
            //                 //this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, this.state?.token) });
            //             }
            //         })
            //         this.setState({ passModal: false, type: 'log' })
            //         this.setState({ authPassword: joinedData });
            //         this.setState({ userWalletData: response?.data });
            //         if (response?.data?.wallets?.[0]) {
            //             var objCnData = [];
            //             response?.data?.wallets?.[0]?.coins?.map((item) => {
            //                 objCnData?.push({ label: item?.coin, value: item?.coin, amount: item?.amount?.toString() });
            //                 this.setState({ obbjCoinData: objCnData });
            //             })
            //         }
            //     }
            // }).catch((error) => {
            //     this.setState({ passModal: true, type: 'log' })
            // });
            CommonApiRequest.walletValidate({ authPassword: joinedData }).then((response) => {
                if (response?.success) {
                    CommonHelper.getData('user').then((user) => {
                        if (user?.token) {
                            this.setState({ token: user?.token });
                            this.setState({ loader: false });
                            this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, user?.token) });
                        }
                    })
                    this.setState({ passModal: false, type: 'log' })
                    this.setState({ authPassword: joinedData });
                } else {
                    this.setState({ passModal: true, type: 'log' })
                }
            }).catch(()=>{
                this.setState({ passModal: true, type: 'log' })
            })
        }

    }
    callBackOnConfirm(data:any){
        const joinedData = data?.join("");
        if(joinedData === this.state?.authPassword){
            CommonHelper.getData('user').then((user) => {
                if (user?.token) {
                    this.setState({ token: user?.token });
                    this.setState({ loader: false });
                    this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, this.state?.token) });
                }
            })
            // CommonApiRequest.walletCreate({ authPassword: this.state?.authPassword }).then((response) => {
            //     this.setState({ loader: false });
            //     this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, this.state?.token) });
            // }).catch(() => {
            //     this.setState({ loader: false });
            //     this.setState({ url: CommonHelper.returnWebViewWallet(joinedData, this.state?.token) });
            // });
        } else {
            alert("Not Matched");
        }
    }
    async copyToClipBord(text: any) {
        await Clipboard.setStringAsync(text);
        alert('Address Copied')
    }
    _updateMasterState = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    onSelectCoin(data: any) {
        this.setState({ selectedCoin: data });
    }
    initiateExytrenalTransfer() {
        if (this.state?.selectedCoin?.label && this.state?.amount !== "" && this.state?.address !== "") {
            this.setState({ buttonSiubmit: { label: "Please wait...", isDisable: 'true' } })
            const transferData = {
                "fromGroup": 'Wallet',
                "toGroup": 'Wallet',
                "toAddress": this.state?.address,
                "token": this.state?.selectedCoin?.label,
                "amount": this.state?.amount,
                "authPassword": this.state?.authPassword,
                "kind": "External"
            }
            this.setState({ loader: true })
            CommonApiRequest.walletTraansfer(transferData).then((response) => {
                this.setState({ loader: false })
                if (response?.success) {
                    alert('Transfer successfully!');
                }
                this.setState({ buttonSiubmit: { label: "Confirm", isDisable: 'false' } })
                this.setState({ amount: '' });
                this.setState({ address: '' });
            }).catch(() => {
                this.setState({ loader: false })
                this.setState({ buttonSiubmit: { label: "Confirm", isDisable: 'false' } })
            })
        } else {
            alert('All Fields are required')
        }
    }
    onBackHistory(){
        if(this.state.webViewStateData?.canGoBack){
            this.setState({isWebViewBackEnable:true});
            this?.walletView?.goBack();
        } else {
            this.setState({isWebViewBackEnable:false});
            //this.props?.navigation?.goBack(-1);
        }
    }
    render() {
        return (
            <>
                <MainLayout scrollEnable={false} isModal={true} isWebViewBackEnable={this.state?.isWebViewBackEnable} onBackCallback={()=>{this.onBackHistory()}} isHistory={true} isBack={false} style={{ backgroundColor: Colors.ligtest_gray }} extraHeaderStyle={{ backgroundColor: Colors.primary_color }} loaderVisible={this.state?.loader}>
                    {this.state.success &&
                        <SuccessMessage title="Successfully" subMessage="Your wallet created successfully!"></SuccessMessage>
                    }
                    {this.state?.url !== "" && !this.state?.httpError &&
                        <WebView
                            ref={(viewData)=>{this.walletView=viewData}}
                            originWhitelist={['*']}
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
                            onNavigationStateChange={(state:any)=>{
                                if(state?.url?.includes("smartapp.coin.update")){
                                    DeviceEventEmitter.emit(Constant.REFRESH_COINT_EVENT,{data:'data'});
                                    this.setState({ url:null});
                                    setTimeout(()=>{
                                        this.setState({ url: CommonHelper.returnWebViewWallet(this.state?.authPassword, this.state?.token) });
                                    },500)
                                }
                                this.setState({webViewStateData:state});
                                if(state.url?.includes(Constant.check_wallet_url)){
                                    this.setState({ isWebViewBackEnable: false });
                                } else {
                                    this.setState({ isWebViewBackEnable: true });
                                }
                                if(state?.url?.includes(Constant.check_for_logout_url)){
                                    CommonHelper.removeData('user');
                                    this.props.navigation.replace('Auth');
                                }
                            }}
                            onError={()=>{
                                this.setState({ loader: false });
                                this.setState({url:null,httpError:true})
                            }}
                            onHttpError={()=>{
                                this.setState({ loader: false });
                            }}
                        />
                    }
                    {!this.state?.url && this.state?.httpError &&
                        <ServerErrorMessage/>
                    }

                    {this.state.userWalletData?.wallets?.[0]?.addressQR &&
                        <Modal
                            animationType={'slide'}
                            transparent={true}
                            visible={this.state?.showModal}
                            onRequestClose={() => {
                            }}>
                            {/*All views of Modal*/}
                            {/*Animation can be slide, slide, none*/}
                            <View style={styles.ContainerHalf}>
                                <View style={styles.modalHalf}>
                                    <Text style={styles.text}>Modal is open!</Text>
                                    <View style={{ width: '100%', height: 300 }}>
                                        <Image style={{ width: '100%', height: '100%', backgroundColor: 'green' }} source={{ uri: this.state.userWalletData?.wallets?.[0]?.addressQR }}></Image>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <View style={{ width: '90%' }}>
                                            <BadgeComponent onPress={(data) => { this.copyToClipBord(data) }} item={this.state.userWalletData?.wallets?.[0]?.address} isIcon={false} background={Colors.light_tran} textSize={14} style={{ paddingLeft: 10, paddingRight: 10 }}></BadgeComponent>
                                        </View>
                                    </View>
                                    <Button
                                        title="Click To Close Modal"
                                        onPress={() => {
                                            this.setShowModal({ data: false, type: 'sp' });
                                        }}
                                    />
                                </View>
                            </View>
                        </Modal>
                    }
                </MainLayout>
                {this.state?.passModal &&
                    <SecuredWalletComponent isConfirmModal={false} title={(this.state?.type==='log')?"Enter password":"Create Password"}  dataCallBack={(data: any) => { this.callBackPassword(data) }} modelVisible={true} onPressNum={(data: any) => { this.onPressPassworddNum(data) }} disablePad={this.state.disableNumPad} onCloseModal={(data) => { this.setState({ passModal: false }); this.setState({ disableNumPad: false }) }}></SecuredWalletComponent>
                }
                {this.state?.confirmPass &&
                    <SecuredWalletComponent isConfirmModal={true} confirmData={this?.state?.authPassword} title={"Confirm password"} dataCallBack={(data: any) => { this.callBackOnConfirm(data) }} modelVisible={true} onPressNum={(data: any) => { this.onPressPassworddNum(data) }} disablePad={this.state.disableNumPad} onCloseModal={(data) => { this.setState({ passModal: false }); this.setState({ disableNumPad: false }) }}></SecuredWalletComponent>
                }
                {this.state?.showTransferModal &&
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={this.state?.showTransferModal}
                    >
                        <View style={styles.Container}>
                            <View style={{ marginTop: 65 }}>
                                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 20 }}>
                                    <View style={{}}>
                                        <TouchableOpacity onPress={() => { this.setShowModal({ data: false, type: 'mn', transferType: 'Spending' }); }} style={{ marginLeft: 10, borderWidth: 1, width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderColor: 'white' }}>
                                            <Ionicons name="ios-arrow-back" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto', position: 'relative', left: -20 }}>
                                        <Text style={{ color: Colors.white, fontSize: Colors.FontSize.f20 }}>Transfer</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.modal}>
                                <View style={{ marginTop: 25, width: '100%' }}>
                                    <TransferComponent authPassword={this.state?.authPassword} ojbData={this.state.userWalletData?.wallets?.[0]} transferTypeFrom={this.state?.transferTypeFrom} transferTypeTo={this.state?.transferTypeTo} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                }
                {this.state?.showTransferModalExternal &&
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={this.state?.showTransferModalExternal}
                    >
                        <ScrollView keyboardShouldPersistTaps='handled' style={styles.Container}>
                            <View style={{ marginTop: 65 }}>
                                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 20 }}>
                                    <View style={{}}>
                                        <TouchableOpacity onPress={() => { this.setShowModal({ data: false, type: 'mn', transferType: 'Wallet' }); }} style={{ marginLeft: 10, borderWidth: 1, width: 30, height: 30, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderColor: 'white' }}>
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
                                        <View style={{ marginBottom: 20 }}>
                                            <Text style={[Theming.pTagWhite]}>Select Coin</Text>
                                            <Dropdown dropDownItemStyle={{ width: '93.1%', left: '2.9%' }} label="Select Asset" containerstyle={{ width: '100%', height: 60, paddingLeft: 0, paddinRight: 10, borderRadius: 10, backgroundColor: Colors.white }} style={{ width: '100%', margingLeft: 'auto', marginRight: 'auto', height: 60, borderRadius: 10, backgroundColor: Colors.lightest_crystal_blue }} data={this.state?.obbjCoinData} onSelect={(data: any) => { this.onSelectCoin(data) }}></Dropdown>
                                        </View>
                                        <View>
                                            <Text style={[Theming.pTagWhite]}>To Address</Text>
                                            <InputComponent
                                                attrName='address'
                                                title=""
                                                value={this.state?.address}
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
                                                placeholder={"Enter To Address"}
                                                placeholderColor={Colors.lightest_primary_color}
                                                keyboardType="default"
                                            />
                                        </View>
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
                                        </View>
                                        <Text style={[Theming.pTagWhite, { marginBottom: 10 }]}>Avaliable Amount : {(this.state?.selectedCoin?.amount) ? this.state?.selectedCoin?.amount : 0}</Text>
                                        <ButtonComponent title={this.state?.buttonSiubmit?.label} isDisabled={this.state?.buttonSiubmit?.isDisable} onPressCall={() => { this.initiateExytrenalTransfer() }} buttonTextStyle={{ fontSize: 18 }}></ButtonComponent>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                }
            </>
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
    ContainerHalf: {
        flex: 1,
        backgroundColor: Colors.primary_color,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        minHeight: 400
    },
    modalHalf: {
        alignItems: 'center',
        bottom: 0,
        left: 0,
        minHeight: '100%',
        backgroundColor: Colors.white,
        width: '100%',
    },
    WebViewcontainer: {
        height: Dimensions.get('window').height,
        width: '100%',
        paddingTop: 0,
    },
});