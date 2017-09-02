<template>
	<div class="category-wrap">
		<div class="category-header">
			<div class="content">
				<li @click="tab1($event)" class="active">本地服务</li>
				<li @click="tab2($event)">全国送</li>
			</div>
			<!--<div class="sort">
				<li class="on">智能排序</li>
				<li>离我最近</li>
				<li>价格最低</li>
				<li>价格最高</li>
			</div>-->
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
							<span class="oldprice">{{"￥"+list.original_price/100}}</span>
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
				lists : []
			}
		},
		methods:{
			tab1(event){
				var that = this;
				$(event.target).addClass("active").siblings().removeClass("active");
				var query_k=location.href.split("list/")[1];
				var url = "https://api.ricebook.com/3/enjoy_product/search.json?city_id=104&keyword="+query_k+"&page=0";			
				MyAjax.vueJson(url,function(data){
					console.log(data)
					that.lists = data.products;
				})
			},
			tab2(event){
				var that = this;
				$(event.target).addClass("active").siblings().removeClass("active");
				var query_k=location.href.split("list/")[1];
				var url = "https://api.ricebook.com/3/enjoy_product/search.json?city_id=1&keyword="+query_k+"&page=0"
				MyAjax.vueJson(url,function(data){
					console.log(data)
					that.lists = data.products;
				})
			}

		},
		mounted(){
			var that = this;
			var query_k=location.href.split("list/")[1];
			
		//	var hash  = location.href;
			var url = "https://api.ricebook.com/3/enjoy_product/search.json?city_id=104&keyword="+query_k+"&page=0";
			MyAjax.vueJson(url,function(data){
				console.log(data)
				that.lists = data.products;
			})
		}
	}
</script>

<style scoped="scoped">
	.category-wrap{overflow: hidden;}
	.category-header{width:100%;height: 40px;font-size: 15px;position: fixed;background: #FFFFFF;}
	.content{width:100%;height: 100%;display: flex;border-bottom: 1px solid #f6f6f6;}
	.content li{flex:1;text-align: center;line-height: 40px;box-sizing: border-box;color: #969696;}
	.content li:first-child{border-right: 1px solid #f6f6f6;}
	/*.sort li{height: 40px;text-align: center;line-height: 40px;border-bottom:1px solid #f6f6f6;}
	.sort{display: none;background: #fff;position: absolute;width:100%;}
	.sort .on{color: #ff3939;background-color: #fafafa;}*/
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
	 .content .active{
	 	border-bottom: 2px solid #000;
 	    color: #2e2e2e;
	 }
</style>