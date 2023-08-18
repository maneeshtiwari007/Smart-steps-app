import React, { Component } from "react";
import WebView from "react-native-webview";
import { Dimensions, StyleSheet } from "react-native";
import { CommonHelper } from "../utilty/CommonHelper";
import MainLayout from "../Layout/Index";
import ServerErrorMessage from "../components/Common/ServerErrorMessage";

export default class Suport extends Component<{}>{
    webViewRef:any=null;
    constructor(props){
        super(props);
        this.state = {
            url:'',
            loader:false,
            isWebViewBackEnable:false,
            httpError:false
        }
    }
    async componentDidMount() {
        const user = await CommonHelper.getData('user');
        if (user?.token) {
            this.setState({ url: CommonHelper.returnWebViewSupport(user?.token) });
        }
    }
    setHomeScreenAgain(){
        this?.webViewRef?.goBack();
    }
    render() {
        return (
            <MainLayout isModal={true} isWebViewBackEnable={this.state.isWebViewBackEnable} style={{}} extraHeaderStyle={{}} scrollEnable={false} loaderVisible={this.state?.loader} colorsType={'liniarColorHome'} onBackCallback={()=>{this.setHomeScreenAgain()}}>
            {this.state?.url  && !this.state?.httpError &&
                <WebView
                    ref={(webViewRefData)=>{this.webViewRef=webViewRefData}}
                    originWhitelist={['*']}
                    style={styles.WebViewcontainer}
                    source={{ uri: this.state?.url }}
                    onLoadStart={() => {
                        this.setState({ loader: false })
                    }}
                    onLoadEnd={() => {
                        this.setState({ loader: false })
                    }}
                    bounces={false}
                    sharedCookiesEnabled={true}
                    mixedContentMode='always'
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
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
    WebViewcontainer: {
        height: Dimensions.get('window').height,
        width: '100%',
        paddingTop: 100
    },
});