<template>
	<div id="dis_Cont">
		<div class="titles">
			<h2>今日推荐</h2>
			<p>每天告诉你大家爱吃的和最近值得吃的</p>
		</div>
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in picList.tabs">
					<img v-bind:src=item.url>
					<span>{{item.tag}}</span>
					<h3>{{item.title}}</h3>
					<p>{{item.desc}}</p>
				</div>
			</div>
			<div class="paginations"></div>
		</div>

		<div id="other_list">
			<div class="swiper-containers">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in picList1.tabs">
						<img lazy="loaded" src="https://image.ricebook.com/business/20373785523424?imageView2/2/w/325">
						<h4>{{item.title}}</h4>
						<p>{{item.desc}}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="choicelist">
			<div class="choic">
				<h5>{{picDetial.title}}</h5>
				<span>{{picDetial.enjoy_url_text}}</span>
 			</div>
			<p>{{picDetial.desc}}</p>
			<ul>
				<li v-for="item in picList2.tabs">
					<img v-bind:src=item.url>
				</li>
			</ul>
		</div>
		
		<div class="choicelist">
			<div class="choic">
				<h5>{{picDetial3.title}}</h5>
				<span>{{picDetial3.enjoy_url_text}}</span>
 			</div>
			<p>{{picDetial3.desc}}</p>
			<ul>
				<li v-for="item in picList3.tabs">
					<img v-bind:src=item.url>
				</li>
			</ul>
		</div>
		
		<div class="choicelist">
			<div class="choic">
				<h5>{{picDetial4.title}}</h5>
				<span>{{picDetial4.enjoy_url_text}}</span>
 			</div>
			<p>{{picDetial4.desc}}</p>
			<ul>
				<li v-for="item in picList4.tabs">
					<img v-bind:src=item.url>
				</li>
			</ul>
		</div>
 
	 

	</div>
</template>

<script>
	import MyAjax from "./../md/MyAjax.js";
	import "./../scss/kind.scss" 
 	export default {
		data() {
			return {
				picList: [],
				picList1: [],
				picList2: [],
				picDetial: [],
				picList3: [],
				picDetial3: [],
				picList4: [],
				picDetial4: []
			}
		},

		mounted() {
			var that = this;
			var url = "https://api.ricebook.com/hub/home/v1/web/explore.json?city_id=140";
			MyAjax.vueJson(url, function(data) {
				console.log(data[1].data)
				that.picList = data[0].data;
				that.picList1 = data[1].data;
				that.picList2 = data[2].data;
				that.picDetial = data[2].data.group_section;

				that.picList3 = data[3].data;
				that.picDetial3 = data[3].data.group_section;

				that.picList4 = data[4].data;
				that.picDetial4 = data[4].data.group_section;
				
			}, function(err) {
				console.log(err)
			});
			
 		},
 		updated(){
 			var swiper = new Swiper('.swiper-container', {
				observer: true,
				pagination: '.paginations',
				paginationType: 'fraction',

			});

			var swipers = new Swiper('.swiper-containers', {
				slidesPerView: 2,
				paginationClickable: true,
				spaceBetween: 10,
				freeMode: true
			});
 		}
	}
</script>

<style scoped>
	.swiper-container-horizontal>.swiper-pagination-bullets,
	.swiper-pagination-custom,
	.swiper-pagination-fraction {
  		position: absolute;
 		top: -3rem;
		right: 3rem;
		z-index: 100;
	}
</style>