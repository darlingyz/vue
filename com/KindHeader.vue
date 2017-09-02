<template>
	<div class="commonHeader">
		<div class="left">
			<router-link to="/"><a>首页</a></router-link>
		</div>
		<div class="center">
			<img src="../img/logo.png">
			<span>上海</span>
		</div>
		<div class="right">
			<router-link to="/my" v-if="isLogin">
				<i class="iconfont">&#xe69a;</i>
			</router-link>
			<router-link to="/my" v-else="!isLogin">
				<i class="iconfont">&#xe69a;</i>
			</router-link>
			<i class="iconfont" @click="showSearch()">&#xe613;</i>
		</div>
		<div class="search">
			<input type="text" placeholder="搜索本地精选/快递到家" v-model="searchWord">
			<router-link :to="{name:'list',params:{query_k:searchWord}}">
				<span class="toList" @click="reload()">搜索</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				searchWord : '',
				isLogin : true
			}
		},
		methods : {
			showSearch(){
				$(".search").toggle();
			},
			reload(){
				location.reload()
			}
		}
	}
</script>

<style scoped="scoped">
	.search{
		display: none;
		position: absolute;
		top: 44px;
		width: 100%;
		height: 50px;
		background: #FFFFFF;
		z-index: 10;
		color: #000000;
		padding: 0 20px;
		
		
	}
	.right a{
		display: inline-block;
		width: 20px;
		
	}
	.right a .iconfont{
			color: #fff;
		}
	.search span{
	    width: 20%;
		display: inline-block;
		margin-left: 10px;
		font-size: 16px;
	}
	.search input{
		padding: 5px;
	    background: #f2f3f4;
	    border: none;
	    text-align: center;
	    width: 70%;
	    border-radius: 5%;
	    outline: none;
	}
</style>