import Vue from 'vue'
const alert = new Vue ({
  data: {
  	title: "",
  	type:"",
  	isShow: false
  },
  el: '#alert',
  template: '<el-alert :title="title" :type="type" v-if="isShow"></el-alert>'
});
 const MyAlert = {};
MyAlert.show = (text, type) =>{
	alert.$data.title = text;
	alert.$data.type =type;
	alert.$data.isShow = true;
	window.setTimeout(function(){
		alert.$data.isShow = false;
	},1200);
}

Vue.prototype.$myAlert = MyAlert;
Vue.prototype.$myIsEmpty = function(val){
  if(typeof(val) == 'string'){
    if(val.trim()==""){
      return true;
    }
  }else {
    if(val==null || val == undefined)
      return true
  }
  return false;
}