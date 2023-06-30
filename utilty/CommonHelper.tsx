import AsyncStorage from "@react-native-async-storage/async-storage";

export const CommonHelper = {
    registerValidation: async function (params: any) {
        var emailValidation: boolean = false;
        var passwordValidation: boolean = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        var passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (reg.test(params?.email) !== false) {
            emailValidation = true;
        }
        if (passwordReg.test(params?.password) !== false) {
            passwordValidation = true;
        }
        return {
            email: emailValidation,
            password: passwordValidation,
            isValidated: (emailValidation && passwordValidation) ? true : false
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
        return "http://103.129.97.123:5001/SmartStep/login?token="+token;
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
    suStringText(mytextvar:string,maxlimit:number){
        console.log((mytextvar).length);
        console.log(maxlimit);
        console.log((mytextvar).substring(0,maxlimit-3));
       return ((mytextvar).length > maxlimit) ? 
        (((mytextvar).substring(0,maxlimit-3)) + '...') : 
        mytextvar
    }
}