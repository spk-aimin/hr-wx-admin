<template>
	<div id= "content-news">
		 <div class="el-breadcrumb">
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">内容管理</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span> 
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">新闻管理</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span>
		 </div>
		<div class="form-inline margin-top-t">
			  <div class="form-group">
			    <label>标题:</label>
			    <input type="text" class="form-control" placeholder="标题" v-model="listParamApk.title">
			  </div>
			  <div class="form-group">
			    <label>菜单:</label>
			    <select class="form-control" v-model='listParamApk.itemid'>
			    	<option value="">请选择</option>
			    	<option v-for = "item in menus" :value="item.id">{{item.name}}</option>
			    </select>
			  </div>
			  <el-button type="primary" @click="searchBy()">查询</el-button>
			  <el-button @click="resetBy()">重置</el-button>
		</div>
		<div class="row margin-top-t">
			<div class="col-md-12">
				<el-button type="primary" size="small" @click="newContent()">新增</el-button>
				<!-- <el-button type="danger" size="small">删除</el-button> -->
			</div>
		</div>

		<!--列表数据-->
		<table class="table margin-top-t table-bordered">
			<thead>
				<tr class="th">
				<!-- 	<th><el-checkbox>全选</el-checkbox></th> -->
					<th>标题</th>
					<th>菜单</th>
					<th>发布时间</th>
					<th style="width:20%">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in listResult.articleList">
					<!-- <td><el-checkbox></el-checkbox></td> -->
					<td>{{item.title}}</td>
					<td>{{item.itemName}}</td>
					<td>{{item.createTime}}</td>
					<td>
					  <el-button type="primary" size="small" @click="editorContent(item)">修改</el-button>	
					  <el-button type="danger" @click='delContent(item)' size="small">删除</el-button>
				    </td>
				</tr>
			</tbody>
		</table>
		<div class="page-cli">
		  <el-pagination ref ="pageN" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listParamApk.page" :page-size="15" layout="total, prev, pager, next" :total="listResult.pagenum"></el-pagination>
        </div>

        <!--添加用户-->
	<!-- 	<el-dialog title="添加公共菜单" ref="add" size="small">
			  <div class="form-horizontal">
				  <div class="form-group">
				    <label class="col-sm-3 control-label">名称</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="名称">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">类型</label>
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

				  <div class="form-group">
				    <label class="col-sm-3 control-label">键值</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="键值">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-3 control-label">链接</label>
				    <div class="col-sm-8">
				      <input type="text" class="form-control" placeholder="角色">
				    </div>
				  </div>
		      </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button>取 消</el-button>
			    <el-button type="primary">确 定</el-button>
			  </span>
		</el-dialog> -->
	</div>
</template>
<script>
    import {apiService,userInfo} from "@/api"
	export default {
		data(){
			return {
				pageNum: 1,
				menus: [],
				value:"",
				listParam: {
					page: 0,
					itemid: "",
					title: "",
					size: 15
				},
				listParamApk: {
					page: 1,
					itemid: "",
					title: ""
				},
				listResult: {}
			}
		},
		methods: {
			handleSizeChange(val){

			},
			handleCurrentChange(val){
				var vm = this;
				vm.listParamApk.page = val;
				vm.listParam.page = val -1;
				vm.articleList();
			},
			newContent(){
				this.$router.push("/content/newsContent")
			},
			articleList() {
				var vm = this;
				apiService.requestGet("admin/searchArticle", vm.listParam)
				  .then(function(res){
				  	vm.listResult = res.data;
				  }, function(res){
				  	this.$myAlert.show("数据请求失败", 'error')
				  })

			},
			editorContent(obj) {
				this.$router.push({name: 'content.newsContent', query: {id: obj.id}});
			},
			delContent(obj) {
				var vm = this;
				apiService.requestGet("admin/deleteArticle", {param: obj.id})
				  .then(function(res){
				  	//vm.listResult = res.data;
				  	vm.$myAlert.show("删除成功", 'success');
				  	vm.articleList();
				  }, function(res){
				  	vm.$myAlert.show("数据请求失败", 'error')
				  })
			},
			searchBy(){
				var vm = this;
				vm.listParam = {
					page: 0,
					itemid: vm.listParamApk.itemid,
					title: vm.listParamApk.title,
					size: 15
				}
				vm.articleList()
			},
			resetBy(){
				var vm = this;
				vm.listParamApk = {
					page: 1,
					itemid: "",
					title: ""
				}
			}

		},
		created() {
			var vm = this;
			vm.articleList();
			apiService.requestGet('admin/getMenuForArticle'). then(function(res){
				vm.menus = res.data;

			}, function(res){

			})
		}
	}
</script>
<style lang="scss">
	#content-news{
		.el-select{
			width: 100%;
		}
	}
</style>