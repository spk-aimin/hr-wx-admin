<template>
	<div id="login">
			<hgroup>
		  <h1>华润微信后台管理</h1>
		</hgroup>
		<form class="form">
		  <div class="group">
		    <input type="text" v-model="userName"><span class="highlight"></span><span class="bar"></span>
		    <label v-if="!userName">用户名</label>
		  </div>
		  <div class="group">
		    <input type="password" v-model='password'><span class="highlight"></span><span class="bar"></span>
		    <label v-if='!password'>密码</label>
		  </div>
		  <button type="button" class="button buttonBlue" @click="login()">登录</button>
		</form>
	</div>
</template>
<script>
    import {apiService,userInfo} from "@/api"
	export default {
		data(){
			return {
				userName: "",
				password: ""
			}
		},
		methods: {
			login() {
				var vm =this;

				if(vm.userName==""){
					vm.$myAlert.show('请输入用户名', 'error');
					return;
				}
				if(vm.password== ""){
					vm.$myAlert.show('请输入密码', 'error');
					return;
				}
				apiService.requestForm('auth/login', {username: vm.userName, password: vm.password})
				.then(function(res){
					var uInfo = res.data?res.data: {};
					userInfo.setUserInfo(uInfo);
					if(res.data){
						userInfo.setUserName(vm.userName);
						userInfo.setPassword(vm.password);
						vm.$router.push('/');
					}
				}, function(res){
					uInfo = {};
				})
			}
		},
		created() {
		}
	}
</script>