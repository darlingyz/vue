//1。引入组件，用于路由对应的页面
import Home from "./../com/Home.vue";
import Discover from "./../com/Discover.vue";
import Invite from "./../com/Invite.vue";
import My from "./../com/My.vue";
import Kind from "./../com/Kind.vue";
import Cart from "./../com/Cart.vue";
import CartFooter from "./../com/CartFooter.vue"
import Login from "./../com/Login.vue";
//import Order from "./../com/order.vue";
//import OrderFooter from "./../com/Orderfooter.vue";

import HomeHeader from "./../com/HomeHeader.vue";
import DiscoverHeader from "./../com/DiscoverHeader.vue";
import InviteHeader from "./../com/InviteHeader.vue";
import MyHeader from "./../com/MyHeader.vue";
import MainFooter from "./../com/MainFooter.vue";
import DetailFooter from "./../com/DetailFooter.vue";
import KindHeader from "./../com/KindHeader.vue";
import List from "./../com/List.vue";
import Detail from "./../com/Detail.vue";
import SearchList from "./../com/SearchList.vue";
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。

const routes = [
{path:"/",redirect:"/home"},
	{path:"/home",components:{
		default:Home,
		header:HomeHeader,
		footer:MainFooter
	}},
	/*{path:"/kind",redirect:"/kind/1"},
	{path:"/kind",components:{
		default:Kind,
		header:KindHeader,
		footer:MainFooter
	}},
	{path:"/kind/:classID",name:"kind",component:Kind},
	{path:"/cart",components:{
		default:Cart,
		header:CartHeader,
		footer:MainFooter
	}},*/
	{path:"/discover",components:{
		default:Discover,
		header:KindHeader,
		footer:MainFooter
	}},
	{path:"/invite",components:{
		default:Invite,
		header:KindHeader,
		footer:MainFooter
	}},
	{path:"/my",components:{
		default:My,
		header:MyHeader,
		footer:MainFooter
	}},
	{path:"/kind",components:{
		default:Kind,
		header:KindHeader,
		footer:DetailFooter
	}},
	{path:"/kind/:classID/:cityID",name:"kind",components:{
		default:List,
		header:KindHeader,

	}},
	{path:"/detail/:productID",name:"detail",components:{
		default:Detail,
		header:KindHeader,	
		footer:DetailFooter
	}},
	{path:"/cart",components:{
		default:Cart,
		header:KindHeader,
		footer:CartFooter
	}},
	{path:"/list/:query_k",name:"list",components:{
		default:SearchList,
		header:KindHeader,
		footer:MainFooter
	}},
	{path:"/login",components:{
		default:Login,
		header:KindHeader,
//		footer:CartFooter
	}},
//	{path:"/order",components:{
//		default:Order,
//		footer:OrderFooter
//	}}
];

export default routes;