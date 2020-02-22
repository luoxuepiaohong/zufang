<template>

    <div class="select-house">
    	<header class="select-house-header">
    		<div class="header-left" @click="areaShow = true"><i class="iconfont icon-weixin"></i>{{city}}</div>
    		<van-search v-model="searchVal" background="#5788e4" placeholder="请输入小区或公寓名" @search="getApartmentList" />
        	<div class="header-right" @click="onCancel">取消</div>
    	</header>

    	<section class="select-house-container" v-if="houseList.length > 0">
    		<div class="house-item" v-for="(item, key) in houseList" :key="key" @click="onConfirmHouse">
    			<span class="house-name">{{item.title}}</span>
    			<span class="house-address">{{item.address}}</span>
    		</div>
    	</section>

    	<section class="select-house-empty" v-else>
    		<span>找不到房产?</span>
    		<div class="add-btn">直接添加</div>
    	</section>
		
		<!-- 省市区级联选择器弹出层 -->
		<van-popup v-model="areaShow" position="bottom">
			<van-area :area-list="areaList" :columns-num="2" :value="cityCode" @confirm="onAreaConfirm" @cancel="onAreaCancel" />
		</van-popup>
    </div>
</template>

<script>
	import areaInfo from '@/common/js/area'
    export default{
    	name: 'SelectHouse',
    	data () {
	        return {
	            // longitude: 0,   //经度
                // latitude: 0,    //纬度
                city: '',       //城市
                searchVal: '',  //搜索值

                areaShow: false,
                cityCode: '',
                areaList: areaInfo,

                houseList: []
	        }
	    },
        mounted() {
            this.init();
        },
        methods:{
            init() {
                this.getMyLocation();
            },

            //定位获得当前位置信息
            getMyLocation() {
                var geolocation = new qq.maps.Geolocation("ZHUBZ-2ZP6X-4NT45-TQ4W4-XNZME-6KFDC", "租房-定位");
                // geolocation.getIpLocation(this.showPosition, this.showErr);
                geolocation.getLocation(this.showPosition, this.showErr);  //或者用getLocation精确度比较高
            },

            // 定位成功
            showPosition(position) {
            	console.log(position);
                // this.latitude = position.lat;
                // this.longitude = position.lng;
                this.city = position.city;
                this.cityCode = String(position.adcode);

                this.getApartmentList();
            },
            // 定位失败
            showErr() {
                console.log("定位失败");
                this.getMyLocation();  //定位失败再请求定位，测试使用
            },
            // 获取小区（公寓）列表
            getApartmentList(){
            	let url = "house/addressTolatlng";
	            let params = { 
	            	uid: 100118,
	                city: this.city,
	                address: this.searchVal
	            };

	            this.$post(url, params).then((res) => {
	            	this.houseList = res.data;
	            })
            },

            // 选择小区（公寓）
            onConfirmHouse(){
            	console.log('选择了');
            	this.onCancel();
            },

            // 取消搜索（返回上一页）
            onCancel(){
            	this.$router.back(-1);
            },

            // 确定更改城市
            async onAreaConfirm(value, index){
            	this.city = value[1].name;
            	this.cityCode = value[1].code;

            	this.searchVal = '';
            	this.getApartmentList();
            	this.areaShow = false;
            },
            onAreaCancel(){
            	this.areaShow = false;
            }
        }
    }
</script>

<style lang="scss">
	.select-house{
		position: fixed;
    	width: 100vw;
    	top: 0;
    	left: 0;
    	height: 100vh;
    	background: #f5f5f5;
    	z-index: 299;
    	.select-house-header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			height: 54px;
			background: #5788e4;
			.header-left{
				width: 80px;
				text-align: right;
				.iconfont{
					margin-right: 2px;
				}
			}
			.van-search{
				width: calc(100vw - 125px);
			}
			.header-right{
				width: 45px;
			}
    	}
    	.select-house-container{
    		height: calc(100vh - 54px);
    		overflow: scroll;
			.house-item{
				min-height: 45px;
				border-bottom: 1px solid #eee;
				background: #fff;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				padding: 8px 15px;
				.house-name{

				}
				.house-address{
					font-size: 12px;
					color: #787878;
				}
			}
    	}
    	.select-house-empty{
    		height: 60px;
    		padding: 10px;
    		display: flex;
    		flex-flow: column;
    		align-items: center;
    		justify-content: space-between;
    		background: #fff;
    		.add-btn{
    			background: #5788e4;
    			color: #fff;
    			border-radius: 3px;
    			padding: 2px 5px 3px;
    		}
    	}
	}
</style>