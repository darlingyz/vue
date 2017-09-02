<template>
	<div class="userwrap">
		<div class="usertop">
			<div class="logowrap">
				<span class="iconfont">&#xe69a;</span>
				<p>{{userID}}</p>
			</div>
			<ul>
				<li>Code消费码</li>
				<li>我的礼券</li>
				<li>地址管理</li>
			</ul>
			<div class="quit" @click="quit()">退出登录</div>
		</div>
	</div>
</template>

<script>
	import "./../scss/my.scss" ;
//	import $ from "jquery";
	export default {
		
		data(){
			return {
				userID:"",
				isLogin: ""
			}
		},
		methods : {
			quit(){
				localStorage.setItem("isLogin",0)
				this.$router.push({path: '/login'});
			}
		},
		mounted(){
			 var that = this;
			 that.userID=localStorage.getItem("userID");
		},
		updated(){
			var that = this;			
			if(localStorage.getItem("isLogin") == "1"){
				 $('.userwrap').css('display','block');
				
 			}else{
 				$('.userwrap').css('display','none');
			 	 that.$router.push({path: '/login'});
			}
		}
	}
</script>

<style >
</style>