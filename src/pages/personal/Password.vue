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
				      <input type="password" class="form-control" placeholder="原密码">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputPassword3" class="col-sm-2 control-label">*新密码</label>
				    <div class="col-sm-7">
				      <input type="password" class="form-control" placeholder="新密码">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputPassword3" class="col-sm-2 control-label">*确认新密码</label>
				    <div class="col-sm-7">
				      <input type="password" class="form-control" placeholder="确认新密码">
				    </div>
				  </div>
				  <div class="form-group margin-btm-z">
				    <div class="col-sm-offset-2 col-sm-7">
				      <el-button type="primary" @click="save">提交</el-button>
				      <el-button>重置</el-button>
				    </div>
				  </div>
			</div>
		 </div>

	</div>
</template>
<script>
 export default {
 	methods: {
 		save(){
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