import { Component } from "react";
import MainLayout from "../Layout/Index";
import WebView from "react-native-webview";
import { StyleSheet, Text } from "react-native";
import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import { CommonHelper } from "../utilty/CommonHelper";
import { Constant } from "../utilty/Constant";
import { View } from "react-native";
import ServerErrorMessage from "../components/Common/ServerErrorMessage";

export default class StaticSCreen extends Component<{}>{
    webViewData:any=null;
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            token: null,
            url:'',
            isWebViewBackEnable:false,
            webViewStateData:{},
            httpError:false
        }
        
    }
    componentDidMount() {
        this.setState({ loader: true })
        this.props.navigation.addListener('focus', () => {
            if(this.state.httpError){
                setTimeout(() => {
                    this.setState({url:CommonHelper.returnWebViewUrl(this.state?.token)});
                }, 500)
            }
            //this.setState({url:CommonHelper.returnWebViewUrl(this.state?.token)});
        });
        CommonHelper.getData('user').then((user) => {
            if (user?.token) {
                this.setState({ token: user?.token });
                this.setState({ loader: false })
                this.setState({url:CommonHelper.returnWebViewUrl(this.state?.token)});
            }
        })
        
       
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
            <MainLayout isWebViewBackEnable={this.state?.isWebViewBackEnable} loaderVisible={this.state?.loader} scrollEnable={false} onBackCallback={()=>{this.onBackHistory()}}>
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
                        if(state.url?.includes(Constant.check_static_market_place_url)){
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
            </MainLayout>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: '100%',
        paddingTop:100
    },
});