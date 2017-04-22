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
		  	 <div class="form-group" v-if="content.menuId_">
			    <label class="col-sm-2 control-label">类型</label>
			    <div class="col-sm-7">
			       <select class="form-control" v-model="content.menuId_">
			       	  <option value="">请选择</option>
			       	  <option v-for = "item  in menus" :value="item.id">{{item.name}}</option>
			       </select>
			    </div>
			  </div>
			  <div class="form-group">
			    <label class="col-sm-2 control-label">阅读量</label>
			    <div class="col-sm-3">
			       <input type="text" class="form-control" v-model="content.readCount">
			    </div>
		<!-- 	    <label class="col-sm-2 control-label">创建人</label>
			    <div class="col-sm-3">
			       <input type="text" class="form-control" v-model= "content.createUserName">
			    </div> -->
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
						<img :src="content.titleImage">
					</div>
			    </div>
			  </div>
			  <div class="form-group">
			  	<label class="col-sm-2 control-label">置顶</label>
			  	<div class="col-sm-2 control-label" style="text-align:left">
			       <input type="radio" name="isTop" value="1" v-model="content.topOrnot"> 是
			       <input type="radio" name="isTop" value="0" v-model="content.topOrnot"> 否
			    </div>
		<!-- 	    <label class="col-sm-2 control-label">排序</label>
			    <div class="col-sm-3">
			       <input type="text" class="form-control" v-model="content.order">
			    </div> -->
			  </div>
			<!--   <div class="form-group">
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
			  </div> -->
			  <div class="form-group">
			    <label class="col-sm-2 control-label">内容</label>
			    <div class="col-sm-10" id="editorBx" style="position: reletive">
			  	   <script id="editor" type="text/plain" style="width:100%;height:400px;"></script>
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
				id: null,
				pageNum: 1,
				menus: [],
				value:"",
				upFileUrl: "/imagefile/fileUpload",
				content: {
				},
				ue: {}
			}
		},
		methods: {
			fmUpSuc(response){
				var vm  = this;
				console.log(response);
				vm.content.imageCoverImageId = response.data.id;
				vm.content.titleImage = response.data.imagePath;
			},
			fmUpfal(error){
				console.log(error);
			},
			cancelContent(){
				this.$router.push('/content/news');
			},
			saveContent(){
				var vm = this;
				/*校验*/
				if(vm.$myIsEmpty(vm.content.title)){
					vm.$myAlert.show("请填写标题", 'error');
					return;
				}
				if(vm.$myIsEmpty(vm.content.menuId_)){
					vm.$myAlert.show("请选择类型", 'error');
					return;
				}
			 //   if(vm.$myIsEmpty(vm.content.description)){
				// 	vm.$myAlert.show("请填写描述", 'error');
				// 	return;
				// }
				// if(vm.$myIsEmpty(vm.content.summary)){
				// 	vm.$myAlert.show("请填写摘要", 'error');
				// 	return;
				// }
	   //          if(vm.$myIsEmpty(vm.content.imageCoverImageId)){
				// 	vm.$myAlert.show("请上传封面", 'error');
				// }
			   if(!/[0-9]{1,}$/.test(vm.content.readCount)){
					//vm.$myAlert.show("请填写正确的阅读量", 'error');
					vm.content.readCount = 0;
				}
				vm.content.content = vm.ue.getContent();
				if(vm.$myIsEmpty(vm.content.content)){
					vm.$myAlert.show("请填写内容", 'error');
					return;
				}
				if(vm.id){
					apiService.requestPost("admin/updateArticle", vm.content).then(function(res){
						vm.$myAlert.show('操作成功', 'success');
						vm.$router.push("/content/news")
					},function(res){
						vm.$myAlert.show('操作失败', 'error');
					})

				}else {
					 apiService.requestPost("admin/addArticle", vm.content).then(function(res){
						vm.$myAlert.show('操作成功', 'success');
						vm.$router.push("/content/news")
					},function(res){
						vm.$myAlert.show('操作失败', 'error');
					})
				}
		
			}

		},
		created(){

	
		},
		mounted (){
			 var vm = this;
			 vm.id = vm.$route.query.id;
			 vm.ue = UE.getEditor('editor', {    
			 	autoHeightEnabled: false,
                autoFloatEnabled: false});

			/*菜单类型*/
			apiService.requestGet('admin/getMenuForArticle'). then(function(res){
				vm.menus = res.data;

			}, function(res){

			});
			if(vm.id){//修改文章
				apiService.requestGet("article/getArticleDetail/" + vm.id + "/"+0).then((res)=> {//获取文章详情
					vm.content = res.data;
					vm.content.mmb = vm.content.menuId_;
					console.log(vm.content.menuId_);
					vm.ue.ready(function(){
						vm.ue.setContent(vm.content.content);

					});

				}, (res)=>{
					console.log("服务器错误");
				}).catch((e)=>{
					console.log(e);
				});

			}
	
		
			// var script = document.createElement("script");
			// script.setAttribute('id', 'editor');
			// script.setAttribute('type', "text/plain");
			// script.setAttribute("style","width:100%;height:300px;");
			// var editorBx = document.getElementById("editorBx");
			// 	console.log(script)
			// console.log(editorBx);
			// editorBx.append(script);
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