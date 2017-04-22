<template>
	<div id= "main-page">
	    <!--banner-->
	    <div class="header">
	    	<h1 class="title">润华微信管理平台</h1>
	    	<div class="user-oper">
	    		<span class="oper">{{userInfo.name}}</span>
	    		<span class="oper" style="cursor: pointer" @click="loginOut()">退出</span>
	    	</div>
	    </div>
		<!--router-link-->
		<div class="nav-contain">
			<div class="nav-box" v-for="(item, index) in links" v-if="userInfo.private_ == 0 || item.userHas">
				<div class="nav-top" @click='item.isShow = !item.isShow'>
				    <i class="fa fa-user" :class='item.icon'></i> {{item.name}}
				</div>
				<transition name="bounce">
					<div class="navs" v-for ='ctem in item.children' v-if="item.isShow">
						<router-link class="nav-link" :to = "ctem.path">{{ctem.name}}</router-link>
					</div>
				</transition>
			</div>
		</div>
		<!--router-view-->
		<div class="main-contain">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
    import routeLink from './routeLink'
    import {userInfo, apiService} from '@/api'
	export default {
		data() {
			return {
				links: [],
				openIndex: 0,
				isOpen: true,
				userInfo: userInfo.getUserInfo()
			}
		},
		compments:{
		},
		created(){
			this.links = routeLink;
			console.log(userInfo.getUserInfo())
		},
		methods: {
			loginOut () {
				var vm  = this;
				apiService.requestGet('auth/loginOut').then(function(res){
					debugger
					userInfo.clearUser();
					vm.$router.push('/login');

				}, function(res){
					this.$myAlert('退出登录失败', 'error')
				});
			}
		}
	}
</script>
<style lang="scss">
 #main-page{
 	  *{
 	  	box-sizing: border-box;
 	  }
	  .header {
	  	background-color: #1F2D3D;
	  	height: 60px;
	  	position: fixed;
	  	left: 0;
	  	top: 0;
	  	width: 100%;
	  	z-index: 10;
	  	line-height: 60px;
	  	color: #fff;
	  	.title{
	  		font-size: 24px;
	  		color: #fff;
	  		float: left;
	  		padding:0 15px;
	  	}
	  	.user-oper{
	  		float: right;
	  		padding: 0 15px;
	  		font-size: 14px;
	  		.oper{
	  			padding-left: 10px;
	  			cursor: pointer;
	  			display: block;
	  			float: left
	  		}
	  	}
	  }
	  .nav-contain{
	  	position: fixed;
	  	width: 210px;
	  	background-color: #324057;
	  	left: 0;
	  	top: 0;
	  	z-index: 5;
	  	height: 100%;
	  	padding-top: 70px;
	  	.nav-box{
	  		color: #fff;
	  		padding: 5px 0;
	  		.nav-top{
	  			padding-left: 15px;
	  			font-size: 16px;
	  			line-height: 30px;
	  			cursor: pointer;
	  		}
	  		.navs {
	  			.nav-link {
	  				font-size:  14px;
	  				line-height: 30px;
	  				color: #fff;
	  				padding:5px 0 5px 30px;
	  				display: block;
	  				&.active{
	  					background-color:#1F2D3D;
	  				}
	  			}
	  		}

	  	}
	  }
	  .main-contain{
	  	margin-left: 210px;
	  	min-height: 200px;
	  	padding: 20px;
	    padding-top: 80px;
	  }
	  .bounce-enter-active {
	  animation: bounce-in .5s;
	}
	.bounce-leave-active {
	  animation: bounce-out .5s;
	}
	@keyframes bounce-in {
	  0% {
	    transform: scale(0);
	  }
	  100% {
	    transform: scale(1);
	  }
	}
	@keyframes bounce-out {
	  0% {
	    transform: scale(1);
	  }
	  100% {
	    transform: scale(0);
	  }
	}
}


</style>