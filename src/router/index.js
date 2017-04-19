import Vue from 'vue'
import Router from 'vue-router'
import {myRoute} from './myRoute'

import Main from '@/pages/Main'
import Login from '@/pages/Login'

Vue.use(Router)
var routes = [{
	path: '/',
	component:Main,
	children: myRoute
  },{
	path:'/login',
	name: 'login',
	component: Login
}]

const router = new Router({
  linkActiveClass: 'active',
  routes: routes
});


export default router;
