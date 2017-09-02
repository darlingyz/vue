<template>
	<div class="detailCon">
		<!-- 轮播图 -->
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="img in images"><img :src="img.img_url"></div>
		    </div>
	   		<!-- 如果需要分页器 -->
	    	<div class="swiper-pagination"></div>
		</div>
		<!-- 轮播图下商品基本信息 -->
		<div class="info">
			<div class="info-title">
				<p class="title">{{productInfo.name}}<span class="iconfont love">&#xe605;</span></p>
				<p class="desc">{{productInfo.description}}</p>
				<p class="price">
					<span class="newPrice">{{productInfo.price/100+" 元"}}</span><span>{{"/"+productInfo.show_entity_name}}</span>
					<span class="oldprice" v-if="productInfo.origin_price">￥{{productInfo.origin_price/100}}</span>
					<span class="status">随时退</span>
				</p>
			</div>
			<div class="tags">
				<span v-for="item in productInfo.display_property_group" >{{item.name}}</span>
			</div>
		</div>
		<div class="panel-gap"></div>
		<!-- 商户信息 -->
		<div class="store_wrap">
			<div class="store" v-for="i in shopInfo">
				<h3 class="cart-title">
					商户信息
				</h3>
				<div class="title">{{i.restaurant_name}}</div>
				<div class="adress">
					<span class="iconfont">&#xe61a;</span>
					<span>{{i.restaurant_address}}</span>
					<span class="dir"></span>
				</div>
				<div class="tel">
					<span class="iconfont">&#xe662;</span>
					<span>{{i.restaurant_phone_numbers[0]}}</span>
					<span class="dir"></span>
				</div>
			</div>
		</div>
		<div class="panel-gap"></div>
		<!-- 菜单 -->
		<div class="menu-wrap">
			<div class="menu">
				<h3 class="cart-title">
					MENU
				</h3>
				<div class="menu-list">
					<div class="menu-item" v-for="j in foodInfo">
						<p class="sub-title">{{"-"+j.sub_title+"-"}}</p>
						<p v-for="k in j.text">{{k}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-gap"></div>
		<!-- 亮点 -->
		<div class="detail-wrap">
			<div class="detail">
				<h3 class="cart-title">
					亮点
				</h3>
				<div class="detail-item" v-for="detail in detailInfo">
					<img :src="detail.img_url"/>
					<p class="sub-title">{{detail.title}}</p>
					<p class="content">{{detail.content}}</p>
				</div>
			</div>
		</div>
		<div class="panel-gap"></div>
		<!-- 使用提示 -->
		<div class="tip-wrap">
			<div class="tip">
				<h3 class="cart-title">
					使用提示
				</h3>
				<ul>
					<li v-for="tip in tipInfo">{{tip.text}}</li>
				</ul>
				<div class="chat">
					联系客服
				</div>
			</div>
		</div>
		<div class="panel-gap"></div>
		<!-- 猜你喜欢 -->
		<div class="love-wrap">
			<div class="love">
				<h3 class="cart-title">
					猜你喜欢
				</h3>
				<ul>
					<li v-for="love in mayloveInfo" @click="reload()">
						<router-link :to="{name:'detail',params:{productID:love.product_id}}">
						<img :src="love.product_image_url">
						<div class="desc">
							<div class="sub-title">{{love.product_name}}</div>
							<div class="price">{{love.price/100+"元/"+love.show_entity_name}}</div>
						</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="choice">
			<div class="choiced">
				已选择：<span>{{checkedTitle}}</span><span>({{num}}份)</span>
				<span class="close" @click="showChoice()">切换商品<i class="iconfont">&#xe604;</i></span>
			</div>
			<ul class="shopList">
				<li v-for="list in lists" :id = "list.sub_product_id">
					<div class="checked">
						<span class="iconfont" :id = "lists[0]==list?'on':''"></span>
					</div>
					<div class="desc">
						<p class="sub-title">{{list.spec}}</p>
						<p class="price">{{list.price/100+"元/"+list.show_entity_name}}<span>{{"￥"+list.origin_price/100}}</span></p>
					</div>	
				</li>
			</ul>
			<div class="choiceNum">
				<span>选择数量</span>
				<div class="operate">
					<span class="subtract" @click="subtract()">-</span>
					<span class="num">{{num}}</span>
					<span class="plus" @click="plus()">+</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import "./../scss/detail.scss";
	import MyAjax from "./../md/MyAjax.js";
//	import Vue from "vue";
//	var Event = new Vue();//载体  广播和接收
	var flag = 0;
	export default {
		data(){
			return {
				productInfo:[],
				images : [],
				shopInfo : [],
				foodInfo : [],
				detailInfo : [],
				tipInfo : [],
				mayloveInfo : [],
				checkedTitle : [],
				num : 1,
				lists :[],
			}
		},
		methods : {
			reload(){
				location.reload()
			},
			showChoice(){
				this.$emit('to-parent',this.num);
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
//				$(".detailfooter").css("display","none")
//				$(".detailfooter_1").css("display","block")
//				console.log($(".detailfooter"))
				
			},
			subtract(){
				if(this.num > 1){
					var num = this.num - 1;
					this.num = num;
				}	
			},
			plus(){
				var num = this.num + 1;
				this.num = num;
			}
		},
		mounted(){
			
			var that = this;
			var productID = location.href.split("detail/")[1];
			console.log(productID.length);
			if(productID.length > 7){
			//	var id = productID.split("")
				var url = "https://api.ricebook.com/product/info/product_detail.json?product_"+productID
			}else{
				var url = "https://api.ricebook.com/product/info/product_detail.json?product_id="+productID;
			}
			
			MyAjax.vueJson(url,function(data){
				console.log(data)
				that.productInfo = data.basic;
				that.images = data.basic.product_images;
				that.lists = data.basic.sub_product_array;
				that.checkedTitle = data.basic.sub_product_array[0].spec;
				for(var i in data.modules){
					switch(i){
						case "0" : 
							that.shopInfo = data.modules[i].data.restaurants;
							break;
						case "1" : 
							that.foodInfo = data.modules[i].data.contents;
							break;
						case "2" : 
							that.detailInfo = data.modules[i].data.lights
;
							break;
						case "3" : 
							that.tipInfo = data.modules[i].data.contents;
							break;
						case "4" : 
							that.mayloveInfo = data.modules[i].data.recommend;
							break;
					}
					
				}
//				$(".checked").eq(0).find("span").addClass("on");
				
				console.log(that.mayloveInfo)
			},function(err){
				console.log(err)
			})
			
			
		},
		updated(){
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
				autoplay : 3000,
		    })   
		}	
	}
 
</script>

<style>
</style>