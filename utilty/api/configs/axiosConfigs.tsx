import axios, { AxiosError, AxiosResponse } from "axios"
import { CommonHelper } from "../../CommonHelper"
import store from "../../../store";
import { error_406 } from "../../../store/modules/error/actions";
import { DeviceEventEmitter } from "react-native";
import { Constant } from "../../Constant";
import Constants from 'expo-constants';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://smartsteps.shop/core/api/v1',
})


api.interceptors.request.use(async (config) => {
  const token = await CommonHelper.getData('user');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token?.token;
  }
  if(Constants?.manifest?.version){
    config.headers['X-APP-VERSION'] = Constants?.manifest?.version;
  }
  api.defaults.headers.common['Content-Type'] = 'application/json';
  return config;
},
error => {
  error;
});
api.interceptors.response.use(
  async (response:AxiosResponse) => {
    console.log(response?.data)
    return response
  },
  (error:AxiosError)=> {
    return errorHandler(error);
  }
)
// defining a custom error handler for all APIs
const errorHandler = (error:any) => {
  
  const statusCode = error.response?.status;
  //HandlerErrorAny(error.response);
  // logging only errors that are not 401
  console.log(statusCode);
  if (statusCode && statusCode === 406) {
    if(error?.response?.data?.error?.detail?.includes("No User found")){
      DeviceEventEmitter.emit(Constant.LOGOUT_EVENT,{data:'logout'});
    }
    if(error.response?.config?.baseURL+error?.response?.config?.url==error.response?.request?.responseURL){
      alert(error?.response?.data?.error?.detail)
      return Promise.reject(statusCode)
    } else {
      alert(error?.response?.data?.error?.detail)
    }
    
    //throw error;
    //return Promise.reject(error?.response?.data?.error?.detail)
  }
  if (statusCode && statusCode === 401) {
    console.log(statusCode);
    DeviceEventEmitter.emit(Constant.LOGOUT_EVENT,{data:'logout'});
    //store.dispatch(error_406('All Error Will visible here'));
    //store.dispatch(setErrors("Inavlid data"));
    //throw error;

    //return Promise.reject(error?.response?.data?.error?.detail)
  }
//  return Promise.reject(error)
}

// registering the before request interceptor
// "api" axios instance
