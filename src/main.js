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

var expactRouter = ['user/add']

router.beforeEach((to, from, next)=>{
	var uInfo = userInfo.getUserInfo()?userInfo.getUserInfo():{};
	var uName = userInfo.getUserName();
	var password = userInfo.getPassword();
	if(!uInfo.id && uName && password){
		apiService.requestGet('auth/login', {username: uName, password: password})
		.then(function(res){
			uInfo = res.data;
			
			if(res.data){
				userInfo.setUserInfo(uInfo);
				if(to.path == "/login" || (uInfo.private_ == 1 && expactRouter.indexOf(to.path)> -1))
				  next({path:"/"});
				else
					next();
			}else {
				next({path: "/login"});
			}
		}, function(res){
			uInfo = {};
		})
	}else {
		if(!uInfo.id && !uName && !password && to.path !='/login')
		  return next({path:'/login'})
		if(uInfo.private_ == 1 && expactRouter.indexOf(to.path)> -1)
			return  next({path:"/"});
		next();
	}

});
var app;
/*请求拦截器*/
Vue.http.interceptors.push(function(request, next) {
  let loadingInstance1 = Loading.service({ fullscreen: true });
  next(function(response) {

  	loadingInstance1.close();
  	var data = response.data? response.data: {};
  	 if(data.code== undefined || data.code == 10001){
  	   userInfo.clearUser();
  	   app.$router.push('/login');
  	}
  	//vm.$router.push('/login')
  });
})
/* eslint-disable no-new */
app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
