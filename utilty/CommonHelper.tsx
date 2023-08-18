import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constant } from "./Constant";

export const CommonHelper = {
    registerValidation: async function (params: any) {
        var emailValidation: boolean = false;
        var passwordValidation: boolean = false;
        var confirmPasswordValidation: boolean = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        //var passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        var passwordReg = /(.|\s)*\S(.|\s)*/;
        if (params?.email!=="") {
            emailValidation = true;
        }
        if (passwordReg.test(params?.password) !== false) {
            passwordValidation = true;
        }
        if(params?.password === params?.confirm_password){
            confirmPasswordValidation=true;
        }
        return {
            email: emailValidation,
            password: passwordValidation,
            confirm_password:confirmPasswordValidation,
            isValidated: (emailValidation && passwordValidation && confirmPasswordValidation) ? true : false
        };
    },
    saveData: async function(key,value){
        await AsyncStorage.setItem(key,value);
    },
    removeData: async function(key){
        await AsyncStorage.removeItem(key);
    },
    getData: async function(key){
        const jsondata = await AsyncStorage.getItem(key);
        if(jsondata){
            return JSON.parse(jsondata);
        } else {
            return jsondata;
        }
    },
    returnWebViewUrl(token:any){
        return Constant.static_webview_url+token;
    },
    returnWebViewHomeUrl(token:any){
        return "http://103.129.97.123:5001/step.ashx?date="+token;
    },
    async formatBuyProductData(data:any,coin:any){
        return {
            products:[{
                code:data?.productCode,
                quantity:1
            }],
            token:coin?.label,
            paymentMethod:"CryptoCurrency"
        }
    },
    returnWebViewMarketPlace(token:any){
        return Constant.wallet_webview_url+token;
    },
    returnWebViewNft(token:any){
        return Constant.nft_webview_url+token;
    },
    returnWebViewWallet(authPass:string,token:any){
        console.log(token);
        return Constant.wallet_view_webview_url+authPass+'&token='+token;
    },
    returnWebViewSports(token:any){
        return Constant.sports_webview_url+token;
    },
    returnWebViewSupport(token:any){
        return Constant.suport_webview_url+token;
    },
    returnWebViewProfile(token:any){
        return Constant.profile_webview_url+token;
    }
}