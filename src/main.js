// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {userInfo, apiService} from '@/api'

import '@/components/element'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui';
import '@/plugin/myAlert'
Vue.use(ElementUI)
//let loadingInstance1 = Loading.service({ fullscreen: true });

Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
	var uInfo = userInfo.getUserInfo();
	var uName = userInfo.getUserName();
	var password = userInfo.getPassword();
	if(!uInfo.id){
		apiService.requestGet('auth/login', {username: uName, password: password})
		.then(function(res){
			uInfo = res.data;
			userInfo.setUserInfo(uInfo);
			if(to.path == "/login")
				next({path:"/"});
		}, function(res){
			uInfo = {};
		})
	}
	if(!uInfo.id && !uName && !password && to.path !='/login')
	  return next({path:'/login'})
	next();
});

/*请求拦截器*/
Vue.http.interceptors.push(function(request, next) {
  let loadingInstance1 = Loading.service({ fullscreen: true });
  next(function(response) {
  	loadingInstance1.close();
  });
})
/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
