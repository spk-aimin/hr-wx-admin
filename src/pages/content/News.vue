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
			    <input type="text" class="form-control" placeholder="用户名">
			  </div>
			  <div class="form-group">
			    <label>菜单:</label>
			     <el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				 </el-select>
			  </div>
			  <el-button type="primary">查询</el-button>
			  <el-button>重置</el-button>
		</div>
		<div class="row margin-top-t">
			<div class="col-md-12">
				<el-button type="primary" size="small" @click="newContent()">新增</el-button>
				<el-button type="danger" size="small">删除</el-button>
			</div>
		</div>

		<!--列表数据-->
		<table class="table margin-top-t table-bordered">
			<thead>
				<tr class="th">
					<th><el-checkbox>全选</el-checkbox></th>
					<th>标题</th>
					<th>菜单</th>
					<th>发布时间</th>
					<th style="width:20%">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><el-checkbox></el-checkbox></td>
					<td>张三</td>
					<td></td>
					<td></td>
					<td>
					  <el-button type="primary" size="small">修改</el-button>	
					  <el-button type="danger" size="small">删除</el-button>
				    </td>
				</tr>
				<tr>
					<td><el-checkbox></el-checkbox></td>
					<td>张三</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
		<div class="page-cli">
		  <el-pagination ref ="pageN" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="100" layout="total, prev, pager, next" :total="1000"></el-pagination>
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
	export default {
		data(){
			return {
				pageNum: 1,
				options: [],
				value:""
			}
		},
		methods: {
			handleSizeChange(val){

			},
			handleCurrentChange(val){

			},
			newContent(){
				this.$router.push("/content/newsContent")
			}
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