<template>
	<ul>
		<li ><router-link to="/home"><i class="iconfont">&#xe60c;</i></router-link></li>
		<li ><router-link to="/discover"><i class="iconfont">&#xe607;</i></router-link></li>
		<li ><router-link to="/invite"><i class="iconfont">&#xe668;</i></router-link></li>
		<li ><router-link to="/my"><i class="iconfont">&#xe69a;</i></router-link></li>
	</ul>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.router-link-exact-active.router-link-active{
		color:#f66;
	}
	.iconfont{
		font-style: normal;
		font-size: 26px;
	}
</style>