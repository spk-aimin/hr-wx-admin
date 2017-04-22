<template>
	<div id= "add-user">
		 <div class="el-breadcrumb">
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">用户管理</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span> 
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">用户列表</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span>
		 </div>
<!-- 		<div class="form-inline margin-top-t">
			  <div class="form-group">
			    <label>用户名</label>
			    <input type="text" class="form-control" placeholder="用户名">
			  </div>
			  <div class="form-group">
			    <label>姓名</label>
			    <input type="text" class="form-control" placeholder="姓名">
			  </div>
			   <div class="form-group">
			    <label>手机号</label>
			    <input type="text" class="form-control" placeholder="手机号">
			  </div>
			  <el-button type="primary">查询</el-button>
			  <el-button>重置</el-button>
		</div> -->
		<div class="row margin-top-t">
			<div class="col-md-12">
				<el-button type="primary" size="small" @click="addUser">添加</el-button>
	<!-- 			<el-button type="primary" size="small">启用</el-button>
				<el-button type="danger" size="small">停用</el-button>
				<el-button type="danger" size="small">删除</el-button> -->
			</div>
		</div>

		<!--列表数据-->
		<table class="table margin-top-t table-bordered">
			<thead>
				<tr class="th">
					<!-- <th><el-checkbox>全选</el-checkbox></th> -->
					<th>用户名</th>
					<th>角色</th>
					<th>密码</th>
			<!-- 		<th>姓名</th>
					<th>角色</th>
					<th>手机号</th>
					<th>邮箱</th> -->
					<th>创建时间</th>
					<th style="width:25%">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in listResult">
					<!-- <td><el-checkbox></el-checkbox></td> -->
					<td>{{item.name}}</td>
					<td>{{item.private_ | userType}}</td>
					<td>{{item.password}}</td>
					<td>{{item.createTime}}</td>
					<td>
					  <!-- <el-button type="primary" size="small">修改</el-button> -->	
		<!-- 			  <el-button type="primary" size="small">启用</el-button>
					  <el-button type="danger" size="small">停用</el-button> -->
					  <el-button type="danger" size="small" @click="delUser(item)">删除</el-button>
				    </td>
				</tr>
			</tbody>
		</table>
<!-- 		<div class="page-cli">
		  <el-pagination ref ="pageN" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="100" layout="total, prev, pager, next" :total="1000"></el-pagination>
        </div> -->

        <!--添加用户-->
		<el-dialog title="添加用户" ref="add" size="small">
			  <div class="form-horizontal">
				  <div class="form-group">
				    <label class="col-sm-3 control-label">用户名</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="用户名">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">姓名</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="用户名">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">角色</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="角色">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">手机号码</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="手机号码">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">邮箱</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="邮箱">
				    </div>
				  </div>
				 <div class="form-group">
				    <label class="col-sm-3 control-label">状态</label>
				    <div class="col-sm-8">
				      <el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				    </div>
				  </div>
		      </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button>取 消</el-button>
			    <el-button type="primary">确 定</el-button>
			  </span>
		</el-dialog>
		<!--添加用户精简版-->
		<el-dialog title="添加用户" ref="addUser" size="small">
			  <div class="form-horizontal">
				  <div class="form-group">
				    <label class="col-sm-3 control-label">用户名</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" v-model="userParam.username" placeholder="用户名">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">姓名</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" v-model="userParam.realname"  placeholder="用户名">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">密码</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" v-model="userParam.password" placeholder="密码">
				    </div>
				  </div>
				  </div>
			    <span slot="footer" class="dialog-footer">
			      <el-button type="primary" @click="saveUser()">确 定</el-button>
				  <el-button @click="closeModelUser()">取 消</el-button>
			  </span>
			</el-dialog>
	</div>
</template>
<script>
    import {apiService,userInfo} from "@/api"
	export default {
		data(){
			return {
				pageNum: 1,
				options: [],
				value:"",
				userTpes: [{value: 1, label: '管理员'}, {value: 2, label: '普通用户'}],
				userParam: {},
				listResult: []
			}
		},
		methods: {
			handleSizeChange(val){

			},
			handleCurrentChange(val){

			},
			addUser(){
				var vm = this;
				vm.$refs.addUser.open();
			},
			closeModelUser(){
				var vm = this;
				vm.$refs.addUser.close();
			},
			saveUser(){
				var vm= this;
				if(vm.$myIsEmpty(vm.userParam.username)){
					vm.$myAlert.show('请输入用户名', 'error');
					return;
				}
				if(vm.$myIsEmpty(vm.userParam.realname)){
					vm.$myAlert.show('请输入姓名', 'error');
					return;
				}
				if(vm.$myIsEmpty(vm.userParam.password)){
					vm.$myAlert.show('请输入密码', 'error');
					return;
				}

				apiService.requestGet('admin/addUser', vm.userParam).then(function(res){
					vm.$myAlert.show('操作成功', 'success');
					vm.userParam={};
					vm.getUsers();
					vm.$refs.addUser.close();
				},function(res){
					vm.$myAlert.show('操作失败', 'error');
				});
			},
			getUsers(){
				var vm = this;
				apiService.requestGet('admin/getAllUser').then(function(res){
					vm.listResult = res.data;

				},function(res){

				})
			},
			delUser(obj) {
				var vm = this;
				apiService.requestGet('admin/deleteUser', {userid: obj.id}).then(function(res){
					vm.$myAlert.show('操作成功', 'success');
					vm.getUsers();

				},function(res){
					vm.$myAlert.show('操作失败', 'error');
				})
			}
		},
		created() {
			var vm = this;
			vm.getUsers();
		},
		filters:{
			userType(val){
				return {0: '管理员', 1: '普通用户'}[val]
			}
		}
	}
</script>
<style lang="scss">
	#add-user{
		.el-select{
			width: 100%;
		}
	}
</style>