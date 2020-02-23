<template>
    <div class="select-position">
        <van-nav-bar title="详细地址" left-arrow  @click-left="goPrevPage">
            <i slot="right" class="nav-bar-right iconfont icon-weixin" @click="onSearch"></i>
        </van-nav-bar>

        <section class="select-position-container">
            <div id="container"></div>
            <div class="position-box">{{locationInfo.address}}</div>
            <div class="confirm-btn" @click="confirmPosition">确定</div>
        </section>

        <transition name="slide-right" mode="out-in">
            <router-view v-on:confirmStreet="confirmStreet"></router-view>
        </transition>
    </div>
</template>

<script>
    import areaInfo from '@/common/js/area'
    export default{
    	name: 'SelectPosition',
    	data () {
	        return {
	            

                locationInfo: {
                    address: '',
                    lat: 0,
                    lng: 0,
                    city: '',
                    adcode: ''
                },

                marker: '',
                map: ''
	        }
	    },
        created(){
            if(this.$route.query && Object.keys(this.$route.query).length > 0){

                this.locationInfo = this.$route.query;
                this.$nextTick(function() {
                    this.setMap(this.locationInfo.lat,this.locationInfo.lng);
                })
            }else{
                this.getMyLocation();
            }
        },
        methods:{
    
            //定位获得当前位置信息
            getMyLocation() {
                var geolocation = new qq.maps.Geolocation("ZHUBZ-2ZP6X-4NT45-TQ4W4-XNZME-6KFDC", "租房-定位");
                geolocation.getLocation(this.showPosition, this.showErr);
            },
            // 定位成功
            showPosition(position) {
                // console.log('position:',position);
                // this.locationInfo.lat = position.lat;
                // this.locationInfo.lng = position.lng;
                // this.locationInfo.city = position.city;
                // this.locationInfo.adcode = position.adcode;
                // // this.locationInfo.address = position.addr;

                // this.getAddress();
                // this.setMap(this.locationInfo.lat,this.locationInfo.lng);
            },
            // 定位失败
            showErr() {
                console.log("定位失败");
                this.getMyLocation();  //定位失败再请求定位，测试使用
            },
            setMap(lat,lng) {
                let myLatlng = new qq.maps.LatLng(lat,lng);
                //定义工厂模式函数
                var myOptions = {
                    zoom: 18,                   //设置地图缩放级别
                    center: myLatlng,           //设置中心点样式
                    zoomControl: false,         //地图缩放控件，若为false则不显示缩放控件
                    mapTypeControl: false       //地图类型控件，若为false则停用状态地图类型控件
                }
                // //获取dom元素添加地图信息
                this.map = new qq.maps.Map(document.getElementById("container"), myOptions);
                
                //给定位的位置添加圆形标注
                var circle=new qq.maps.Circle({
                    map: this.map,
                    center:myLatlng,
                    radius:4,
                    fillColor:"#5788e4",
                    strokeWeight: 2,
                    strokeColor: new qq.maps.Color(255,255,255,0.5),
                });
                // 设置地图中心的标注
                this.marker = new qq.maps.Marker({
                    position: myLatlng,
                    map: this.map,
                    animation: qq.maps.MarkerAnimation.DROP
                });

                qq.maps.event.addListener(this.map, 'center_changed', function() {
                    // 重新设置标注位置
                    this.marker.setPosition(this.map.getCenter());

                    this.locationInfo.lat = this.map.getCenter().lat;
                    this.locationInfo.lng = this.map.getCenter().lng;

                    this.getAddress();
                    
                    // 获取标注所在的经纬度地址
                    let _this = this;
                    let geocoder = new qq.maps.Geocoder({
                        complete: function(result){
                            _this.address = result.detail.address
                        }
                    });
                    geocoder.getAddress(this.map.getCenter());
                    
                }.bind(this));
            },
            // 根据经纬度获取地址回显
            getAddress(){
                let url = "house/getMapAddressInfo";
                let params = { 
                    uid: 100118,
                    lat: this.locationInfo.lat,
                    lng: this.locationInfo.lng
                };
                this.$post(url, params).then((res) => {
                    this.locationInfo.address = res.data;
                })
            },
            goPrevPage(){
                this.$router.back(-1);
            },
            // 去往搜索页面
            onSearch(){
                this.$router.push({path: '/searchPosition', query: this.locationInfo})
            },

            // 获取到街道数据
            confirmStreet(data){
                this.locationInfo.lat = data.location.lat;
                this.locationInfo.lng = data.location.lng;
                this.locationInfo.city = data.ad_info.city;
                this.locationInfo.adcode = data.ad_info.adcode;
                this.locationInfo.address = data.address;

                // 更改地图中心、标注位置
                this.map.panTo(new qq.maps.LatLng(this.locationInfo.lat,this.locationInfo.lng));
                this.marker.setPosition(new qq.maps.LatLng(this.locationInfo.lat,this.locationInfo.lng));
            },

            // 确定位置
            confirmPosition(){
                this.$emit('confirmStreet',this.locationInfo);
                this.goPrevPage();
            }
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
                box-sizing: border-box;
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
