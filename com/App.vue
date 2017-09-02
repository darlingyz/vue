<template>
	<div class="container">
		<header class="header">
			<router-view name="header"></router-view>
		</header>
		<div id="content">
			<router-view @to-parent="getChildData"></router-view>
		</div>
		<footer class="footer" v-show="isshow">
			<router-view name="footer" :msg = "num"></router-view>
		</footer>
	</div>
</template>

<script>
	
	import MainFooter from "./MainFooter.vue";
	import Vue from "vue";
	export default {
		data(){
			return {
				productID:"",
				num:'1',
				isshow:true
			}
		},
		mounted(){
			this.changepath(this.$route.path)	
		},
		methods:{
			getChildData:function(msg){  //data就是子组件广播过来的数据
				//alert(msg);
				this.num=msg;
			},
			changepath(path){
				console.log(path)
				if(path.indexOf("kind")!=-1){
					this.isshow=false;
				}
				if(path.indexOf("detail")!=-1){
					this.isshow=true;
				}
				if(path.indexOf("list")!=-1){
					this.isshow=false;
				}
				if(path.indexOf("home")!=-1){
					this.isshow=true;
				}
				if(path.indexOf("discover")!=-1){
					this.isshow=true;
				}
				if(path.indexOf("invite")!=-1){
					this.isshow=true;
				}
				if(path.indexOf("my")!=-1){
					this.isshow=true;
				}
				if(path.indexOf("login")!=-1){
					this.isshow=false;
				}
				if(path.indexOf("cart")!=-1){
					this.isshow=false;
				}
			}
		},
		watch:{
			$route(to){
				console.log(to)
				this.changepath(to.path)
				
			}
			
		},
		components:{
			"v-footer":MainFooter
		}
		
	}
</script>

