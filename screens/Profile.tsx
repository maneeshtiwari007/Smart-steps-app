import React, { Component } from "react";
import WebView from "react-native-webview";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { CommonHelper } from "../utilty/CommonHelper";
import MainLayout from "../Layout/Index";
import { Constant } from "../utilty/Constant";
import ServerErrorMessage from "../components/Common/ServerErrorMessage";

export default class Profile extends Component<{}>{
    webViewRef: any = null;
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            loader: false,
            isWebViewBackEnable: false,
            webViewStateData: {},
            token:'',
            httpError:false
        }
    }
    async componentDidMount() {
        
        const user = await CommonHelper.getData('user');
        if (user?.token) {
            console.log(CommonHelper.returnWebViewProfile(user?.token));
            this.setState({ url: CommonHelper.returnWebViewProfile(user?.token) });
        }
    }
    setHomeScreenAgain() {
        this?.webViewRef?.goBack();
    }
    logoutUser() {
        Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        
                        this.setState({ url: CommonHelper.returnWebViewProfile(this.state?.token) });
                        return null;
                    },
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        CommonHelper.removeData('user');
                        this.props.navigation.replace('Auth');
                    },
                },
            ],
            { cancelable: false },
        );
    }
    render() {
        return (
            <MainLayout isModal={true} isWebViewBackEnable={this.state?.isWebViewBackEnable} style={{}} extraHeaderStyle={{}} scrollEnable={false} loaderVisible={this.state?.loader} colorsType={'liniarColorHome'} onBackCallback={() => { this.setHomeScreenAgain() }}>
                {this.state?.url && !this.state?.httpError &&
                    <WebView
                        ref={(webViewRefData) => { this.webViewRef = webViewRefData }}
                        originWhitelist={['*']}
                        style={styles.WebViewcontainer}
                        source={{ uri: this.state?.url }}
                        onLoadStart={() => {
                            this.setState({ loader: true })
                        }}
                        onLoadEnd={() => {
                            this.setState({ loader: false })
                        }}
                        onLoad={() => {
                            this.setState({ loader: false })
                        }}
                        bounces={false}
                        sharedCookiesEnabled={true}
                        mixedContentMode='always'
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onNavigationStateChange={(state: any) => {
                            this.setState({ webViewStateData: state });
                            if (state.url === Constant.check_profile_url) {
                                this.setState({ isWebViewBackEnable: false });
                            } else {
                                this.setState({ isWebViewBackEnable: false });
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
            </MainLayout>
        )
    }
}
const styles = StyleSheet.create({
    WebViewcontainer: {
        height: Dimensions.get('window').height,
        width: '100%',
        paddingTop: 100,
    },
});