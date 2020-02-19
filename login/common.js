
//请求头域名
var requestUrl="https://fd.fangsk.com/api/";
    $(function(){
        //登陆
        //获取Appid
        var openid =getCookie('openid');
        if(!openid){
          $.post(requestUrl+"login/getAppid",function(res){
            wxLogin(res.data);
          })
        }
        
        
    })
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
    var url=requestUrl+"/login/login";
    params.code = code;
    $.post(url, params, function (res) {
        console.log(res,'获取token')
    })
  }
}
  
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


