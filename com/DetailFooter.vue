<template>
	<div class="detail_footer">
		<div class="detailfooter">
			<router-link to = "/cart">
				<div class="cart iconfont" @click="toCart()">&#xe602;</div>
				<span class="addSuccess">+{{msg}}</span>
			</router-link>
			<div class="addCart" @click="addCart()">加入购物车</div>
			<div class="buyNow" @click="buyNow()">即刻购买</div>
			
		</div>
		<div class="detailfooter_1" @click="showChoice()">
			确定
		</div>
		<div id="toast"></div>
	</div>
</template>

<script>
	import "./../scss/detailfooter.scss";
	import Toast from "./../md/Toast.js";
	var flag = 0;
	export default {
		props : ['msg'],
		data(){
			return {
				num:'1'
			}
		},
		methods : {
			showChoice(){
				
				flag = !flag;
				$(".choiceNum").toggle();
				$(".shopList").toggle();
				$(".detailfooter").toggle();
				$(".detailfooter_1").toggle();
				if(flag){
					$(".close").html("关闭<i class='iconfont'>&#xe603;</i>");
				}else{
					$(".close").html("切换商品<i class='iconfont'>&#xe604;</i>");
				}
				$("#on").html("&#xe606;")
				$("#on").css("border","none")
			},
			addCart(){
				var productID = location.href.split("detail/")[1];
				var num = this.msg;
				if(localStorage.getItem("cart")){
					var str_obj = localStorage.getItem("cart");
					var arr_obj = JSON.parse(str_obj);
					var a = 0;
					//遍历商品，如果存在加1，如果不存在直接push进去；
					for(let i in arr_obj){
						console.log(arr_obj[i])
						if(arr_obj[i].id == productID){
							arr_obj[i].num = Number(arr_obj[i].num) + Number(num);
							localStorage.setItem("cart",JSON.stringify(arr_obj));
							Toast.makeText("加入购物车成功",1500);
							break;
						}else{
							a++
						}
						
					}
					if(a==arr_obj.length){
						var obj = {
							id : productID,
							num : num 
						};
						arr_obj.push(obj);
						localStorage.setItem("cart",JSON.stringify(arr_obj));
					//	$(".addSuccess").css("display","block")
						Toast.makeText("加入购物车成功",1500);
					}
					
				}else{
					var arr_obj = [];
					var obj = {
						id : productID,
						num : num 
					};
					arr_obj.push(obj);
					localStorage.setItem("cart",JSON.stringify(arr_obj));
				//	$(".addSuccess").css("display","block")
					Toast.makeText("加入购物车成功",1500);
				}
				
				
			},
			buyNow(){
				
			},
			toCart(){
				
			}
		},
		mounted(){
			this.num = this.msg

		}
	}
	
</script>

<style>
	.detailfooter_1{
		position: relative;
		background: #f00;
		color: #FFFFFF;
		text-align: center;
		line-height: 50px;
		position: absolute;
		display: none;
		
	}
</style>