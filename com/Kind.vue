<template>
	<div class="cate-list">
		<div class="cate-section" v-for="list in kindList">
			<p>{{list.name}}</p>
			<ul>
				<li  v-for="item in list.sub_category_list">
					<router-link :to="{name:'kind',params:{classID:item.id,cityID:item.city_id}}">
						{{item.name}}
					</router-link>
				</li>				
			</ul>
		</div>
	</div>
</template>

<script>
	import MyAjax from "./../md/MyAjax.js"
	export default {
		data(){
			return{
				kindList : []
			}
		},
		methods : {

		},
		mounted(){
			var that = this;
			var url = "https://s1.ricebook.com/cdn/home/djEvdmlydHVhbC9pbl9jYXRlZ29yeS5qc29uP2NpdHlfaWQ9MTA0JmlzX25ld19sb2NhbD1mYWxzZSZtZDU9NTcwOWI3NzAxNGRhM2UwOTNiZWRhY2FkNTA5MzgwZDgmMjAxNzA4MjEyMDAw.json";
			MyAjax.vueJson(url,function(data){
				console.log(data);
				that.kindList = data;
			})
		}
	}
	
</script>

<style scoped="scoped">
	.cate-list{width: 100%;}
	.cate-list p{padding: 10px 30px;background: #f6f6f6;}
	.cate-section ul{width:100%;overflow: hidden;}
	.cate-section ul li{width:33.3%;float: left;text-align: center;padding: 10px;border-bottom: 1px solid #e4e5e7;border-right: 1px solid #e4e5e7;box-sizing: border-box;font-size: 14px;}
	.cate-section ul li a{display:inline-block;width: 100%;height:100%;font-size: 14px;color: #2c3038;}
</style>