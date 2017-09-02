<template>
	<div  >
		<div class="loginbao">
			<div class="loginlogo">
				<img src="../img/login.png"/>
			</div>
			<input type="text" name="" id="userName" value="" placeholder="用户名"/>
			<input type="password" name="" id="password" value="" placeholder="密码"/>
			<div @click="denglu()" id="button" >登录</div>
			<p>未注册的用户登录后自动创建</p>
			<p>登录即表示您同意<span>用户协议</span></p>
			<div id="toast"></div>
		</div>
	</div>
</template>

<script>
	import "./../scss/login.scss"
	import MyAjax from "./../md/MyAjax.js";
	import Toast from "./../md/Toast.js";

	export default {
		data () {
			return {
 			}
		},
		methods: {
			 denglu(){
			 	var userID = $("#userName").val();
				var password = $("#password").val();
			 
				if(userID == "" || password == ""){
					Toast.makeText("用户信息不完整",2000);
				}else{
 					$("#button").attr("disabled","disabled");//保证用户不可以连续点击
					$("#button").html("正在登录...")
					var that = this;
					var url ="http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
					MyAjax.vueJson(url,function(data){
						$("#button").removeAttr("disabled")//保证用户不可以连续点击
						$("#button").html("登录")
						console.log(data);
						
						if(data == "0"){
							//用户名不存在
							Toast.makeText("用户不存在，请先注册",1000);
		 				}else if(data == "2"){
							//密码错误
							Toast.makeText("密码错误",1000);
		 				}else{				
							//登录成功		
							
							localStorage.setItem("isLogin","1");
							localStorage.setItem("userID",userID);
   							that.$router.push({path: '/home'});
						}
					},function(err){
						$("#button").removeAttr("disabled")//保证用户不可以连续点击
						$("#button").val("登录")
						console.log(err);
					});
 				}
			 }
		}
	}
	
</script>

<style scoped>
 
</style>