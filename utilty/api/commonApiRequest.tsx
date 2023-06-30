import store from "../../store";
import { wallet_data, wallet_data_status } from "../../store/modules/wallet/actions";
import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"
export const CommonApiRequest = {
    registerCustomer: async function (params:any, cancel = false) {
        const response:any = await api.request({
          url: `/Auth/register`,
          method: "POST",
          data:params,
          // retrieving the signal value by using the property name
          signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
        })
        // returning the product returned by the API
        return response?.data
      },
    loginCustomer: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Auth/login`,
          method: "POST",
          data:params,
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    getProduct: async function (params:any, cancel = false) {
      const urlAdd = (params?.length)?params:''
      const response:any = await api.request({
          url: `/Store/products/`+urlAdd,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    checkWalletExists: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Wallet/exist`,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      if(response?.data){
        // store.dispatch(wallet_data_status(false));
        // store.dispatch(wallet_data(response?.data));
      }
      // returning the product returned by the API
      return response?.data
    },
    walletCreate: async function (params:any, cancel = false) {
      //store.dispatch(wallet_data_status(true));
      const response:any = await api.request({
          url: `/Wallet/create`,
          method: "POST",
          data:params,
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    walletView: async function (params:any, cancel = false) {
      //store.dispatch(wallet_data_status(true));
      const response:any = await api.request({
          url: `/Wallet/View`,
          method: "POST",
          data:params,
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    walletHistory: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Wallet/history/`+params,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    walletTraansfer: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Wallet/transfer`,
          method: "POST",
          data:params,
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    customerEvent: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Customer/event`,
          method: "POST",
          data:params,
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    customerProduct: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Customer/product`,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    customerGet: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Customer`,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    customerBuyProduct: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Customer/buy`,
          method: "POST",
          data:params,
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    storeProductCategory: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Store/category`,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
    sendOtp: async function (params:any, cancel = false) {
      const response:any = await api.request({
          url: `/Auth/otp/`+params,
          method: "GET",
        // retrieving the signal value by using the property name
        signal: cancel ? cancelApiObject['userLogin'].handleRequestCancellation().signal : undefined,
      })
      // returning the product returned by the API
      return response?.data
    },
}
const cancelApiObject = defineCancelApiObject(CommonApiRequest)