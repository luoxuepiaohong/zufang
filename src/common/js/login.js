import axios from 'axios'
import {post,fetch,patch,put} from '@/common/js/http.js'
//登陆
//获取Appid
var uid =getCookie('uid');
console.log(uid)
if(!uid){
  if(IsWeiXin()){//微信环境
      axios.post("login/getAppid").then(res=>{
      wxLogin(res.data.data);
    })
  }else{//普通登录

  }
  
}
//微信登录
var local_url=window.location.href; //保存当前页面路径
function wxLogin(appId) {
  var appId = appId;
  var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(local_url) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  var code = getUrlParam("code");
  if (!code) {
    window.location = url;
  } else {
    var params={};
    params.code = code;
    axios.post('login/login',{"data":params}).then(res=>{
      //存储用户信息
      setCookie('uid',res.data.data.uid,3);
      setCookie('openid',res.data.data.openid);
      //截取
      local_url=local_url.split('/?');
      window.location.replace(local_url[0]);
    });
  }
}
 /**
 * 判断是否是微信环境
 */
function IsWeiXin () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false;
};
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
//设置缓存
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
//获取缓存
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
    }
//删除缓存
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


