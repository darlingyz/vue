<template>
	<div class="cartFooter">
		<div class="allChecked">
			<span>
				<input type="checkbox"/>
			</span>
			<span>全选</span>
		</div>
		<div class="total">
			<span>合计:</span>
			<span>0元</span>
		</div>
		<span class="pay">去结算</span>
	</div>
</template>

<script>
	export default  {
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped="scoped">
	.cartFooter{
		display: flex;
		height: 100%;
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