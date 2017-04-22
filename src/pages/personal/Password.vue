<template>
	<div id= "personal-password">
		 <div class="el-breadcrumb">
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">个人中心</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span> 
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">修改密码</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span>
		 </div>
		 <div class="form">
		    <el-row>
		    	<el-col :span="24">
		    		<div class="title">修改密码</div>
		    	</el-col>
		    </el-row>
			<div class="form-horizontal">
				  <div class="form-group">
				    <label for="inputEmail3" class="col-sm-2 control-label">*原密码</label>
				    <div class="col-sm-7">
				      <input type="password" v-model= 'password.old' class="form-control"  placeholder="原密码">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputPassword3" class="col-sm-2 control-label">*新密码</label>
				    <div class="col-sm-7">
				      <input type="password" v-model='password.new1' class="form-control" placeholder="新密码">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputPassword3" class="col-sm-2 control-label">*确认新密码</label>
				    <div class="col-sm-7">
				      <input type="password" class="form-control" v-model='password.new2' placeholder="确认新密码">
				    </div>
				  </div>
				  <div class="form-group margin-btm-z">
				    <div class="col-sm-offset-2 col-sm-7">
				      <el-button type="primary" @click="save()">提交</el-button>
				      <el-button>重置</el-button>
				    </div>
				  </div>
			</div>
		 </div>

	</div>
</template>
<script>
import {apiService,userInfo} from "@/api"
 export default {
 	
 	data(){
 		return {
 			password: {
 				old: "",
 				new1: "",
 				new2: ""
 			}
 		}
 	},
 	methods: {
 		save(){
 			var vm  = this;
 			if(vm.$myIsEmpty(vm.password.old)){
 				vm.$myAlert.show('请输入原密码', 'error');
 				return;
 			}
 			if(vm.$myIsEmpty(vm.password.new1)){
 				vm.$myAlert.show('请输入新密码', 'error');
 				return;
 			}
 		   if(vm.$myIsEmpty(vm.password.new2)){
 				vm.$myAlert.show('请再次输入新密码', 'error');
 				return;
 			}
 			 if(vm.password.new1 != vm.password.new2){
 				vm.$myAlert.show('请确认两次输入的新密码一致', 'error');
 				return;
 			}
 			apiService.requestGet('admin/modifyPassword', {oldpassword: vm.password.old, newpassword: vm.password.new2})
 			.then (function(res){
 				vm.$myAlert.show('密码修改成功', 'success');
 			}, function(res){
 				vm.$myAlert.show('密码修改失败', 'error');
 			})
 		}
 	}
 }
</script>
<style lang="scss">
	#personal-password{
		.form {
			border: solid 1px #D3DCE6;
			margin-top: 20px;
			padding: 20px;
			.title {
				font-size: 16px;
				text-align: center;
				padding-bottom: 10px;
			}
		}
	}
</style>