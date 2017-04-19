import userinfo from './userinfo'
import Promise from 'promise'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

var BaseUrl = "/"
export class ApiService {
	construct(){

	}
	/**
	 *@dec Get方式请求接口
	 *@param url 请求地址
	 *@param params 请求参数
	 **/
	requestGet(url, params){
		var promise = new Promise((resolve, reject) => {
			Vue.http({ 
				   url: BaseUrl+url, 
				   params: params,
				   method: 'get'
			   }).then((rep)=>{
				if(rep.data.code == 0){
					resolve(rep.data);
				}else {
					reject(rep.data);
				}
			}, (rep)=>{
				reject(rep.data);
			}).catch((e) => {
				console.log("请求失败")
			});
		});
		return promise;
	}
	/**
	 *@dec Post方式请求接口
	 *@param url 请求地址
	 *@param params 请求参数
	 **/
	requestPost(url, params) {
		var promise = new Promise((resolve, reject) => {
			Vue.http({ 
				   url: BaseUrl+url, 
				   body: params,
				   method: 'post'
			   }).then((rep)=>{
				if(rep.data.code == 0){
					resolve(rep.data);
				}else {
					reject(rep.data);
				}
			}, (rep)=>{
				reject(rep.data);
			}).catch((e) => {
				console.log("请求失败")
			});
		});
		return promise;
	}
	/**
	 * @desc form表单提交方式 post
	 **/
   requestForm (url, params, method){
   	  method = method? method: 'post';
   	  var formData = new FormData();
   	  for(var item in params){
   	  	formData.append(item, params[item]);
   	  }
   	  var promise = new Promise((resolve, reject) => {
			Vue.http({ 
				   url: BaseUrl+url, 
				   body: formData,
				   method: method
			   }).then((rep)=>{
				if(rep.data.code == 0){
					resolve(rep.data);
				}else {
					reject(rep.data);
				}
			}, (rep)=>{
				reject(rep.data);
			}).catch((e) => {
				console.log("请求失败")
			});
		});
		return promise;

   }
}
export const apiService = new ApiService();
export const userInfo = userinfo;