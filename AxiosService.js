import axios from 'axios';
import {Message, Loading} from "element-ui";
import qs from 'qs';

const ConfigBaseURL = "https://pigtest.xinshiguangbaohe.com/";
let loadingInstace = null;

//axios 实例
export const axiosService = axios.create({
  timeout: 7000,//请求超时时间
  baseURL: ConfigBaseURL,
  withCredentials: false,
});
axiosService.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
//添加请求拦截器
axiosService.interceptors.request.use(config => {
  if (config.method == "post") {
    if (config.headers['Content-Type'] != 'multipart/form-data') {
      config.data = qs.stringify(config.data);
    }
  }

  loadingInstace = Loading.service({
    lock: true,
    text: 'loading....'
  });
  return config
})
;
//添加响应拦截器
axiosService.interceptors.response.use(response => {
  loadingInstace.close();
  return response.data;
}, error => {
  console.log('TCL: error', error);
  const msg = error.Message !== undefined ? error.Message : '';
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  });
  loadingInstace.close();
  return Promise.reject(error)
});
export default {
  axiosService
}
