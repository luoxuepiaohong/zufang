// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入vue路由组件
import router from './router'

// 引入 Vant UI
import Vant from 'vant';
import 'vant/lib/index.css';


// 引入图标库iconfont
import '@/common/font/iconfont/iconfont.css'

// 引入mock.js
require('./mock/mock.js')

Vue.use(Vant);

//引入axios
import axios from 'axios'
import {post,fetch,patch,put} from '@/common/js/http.js'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
//引入登录
import login from '@/common/js/login.js'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  	// el: '#app',
  	router,
  	// components: { App },
  	// template: '<App/>'
  	render: h => h(App)
}).$mount('#app');