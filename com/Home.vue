<template>
	<div class="homecontent">
		<div class="index-list" v-for="item in list">
			<h3>{{item.group_section.title}}</h3>
			<div class="date">{{item.group_section.desc}}</div>
			<ul class="sku-list">
				<li class="sku-item" v-for="i in item.tabs">
					<router-link :to="{name:'detail',params:{productID:i.enjoy_url.split('?')[1]}}">				
						<img :src=i.url>
						<div class="title">{{i.title}}</div>
						<div class="desc">{{i.desc}}</div>
					</router-link>
				</li>
			</ul>
		</div>
		
		
		
		<!--<div class="index-list">
			<h3>每周精选餐饮</h3>
			<div class="date">8月21日更新</div>
			<ul class="sku-list">
				<li class="sku-item">
					<a href="#">
						<img src="https://image.ricebook.com/business/19082054523907?imageView2/1/w/670/h/446|watermark/1/image/aHR0cHM6Ly9kbi1pbWctc2VyaW91c2FwcHMucWJveC5tZS93bS5wbmc=/dissolve/100/gravity/SouthEast/ws/.1"/>
						<div class="title">和心庭双人雪蟹火锅</div>
						<div class="desc">肥美雪蟹正当时的养生选择</div>
					</a>
				</li>
				<li class="sku-item"></li>
				<li class="sku-item"></li>
			</ul>
		</div>-->
	</div>
</template>

<script>
	import MyAjax from "./../md/MyAjax.js"
	export default {
		data(){
			return{
				list:[],
			}
		},
		mounted(){
			var that = this;
			var url = "https://api.ricebook.com/hub/home/v1/web/week_choice.json?city_id=104&page=0"
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.list = data;
			})
		}
	}
</script>

<style scoped="scoped">
	.homecontent{
		width:90%;
		height: 100%;
		margin: 0 auto;
	}
	.index-list{padding-top: 30px;}
	.index-list h3{font-size: 26px;}
	.index-list .date{font-size: 12px;color: #ff3939;}
	.sku-item{padding:20px 0;border-bottom: 1px solid #e0e0e0;}
	.sku-item img{width:100%;height: 220px;border: none;}
	.sku-item .title{font-size:17px;margin-top: 8px;color: #2c3038;}
	.sku-item .desc{font-size:12px;color: #92969c;margin-top: 4px;}
</style>