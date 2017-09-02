<template>
	<div class="category-wrap">
		<div class="category-header">
			<div class="content">
				<li>全部</li>
				<li v-on:click="sort()">{{sortchecked}}<span class="triangle-up"></span><span class="triangle-down"></span></li>
			</div>
			<div class="sort">
				<li  v-for="item in sorts" :sort_id = "item.sort_id" @click="sortby(item.sort_id,$event)">{{item.sort_name}}</li>
				<!--<li>离我最近</li>
				<li>价格最低</li>
				<li>价格最高</li>-->
			</div>
		</div>
		<ul class="kindLists">
			<li v-for="list in lists">
				<router-link :to="{name:'detail',params:{productID:list.product_id}}">
					<div class="imgwrap">
						<img :src="list.product_image">
					</div>
					<div class="desc">
						<div class="title">{{list.name}}</div>
						<div class="price">
							<span>{{list.price/100+"元/"+list.show_entity_name}}</span>
							<span class="oldprice" v-if="list.original_price">{{"￥"+list.original_price/100}}</span>
						</div>
						<div class="location">
							<span class="iconfont"></span>
							<span>{{list.area}}</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	
	import MyAjax from "./../md/MyAjax.js";
	
	export default {
		data(){
			return {
				lists : [],
				sorts : [],
				sortchecked : ''
			}
		},
		methods:{
			sort(){
				$(".sort").toggle();
				$(".triangle-up").toggle()
				$(".triangle-down").toggle()
			},
			sortby(index,ev){
				console.log(index);
				var that = this;
				$(ev.target).addClass("on").siblings().removeClass("on")
				$(".sort").toggle();
				var category_id=location.href.split("kind")[1].split("/")[1];
				var city_id=location.href.split("kind")[1].split("/")[2]
				var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id="+category_id+"&sort="+index+"&from_id=0&city_id="+city_id+"&page=0";
				MyAjax.vueJson(url,function(data){
					console.log(data)
					that.lists = data;
					
				})
				this.sortchecked = ev.target.innerText;
				$(".triangle-up").toggle()
				$(".triangle-down").toggle()
			}
		},
		mounted(){
			
			var that = this;
			var category_id=location.href.split("kind")[1].split("/")[1];
			var city_id=location.href.split("kind")[1].split("/")[2]
			var hash  = location.href;
			var url1 = "https://api.ricebook.com/4/tab/sub_category.json?category_id="+category_id+"&city_id="+city_id+"&from_id=0";
			var url = "https://api.ricebook.com/4/tab/category_product_list.json?category_id="+category_id+"&sort=1&from_id=0&city_id="+city_id+"&page=0"   ;
			MyAjax.vueJson(url,function(data){
				console.log(data)
				that.lists = data;
			})
			MyAjax.vueJson(url1,function(data){
				console.log(data)
				that.sorts = data.sort;
				that.sortchecked = data.sort[0].sort_name;
			})
		}
	}
</script>

<style scoped="scoped">
	.category-wrap{overflow: hidden;}
	.category-header{width:100%;height: 40px;font-size: 15px;position: fixed;background: #FFFFFF;}
	.content{width:100%;height: 100%;display: flex;border-bottom: 1px solid #f6f6f6;}
	.content li{flex:1;text-align: center;line-height: 40px;}
	.content li:first-child{border-right: 1px solid #f6f6f6;}
	.sort li{height: 40px;text-align: center;line-height: 40px;border-bottom:1px solid #f6f6f6;}
	.sort{display: none;background: #fff;position: absolute;width:100%;}
	
	.sort .on{color: #ff3939;background-color: #fafafa;}
	.kindLists{margin-top: 40px;}
	.kindLists li {padding: 10px;height: 120px;border-bottom: 1px solid #e6e6e6;}
	.kindLists li .imgwrap{width: 50%;overflow: hidden;float: left;}
		.kindLists li .imgwrap img{width:100%;height: 100%;border:none;}
	.kindLists li .desc{width: 45%;float: left;padding-left: 5%;height: 100%;}
	.title{font-family: PingFangSC-Medium;
	    height: 55%;
	    font-size: 16px;
	    color: #2c3038;
	    margin-bottom: 10px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    -webkit-box-orient: vertical;}
	 .price{color: #ff3939;font-size: 14px;}
	 .oldprice{text-decoration: line-through;color: #92969c;margin-left: 5px;}
	 .location{color: #92969c;font-size: 12px;margin-top: 5px;}
	 .content li:nth-child(2){position: relative;}
	 .triangle-up{
	    width: 0;
	    height: 0;
	    border-left: 3px solid transparent;
	    border-right: 3px solid transparent;
	    border-bottom: 6px solid #000;
        position: absolute;
	    top: 18px;
	    left: 70%;
	    display: none;
	 }
	 .triangle-down{
	    width: 0;
	    height: 0;
	    border-left: 3px solid transparent;
	    border-right: 3px solid transparent;
	    border-top: 6px solid #000;
        position: absolute;
	    top: 18px;
	    left: 70%;
	 }
	 
	 
	 
</style>