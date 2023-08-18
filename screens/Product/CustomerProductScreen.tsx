import { Component, Key } from "react";
import MainLayout from "../../Layout/Index";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../utilty/Colors";
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import Theming from "../../utilty/styling/theming";
import CardComponent from "../../components/Common/CardComponent";
import { connect } from "react-redux";
import WebView from "react-native-webview";
import Constants  from 'expo-constants';
import { CommonHelper } from "../../utilty/CommonHelper";
import { Constant } from "../../utilty/Constant";
import ServerErrorMessage from "../../components/Common/ServerErrorMessage";

class CustomerProductScreen extends Component<{}> {
    webViewData:any=null;
    state = {
        selectedIndex: '',
        selectedIndeBuy: 0,
        productData: {},
        loader: true,
        selectedPrice: {},
        allCategory: [],
        url:'',
        token:null,
        webViewStateData:{},
        isWebViewBackEnable:true,
        httpError:false
    }
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }
    handleSelectIndex(index) {
        this.setState({ selectedIndex: index });
    }
    handleSelectIndexBuy(index) {
        this.setState({ selectedIndeBuy: index });
    }
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if(this.state.httpError){
                setTimeout(() => {
                    this.setState({ url: CommonHelper.returnWebViewMarketPlace(this.state?.token) });
                }, 500)
            }
            //this.getCustomerProduct();
            //this.setState({url:CommonHelper.returnWebViewNft(this.state?.token)});
        });
        CommonHelper.getData('user').then((user) => {
            if (user?.token) {
                this.setState({ token: user?.token });
                this.setState({ loader: false })
                this.setState({url:CommonHelper.returnWebViewNft(this.state?.token)});
            }
        })
       //this.getCustomerProduct();
    }
    getCustomerProduct(){
        this.setState({ loader: true });
        CommonApiRequest.customerProduct({}).then((response) => {
            if (response?.success) {
                this.setState({ selectedIndex: response?.data?.[0]?.category });
                response?.data?.forEach((entry) => {
                    if (!this.state.allCategory?.find(item => item.label === entry?.category)) {
                        this.state.allCategory.push({ label: entry?.category, value: entry?.category });
                        this.setState({ allCategory: this.state.allCategory });
                    }
                });
                this.setState({ productData: response?.data })
                this.setState({ loader: false });
            } else {
                this.setState({ productData: [] })
            }
        });
    }
    setSelected(ele) {
    }
    onBackHistory(){
        if(this.state.webViewStateData?.canGoBack){
            console.log('True')
            this.setState({isWebViewBackEnable:true});
            this?.webViewData?.goBack();
        } else {
            console.log('False')
            this.setState({isWebViewBackEnable:false});
            //this.props?.navigation?.goBack(-1);
        }
    }
    render() {
        return (
            <MainLayout isWebViewBackEnable={this.state?.isWebViewBackEnable} loaderVisible={this.state.loader} scrollEnable={false} onBackCallback={()=>{this.onBackHistory()}}>
                {this.state?.url && !this.state?.httpError &&
                    <WebView
                        ref={(viewData)=>{this.webViewData=viewData}}
                        originWhitelist={['*']}
                        style={styles.container}
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
                            this.setState({webViewStateData:state});
                            if(state.url?.includes(Constant.check_customer_market_place_url)){
                                this.setState({ isWebViewBackEnable: false });
                            } else {
                                this.setState({ isWebViewBackEnable: true });
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
                {/* <View style={{ justifyContent: 'center', marginBottom: 20, alignItems: 'center', width: '100%', borderRadius: 12, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    
                </View>
                <View style={{ height: '100%', flex: 1 }}>
                    <View style={[Theming.cardContainer,{height:'100%'}]}>
                        {this.state.productData?.[0] && this.state?.productData?.map((item: any, index: Key) => {
                            return (
                                <CardComponent key={index + '_ card'} item={item} navigation={this.props?.navigation} isBuyButton={false}></CardComponent>
                            );
                        })}
                        {!this.state.productData?.[0] &&
                            <View style={{ width:'100%',minHeight:500,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{ color:Colors.white,fontSize:20 }}>No Recod Found!</Text>
                            </View>
                        }

                    </View>
                </View> */}
            </MainLayout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height-90,
        width: '100%',
        paddingTop:0
    },
});
const mapStateToState = state => ({
    user: state.errors,
})
export default connect(mapStateToState, null)(CustomerProductScreen)