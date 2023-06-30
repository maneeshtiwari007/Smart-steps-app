import { Component } from "react";
import MainLayout from "../Layout/Index";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Dimensions } from "react-native";
import { CommonHelper } from "../utilty/CommonHelper";

export default class StaticSCreen extends Component<{}>{
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            token: null
        }
        
    }
    componentDidMount() {
        this.setState({ loader: true })
        CommonHelper.getData('user').then((user) => {
            if (user?.token) {
                this.setState({ token: user?.token });
                this.setState({ loader: false })
            }
        })
    }
    render() {
        return (
            <MainLayout loaderVisible={this.state?.loader} scrollEnable={false}>
                <WebView
                    originWhitelist={['*']}
                    style={styles.container}
                    source={{ uri: CommonHelper.returnWebViewUrl(this.state?.token) }}
                    onLoadStart={()=>{
                        this.setState({ loader: true })
                    }}
                    onLoadEnd={()=>{
                        this.setState({ loader: false })
                    }}
                />
            </MainLayout>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height-(Constants.statusBarHeight+135),
        width: '100%',
        paddingTop:100
    },
});