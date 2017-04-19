
const routeLink = [{
	icon: 'fa-user',
	name: '个人中心',
	isShow: false,
	children: [{
		icon: '',
		name: '修改密码',
		path: '/personal/password'
	}]
}, {
	icon: 'fa-briefcase',
	name: '菜单管理',
	isShow: false,
	children: [{
		icon: '',
		name: '公共菜单',
		path: '/menu/public'
	}]
}, {
	icon: 'fa-book',
	name: '内容管理',
	isShow: false,
	children: [{
		icon: '',
		name: '新闻管理',
		path: '/content/news'
	}]
},{
	icon: 'fa-user-circle',
	name: '用户管理',
	isShow: false,
	children: [{
		icon: '',
		name: '添加用户',
		path: '/user/add'
	}]
}]




export default routeLink