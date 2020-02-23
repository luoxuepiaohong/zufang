<template>

    <div class="search-position">
    	<header class="search-position-header">
    		<div class="header-left" @click="areaShow = true"><i class="iconfont icon-weixin"></i>{{city}}</div>
    		<van-search v-model="searchVal" background="#5788e4" placeholder="请输入街道名" @search="getStreettList" />
        	<div class="header-right" @click="onCancel">取消</div>
    	</header>

    	<section class="search-position-container" v-if="streettList.length > 0">
    		<div class="street-item" v-for="(item, key) in streettList" :key="key" @click="onConfirmStreet(item)">
    			<!-- <span class="street-name">{{item.title}}</span> -->
    			<span class="street-address">{{item.address}}</span>
    		</div>
    	</section>

    	<section class="search-position-empty" v-else>
    		<span>找不到详细地址?</span>
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
    	name: 'SearchPosition',
    	data () {
	        return {
                city: '',       //城市
                cityCode: '',
                lat: 0,
                lng: 0,

                searchVal: '',  //搜索值
                streettList: [],

                areaShow: false,
                areaList: areaInfo 
	        }
	    },
        created(){
            this.city = this.$route.query.city;
            this.cityCode = String(this.$route.query.adcode);
            this.lat = this.$route.query.lat;
            this.lng = this.$route.query.lng;

            this.getStreettList('getAll');
        },
        methods:{
            
            // 获取街道列表
            getStreettList(type){
            	let url = "house/getMapStreetInfo";
	            let params = { 
	            	uid: 100118
	            };

                if(type == 'getAll'){           //根据经纬度获取附近所有列表
                        params.lat = this.lat;
                        params.lng = this.lng;
                }else{                          //根据搜索值获取符合条件的列表
                    params.city = this.city;
                    params.address = this.searchVal;
                }

                console.log(params);
	            this.$post(url, params).then((res) => {
	            	this.streettList = res.data;
	            })
            },

            // 选择小区（公寓）
            onConfirmStreet(item){
                this.$emit('confirmStreet',item);
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


                let _this = this;
                let citylocation = new qq.maps.CityService({
                    //请求成功回调函数
                    complete: function(result) {
                        _this.lat = result.detail.latLng.lat;
                        _this.lng = result.detail.latLng.lng;
                        _this.getStreettList('getAll');
                    },
                    error: function() {
                        alert("出错了，请输入正确的经纬度！！！");
                    }
                });
                citylocation.searchCityByName(this.city);
            	
            	this.areaShow = false;
            },
            onAreaCancel(){
            	this.areaShow = false;
            }
        }
    }
</script>

<style lang="scss">
	.search-position{
		position: fixed;
    	width: 100vw;
    	top: 0;
    	left: 0;
    	height: 100vh;
    	background: #f5f5f5;
    	z-index: 299;
    	.search-position-header{
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
    	.search-position-container{
    		height: calc(100vh - 54px);
    		overflow: scroll;
			.street-item{
				border-bottom: 1px solid #eee;
				background: #fff;
				display: flex;
				flex-flow: column;
				justify-content: space-between;
				padding: 15px;
				.street-name{

				}
				.street-address{
					font-size: 12px;
					color: #787878;
				}
			}
    	}
    	.search-position-empty{
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