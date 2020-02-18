<template>

    <div class="select-position">
    	<van-nav-bar title="详细地址" left-arrow  @click-left="goPrevPage">
            <i slot="right" class="nav-bar-right iconfont icon-weixin" @click="onSearch"></i>
        </van-nav-bar>

        <section class="select-position-container">
            <div id="container"></div>
            <div class="position-box">番禺区东环街道清河横街27号</div>
            <div class="confirm-btn">确定</div>
        </section>
    </div>
</template>

<script>
	import areaInfo from '@/common/js/area'
    export default{
    	name: 'SelectPosition',
    	data () {
	        return {
	            
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
                this.setMap(position.lat,position.lng);
            },
            // 定位失败
            showErr() {
                console.log("定位失败");
                this.getMyLocation();  //定位失败再请求定位，测试使用
            },
            setMap(lat,lng) {
                var myLatlng = new qq.maps.LatLng(lat,lng);
                //定义工厂模式函数
                var myOptions = {
                    zoom: 18,                   //设置地图缩放级别
                    center: myLatlng,           //设置中心点样式
                    zoomControl: false,         //地图缩放控件，若为false则不显示缩放控件
                    mapTypeControl: false       //地图类型控件，若为false则停用状态地图类型控件
                }
                // //获取dom元素添加地图信息
                var map = new qq.maps.Map(document.getElementById("container"), myOptions);
                //给定位的位置添加图片标注
                var marker = new qq.maps.Marker({
                    position: myLatlng,
                    map: map
                });
                //给定位的位置添加文本标注
                var marker = new qq.maps.Label({
                    position: myLatlng,
                    map: map,
                    content:'这是我当前的位置，偏差有点大，哈哈'
                });
            },


            goPrevPage(){
                this.$router.back(-1);
            },

            // 去往搜索页面
            onSearch(){

            },
        }
    }
</script>

<style lang="scss">
	.select-position{
		position: fixed;
    	width: 100vw;
    	top: 0;
    	left: 0;
    	height: 100vh;
    	background: #f5f5f5;
    	z-index: 299;
        .van-nav-bar{
            background: #5788e4;
            .van-icon-arrow-left:before{
                color: #fff;
            }
            .van-nav-bar__title{
                color: #fff;
                font-size: 18px;
                font-weight: bold;
            }
            .nav-bar-right{
                color: #fff;
                font-size: 16px;
            }
        }
        .select-position-container{
            width: 100vw;
            height: calc(100vh - 46px);
            position: relative;
            #container{
                width: 100%;
                height: 100%;
            }
            .position-box{
                position: absolute;
                width: calc(100% - 40px);
                bottom: 60px;
                left: 20px;
                height: 40px;
                line-height: 42px;
                border-radius: 3px;
                background: #fff;
                padding-left: 10px;
                box-shadow: 0 0px 5px #ddd;
                font-size: 14px;
                color: #666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .confirm-btn{
                position: absolute;
                width: calc(100% - 40px);
                bottom: 10px;
                left: 20px;
                height: 40px;
                line-height: 42px;
                border-radius: 3px;
                background: #5788e4;
                color: #fff;
                text-align: center;
            }
        }
	}
</style>