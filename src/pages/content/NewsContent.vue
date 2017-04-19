<template>
	<div id="content-news-content">
		<div class="el-breadcrumb">
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">内容管理</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span> 
		   <span class="el-breadcrumb__item">
		     <span class="el-breadcrumb__item__inner">新建&修改内容</span>
		     <span class="el-breadcrumb__separator">/</span>
		   </span>
		</div>
		<div class="form-horizontal margin-top-t">
			  <div class="form-group">
			    <label class="col-sm-2 control-label">标题</label>
			    <div class="col-sm-7">
			      <input type="text" class="form-control" v-model="content.title" placeholder="标题">
			    </div>
			  </div>
		  	 <div class="form-group">
			    <label class="col-sm-2 control-label">类型</label>
			    <div class="col-sm-7">
			       <select class="form-control" v-model="content.menuId">
			       	  <option value="">请选择</option>
			       	  <option v-for = "item  in options" value="item.value">{{item.label}}</option>
			       </select>
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">阅读量</label>
			    <div class="col-sm-3">
			       <input type="text" class="form-control" v-model="content.readCount">
			    </div>
			    <label class="col-sm-2 control-label">创建人</label>
			    <div class="col-sm-3">
			       <input type="text" class="form-control" v-model= "content.createUserName">
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">摘要</label>
			    <div class="col-sm-10">
			       <textarea placeholder="摘要" class="form-control" v-model="content.summary"></textarea>
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">描述</label>
			    <div class="col-sm-10">
			       <textarea placeholder="描述" class="form-control" v-model="content.description"></textarea>
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">封面</label>
			    <div class="col-sm-10">
			       <el-upload
					  class="upload"
					  drag
					  :action="upFileUrl"
					  :on-success="fmUpSuc"
					  :on-error= "fmUpfal"
					  multiple>
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
					<div class="up-img-view">
						<img src="">
					</div>
			    </div>
			  </div>
			  <div class="form-group">
			  	<label class="col-sm-2 control-label">置顶</label>
			  	<div class="col-sm-2 control-label" style="text-align:left">
			       <input type="radio" name="isTop" value="1" v-model="content.topOrnot"> 是
			       <input type="radio" name="isTop" value="0" v-model="content.topOrnot"> 否
			    </div>
			    <label class="col-sm-2 control-label">排序</label>
			    <div class="col-sm-3">
			       <input type="text" class="form-control" v-model="content.order">
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">链接</label>
			    <div class="col-sm-7">
			      <input type="text" class="form-control" v-model="content.linkOut">
			    </div>
			  </div>
			    <div class="form-group">
			    <label class="col-sm-2 control-label">创建时间</label>
			    <div class="col-sm-7">
			      <input type="text" class="form-control" v-model="content.currentTime">
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">内容</label>
			    <div class="col-sm-10" id="editorBx">
			  	  <!-- <script id="editor" type="text/plain" style="width:100%;height:300px;"></script> -->
			  	</div>
			  </div>
			  <div class="form-group margin-btm-z">
			    <div class="col-sm-offset-2 col-sm-7">
			      <el-button type="primary" @click="saveContent()">提交</el-button>
			      <el-button @click="cancelContent()">取消</el-button>
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
				pageNum: 1,
				options: [{label:'新闻', value: 1}],
				value:"",
				upFileUrl: "http://wwww.baidu.com",
				content: {
					"id": "",
				    "menuId": null,
				    "title": "2文章标题",
				    "description": "6描述",
				    "summary": "摘要",
				    "imageCoverImageId": null,
				    "readCount": "2324",
				    "createTime": "2017-04-14 13:16",
				    "order": null,
				    "topOrnot": "1",
				    "linkOut": "http://123.207.119.252/html/index.html",
				    "content": "内容",
				    "createUserName": "润华全服务",
				    "currentTime": "2017-04-16 18:17:23"
				},
				ue: {}
			}
		},
		methods: {
			fmUpSuc(response){
				console.log(response);
			},
			fmUpfal(error){
				console.log(error);
			},
			cancelContent(){
				this.$router.push('/content/news')
			},
			saveContent(){
				var vm = this;
				vm.content.content = vm.ue.getContent();
				apiService.requestForm("admin/addArticle", vm.content).then(function(res){
					vm.$myAlert.show('操作成功', 'success');
					this.$router.push('/content/news')
				},function(res){
					vm.$myAlert.show('操作失败', 'error');
				})
			}

		},
		created(){
			var vm = this;
			// var script = document.createElement("script");
			// script.setAttribute('id', 'editor');
			// script.setAttribute('type', "text/plain");
			// script.setAttribute("style","width:100%;height:300px;");
			// var editorBx = document.getElementById("editorBx");
			// 	console.log(script)
			// console.log(editorBx)
			// editorBx.append(script);
		
			vm.content = {};
		},
		mounted (){
			var vm = this;
			debugger
			var script = document.createElement("script");
			script.setAttribute('id', 'editor');
			script.setAttribute('type', "text/plain");
			script.setAttribute("style","width:100%;height:300px;");
			var editorBx = document.getElementById("editorBx");
				console.log(script)
			console.log(editorBx);
			editorBx.append(script);
			vm.ue = UE.getEditor('editor');
		},
		beforeDestroy(){
			this.ue.destroy();
		}

	}
</script>
<style lang="scss">
	#content-news-content{
		.upload {
			float: left;
		}
		.up-img-view{
			float: left;
			margin-left: 10px;
			img{
				max-width: 300px;
			}
		}
	}
</style>