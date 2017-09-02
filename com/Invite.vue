<template>
	<div class="couponwrap">
		 <div class="couponbanner">
		 	<img src="https://image.ricebook.com/business/21405298623398"/>
		 </div>
		<p>邀请好友加入ENJOY，给TA发放价值50元礼券。好友完成首单消费后，你亦可获得价值50元礼券。</p>
		<div class="invite">
			即刻邀请
		</div>
	</div>
</template>

<script>
	 import MyAjax from "./../md/MyAjax.js";

	export default {
		
		data(){
			return {
				 img:""
			}
		},
		updated(){
			var that = this;
			
			if(localStorage.getItem("isLogin") == "1"){
				 $('.couponwrap').css('display','block');
				
 			}else{
 				$('.couponwrap').css('display','none');
			 	 that.$router.push({path: '/login'});
			}
		}
	}
</script>

<style scoped>
	.couponbanner{
		width: 100%;
		height: 12rem;
	}
	.couponbanner img{
		width: 100%;
		height: 100%;
	}
	p{
		width: 90%;
		margin: 2rem auto;
	}
	.invite{
		width: 30%;
		height: 30px;
		line-height: 30px;
		border-radius:0.5rem ;
		text-align: center;
		background: #FF3939;
		margin: 2rem auto;
		color: #FFFFFF;
	}
</style>