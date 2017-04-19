/**
 * @desc 用户信息
 **/
let uInfo = {}

class UserInfo {
	construct() {

	}
	setUserInfo(userInfo){
		uInfo = userInfo;
	}
	getUserInfo(){
		return uInfo;
	}
	setUserName(userName){
		window.localStorage.setItem("userName", userName);
	}
	getUserName(){
		return window.localStorage.getItem("userName");
	}
	setPassword(password){
		window.localStorage.setItem("password", password);
	}
	getPassword(){
		return window.localStorage.getItem("password")
	}
}

export default new UserInfo();