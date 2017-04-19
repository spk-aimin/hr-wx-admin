
import Welcome from '@/pages/Welcome'

/*个人中心*/
import Password from '@/pages/personal/Password'

/*菜单*/
import MenuPublic from '@/pages/menu/Public'

/*内容*/
import ContentNews from '@/pages/content/News'
import ContentNewsContent from '@/pages/content/NewsContent'
/*用户管理*/
import UserAdd from '@/pages/user/AddUser'
const r =  [
      {
      	path: "",
      	name: "",
      	component: Welcome
      },
	   //个人中心
	   {
			path:'personal/password',
			name: 'personal.password',
			component: Password
		},
		//菜单
		{
			path: 'menu/public',
			name: 'menu.public',
			desc: '菜单管理，公共菜单',
			component: MenuPublic
		},
		//内容管理
		{
			path: 'content/news',
			name: 'content.news',
			desc: '新闻管理',
			component: ContentNews
		},
		{
			path: 'content/newsContent',
			name: 'content.newsContent',
			desc: '新闻管理内容',
			component: ContentNewsContent
		},
		//用户管理
		{
			path: 'user/add',
			name: 'user.add',
			desc: '用户添加',
			component: UserAdd
		}
	]



export const myRoute = r;