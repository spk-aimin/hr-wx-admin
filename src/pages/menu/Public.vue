<template>
	<div id= "menu-public">
		 <div class="el-breadcrumb">
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">菜单管理</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span> 
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">公共菜单</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span>
		 </div>
	<!-- 	<div class="form-inline margin-top-t">
			  <div class="form-group">
			    <label>名称:</label>
			    <input type="text" class="form-control" placeholder="用户名">
			  </div>
			  <div class="form-group">
			    <label>类型:</label>
			     <el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in menuTypes"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				 </el-select>
			  </div>
			  <el-button type="primary">查询</el-button>
			  <el-button>重置</el-button>
		</div> -->
		<div class="row margin-top-t">
			<div class="col-md-12">
				<!-- <el-button type="primary" size="small" @click="editMenuOpen('add')">添加</el-button> -->
			<!-- 	<el-button type="primary" size="small">查看微信菜单</el-button>
				<el-button type="danger" size="small">创建微信菜单</el-button>
				<el-button type="danger" size="small">删除</el-button> -->
			</div>
		</div>
		<!--列表数据-->
		<table class="table margin-top-t table-bordered">
			<thead>
				<tr class="th">
					<!-- <th width="5%"><el-checkbox>全选</el-checkbox></th> -->
					<th>名称</th>
					<th>类型</th>
					<th>键值</th>
					<th>链接</th>
					<th>创建时间</th>
					<th style="width:25%">操作</th>
				</tr>
			</thead>
			<tbody>
			   <template v-for="item in listData">
					<tr>
						<!-- <td><el-checkbox></el-checkbox></td> -->
						<td>{{item.name}}</td>
						<td></td>
						<td>{{item.key}}</td>
						<td></td>
						<td></td>
						<td>
					    </td>
					</tr>
					<template v-for="ctem in item.child">
						<tr>
							<!-- <td><el-checkbox></el-checkbox></td> -->
								<td>>>>>{{ctem.name}}</td>
								<td>{{ctem.type | btnType}}</td>
								<td>{{ctem.key}}</td>
								<td>{{ctem.url}}</td>
								<td>{{ctem.createTime}}</td>
								<td>
								  <el-button type="primary" size="small" @click="useMenufunc(1, ctem)" v-if="ctem.forbidden == 0">启用</el-button>	
								  <el-button type="primary" size="small" @click="editMenuOpen('edit', ctem)">修改</el-button>
								  <el-button type="danger" size="small" @click="useMenufunc(0, ctem)" v-if="ctem.forbidden ==1">禁用</el-button>
						<!-- 		  <el-button type="danger" size="small">删除</el-button> -->
							    </td>
							</tr>
					</template>
				</template>
			</tbody>
		</table>
		<!--分页-->
	<!-- 	<div class="page-cli">
		  <el-pagination ref ="pageN" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="100" layout="total, prev, pager, next" :total="1000"></el-pagination>
        </div> -->

        <!--添加用户-->
		<el-dialog :title="mTitle" ref="add" size="small">
			  <div class="form-horizontal">
				  <div class="form-group">
				    <label class="col-sm-3 control-label">名称</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" v-model="editorParam.name" placeholder="名称">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">类型</label>
				    <div class="col-sm-8">
					  <select class="form-control" v-model="editorParam.type">
					  	<option v-for="item in menuTypes" :value="item.value">{{item.label}}</option>
					  </select>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">链接</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" v-model="editorParam.url" placeholder="链接">
				    </div>
				  </div>
		      </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="saveMenu()">确 定</el-button>
			    <el-button @click="cancelMenu()">取 消</el-button>
			  </span>
		</el-dialog>
	</div>
</template>
<script>
    import {apiService,userInfo} from "@/api"
	export default {
		data(){
			return {
				value:"",
				pageNum: 1,
				menuTypes: [{label:'VIEW', value: '1'},{label:'CLICK', value: '2'}],
				listData: [],
				editorType:"",
				editorParam: {
					type: 1
				},
				mTitle: "添加公共菜单"
			}
		},
		methods: {
			handleSizeChange(val){

			},
			handleCurrentChange(val){

			},
			editMenuOpen(type, item){
				var vm = this;
				vm.editorType = type;
				if(type=="edit"){
					vm.mTitle = '修改公共菜单';
					vm.editorParam= {
					    "id": item.id,
					    "name": item.name,
					    "weixinId": item.weixinId,
					    "createTime": item.createTime,
					    "updataTime": item.updataTime,
					    "type": item.type,
					    "url": item.url,
					    "key": item.key,
					    "parentId": item.parentId,
					    "forbidden": item.forbidden
					}
				}else{
					vm.mTitle = '添加公共菜单';
					vm.editorParam = {};
				}
				vm.$refs.add.open();
			},
			useMenufunc(type, item){//启用与禁用
				var vm = this;
				var param = {
					    "id": item.id,
					    "name": item.name,
					    "weixinId": item.weixinId,
					    "createTime": item.createTime,
					    "updataTime": item.updataTime,
					    "type": item.type,
					    "url": item.url,
					    "key": item.key,
					    "parentId": item.parentId,
					    "forbidden": type
					}
				   apiService.requestPost('admin/modifyMenu', param).then(function(res){
						vm.$myAlert.show('操作成功', 'success');
						vm.getAllMenu();
						vm.$refs.add.close();
					}, function(res){
						vm.$myAlert.show('操作失败', 'error');
					});
			},
			getAllMenu(){//获取所有列表
				var vm =this;
				apiService.requestGet('admin/getAllMenu').then(function(res){
					vm.listData = res.data;
				}, function(res){
					vm.$myAlert.show('请输数据失败', 'error');
				});
			},
			saveMenu(){
				var vm = this;
				if(vm.editorType == 'edit'){
					apiService.requestPost('admin/modifyMenu', vm.editorParam).then(function(res){
						vm.$myAlert.show('操作成功', 'success');
						vm.getAllMenu();
						vm.$refs.add.close();
					}, function(res){
						vm.$myAlert.show('操作失败', 'error');
					});
				}else {

				}
			},
			cancelMenu(){
				var vm =this;
				vm.$refs.add.close();
			}
		},
		created(){
			var vm = this;
			vm.getAllMenu();
		},
		filters: {
			btnType(val){
				return {1: 'VIEW', 2: 'CLICK'}[val];
			}
		}
	}
</script>
<style lang="scss">
	#menu-public{
		.el-select{
			width: 100%;
		}
	}
</style>