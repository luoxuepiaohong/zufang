<template>
    <div class="room-details">
        <van-nav-bar title="房号详情" left-arrow  @click-left="goPrevPage"></van-nav-bar>
		
    
        <transition name="slide-right" mode="out-in">
            <router-view ></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'RoomDetails',
    data () {
        return {
            
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
        },

        // 返回上一页
        goPrevPage(){
            this.$router.back(-1);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .room-details{
    	background: #f5f5f5;
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
    }
</style>
