import axios from 'axios';
import {Loading, Message} from "element-ui";
import qs from 'qs';

// const ConfigBaseURL = "https://pig.xinshiguangbaohe.com/"; // 接口域名
const ConfigBaseURL = "http://pigtest.xiaozhuep.com/"; // 接口域名
const ServerURL = window.location.protocol + "//" + window.location.host;
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
  let s_id = localStorage.getItem('s_id');
  let laravelSid = localStorage.getItem('laravelSid');
  if (config.url != "/v2/login") {
    if (config.method == "get") {
      if (config.params != undefined) {
        config.params.sid = s_id;
        config.params.laravelSid = laravelSid;

      } else {
        config.params = {
          sid: s_id,
          laravelSid: laravelSid,
        };
      }
    } else if (config.method == "post") {
      if (config.data != undefined) {
        if (config.headers['Content-Type'] == 'multipart/form-data') {
          config.data.append("sid",s_id);
          config.data.append("laravelSid",laravelSid);
        } else {
          config.data.sid = s_id;
          config.data.laravelSid = laravelSid;
        }
      } else {
        config.data = {
          sid: s_id,
          laravelSid: laravelSid,
        };
      }
    }
  }

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
});
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
  axiosService,
  ConfigBaseURL,
}
