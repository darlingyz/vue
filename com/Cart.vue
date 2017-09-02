<template>
	<div>
	<ul class="cart_content" v-if="show">
		<li v-for="(list,index) in cartData">
			<span class="iconfont check">
				<input type="checkbox" @click="check(index)" :checked="money[index].s"/>
			</span>
			<img :src="list.img_url"/>
			<div class="desc">
				<div class="title">{{list.name}}</div>
				<div class="price">单价：{{list.price}}元</div>
				<div class="opotion">
					<span class="minus" @click="minus(list,index)">-</span>
					<span class="count">{{list.num}}</span>
					<span class="plus" @click="plus(list,index)">+</span>
					<span class="delete iconfont" @click="del(index)">&#xe76b;</span>
				</div>
			</div>
		</li>
	</ul>
	<div id="cart_empty" v-else="!show">
		<div id="kong">
			<div class="iconfont">	
			</div>
			<span>
				购物车为空
			</span>	
		</div>
	</div>
	<div class="cartFooter">
		<div class="allChecked">
			<span>
				<input type="checkbox" @click="checkedAll()" v-model="checkAll"/>
			</span>
			<span>全选</span>
		</div>
		<div class="total">
			<span>合计:</span>
			<span>{{totalMoney}}元</span>
		</div>
		<span class="pay">去结算</span>
	</div>
	</div>
</template>

<script>
	import MyAjax from "./../md/MyAjax";
	import "./../scss/cart.scss";
	export default {
		data(){
			return {
				cartData : [],
				show : true,
				money : [],
				totalMoney : 0,
				flag : '',
				checkAll : false
			}
		},
		
		methods : {
			countMoney(){
				this.totalMoney = 0;
				for(let i=0; i < this.money.length; i++){
					if(this.money[i].s){
						this.totalMoney += this.money[i].m;
						console.log(this.totalMoney)
					}
				}
			},
			checkedAll(){
				if(this.checkAll){
					this.checkAll = false;
				}else{
					this.checkAll = true;
				}
				for(let i = 0; i < this.money.length; i++){
					this.money[i].s = this.checkAll;
				}
				this.countMoney();
			},
			check(index){
				var num = 0;
				if(this.money[index].s == false){
					this.money[index].s = true;
				}else{
					this.money[index].s = false
				}
				for(let i = 0; i < this.money.length; i++){
					if(this.money[i].s){
						num++
					}
				}
				console.log(num,this.money.length)
				if(num==this.money.length){
					console.log("true")
					this.checkAll = true;
				}else{
					this.checkAll = false;
				}
				this.countMoney();
			},
			minus(item,index){
				//改变view;
				var cartData = this.cartData;
				console.log(cartData)
				var num = cartData[index].num;
				if(num>1){
					num--;
					cartData[index].num = num;
					//改变localstorage;
					var cart_data = JSON.parse(localStorage.getItem("cart"));
					cart_data[index].num = num;
					localStorage.setItem("cart",JSON.stringify(cart_data));
				}
				this.cartData = cartData;
				console.log(item)
				this.money[index].m = item.num*item.price;
				this.countMoney();
		//		console.log(this.money)
			},
			plus(item,index){
				var cartData = this.cartData;
				var num = cartData[index].num;
				num++;
				cartData[index].num = num;
				//改变localstorage;
				var cart_data = JSON.parse(localStorage.getItem("cart"));
				cart_data[index].num = num;
				localStorage.setItem("cart",JSON.stringify(cart_data));
				this.cartData = cartData;
				this.money[index].m = item.num*item.price;
				this.countMoney();
			},
			del(index){
				
				console.log(index);
				//改变view;
				var cartData = this.cartData;
				cartData.splice(index,1);
				this.cartData = cartData;
				//改变localStorage;
				var cart_data = JSON.parse(localStorage.getItem("cart"));
				if(cart_data.length==1){
					localStorage.removeItem("cart")
				//	localStorage.clear("cart");
				}else{
					cart_data.splice(index,1);
					localStorage.setItem("cart",JSON.stringify(cart_data));
				}
		//		this.countMoney();
				
			}
		},
		mounted(){
			var arr=JSON.parse(localStorage.getItem("cart"));
			console.log(arr)
			if(!arr){
				this.show=false;
			}else if(arr.length==0){
				this.show = false;
			}
			
			
			var cart_data = JSON.parse(localStorage.getItem("cart"));
		//	this.cartData = cart_data;
		//	console.log(cart_data)
			var arr = [];
			for (let i in cart_data){
				var productID = cart_data[i].id;
				console.log(productID)
				let num = cart_data[i].num;
				console.log(num)
				if(productID.length==7){
					var url = "https://api.ricebook.com/product/info/product_detail.json?product_id="+productID;
				}else{
					var url = "https://api.ricebook.com/product/info/product_detail.json?product_"+productID;
				}
				
				var that = this;
				MyAjax.vueJson(url,function(data){
					console.log(data)
				//	var cityID = 
					var name = data.basic.name;
					var price = data.basic.price/100;
					var img_url = data.basic.product_images[0].img_url;
					var obj = {
						productID : productID,
						num : num,
						name : name,
						price : price,
						img_url : img_url
					}
					arr.push(obj); 
					that.money[i] = {
						s:false,
						m:num*price
					}
				},function(err){
					console.log(err)
				})
				this.cartData = arr;
				//给input框遍历加上状态
//				for(let i=0;i<this.cartData.length;i++){
//	                this.Money[i]={
//	                    s:false,
//						m:this.cartData[i].num*(this.cartData[i].price)
//						//.substring(1)
//					}
//				}
				console.log(this.cartData);
				console.log(this.money)
			}	
		},

		
	}
</script>

<style scoped="scoped">
	.cartFooter{
		position: fixed;
		width: 100%;
		height: 50px;
		display: flex;
		bottom: 0;
		color: #ff3939;
	}
	.allChecked{
		flex:1;
		text-align: center;
		line-height: 50px;
		span{
			font-size: 14px;
		}
	}
	.total{
		flex : 1;
		text-align: center;
		line-height: 50px;
	}
	.total span:first-child{font-size: 14px;}
	.pay{
		width:150px;
		height: 100%;
		text-align: center;
		line-height: 50px;
		background: #ff3939;
		color: #FFFFFF;
		font-size: 20px;
	}
	span{
		display: inline-block;
	}
</style>