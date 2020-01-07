import axios from 'axios'
import md5 from 'js-md5';

let Base64 = require('js-base64').Base64;

// 服务器地址
const beforeUrl = "https://fd.fangsk.com/api/";
const publicKey = "123456";

// http request 拦截器（所有发送的请求都要从这儿过一次），通过这个，我们就可以把token传到后台，我这里是使用sessionStorage来存储token等权限信息和用户信息，若要使用cookie可以自己封装一个函数并import便可使用
axios.interceptors.request.use(
    config => {
        //设置跨域头部,虽然很多浏览器默认都是使用json传数据，但咱要考虑IE浏览器。
        config.headers = {
            // 'Content-Type':'application/json' 
            'Content-Type':'application/x-www-form-urlencoded'
        };
         // 拼接URL
        config.url = beforeUrl + config.url;

        config.data = md5(Base64.encode(config.data));
        return config;
    },
    err => {
        return;
    }
);

// http response 服务器响应拦截器
axios.interceptors.response.use(
    response => {
        // Loading.close();    /* 移除loading */
        return response;
    },
    error => {
        // Loading.close();    /* 移除loading */
        return  Promise.reject(error);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
      axios.get(url,{
          params:params
      })
      .then(response => {
          resolve(response.data);
      })
      .catch(err => {
          reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data).then(response => {
          resolve(response.data);
      },err => {
          reject(err)
      })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}