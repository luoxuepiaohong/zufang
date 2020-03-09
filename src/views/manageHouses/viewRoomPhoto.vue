<template>
    <div class="view-room-photo">
        <van-nav-bar title="照片" left-arrow  @click-left="goPrevPage"></van-nav-bar>
        
        <section class="room-photo-list">
        	<van-image v-for="(item, key) in photoList" :key="key" :src="item" @click="lookPhoto(key)"/> 
        </section>

        <van-image-preview v-model="showPreview" :start-position="photoIndex" closeable :images="photoList"></van-image-preview>
    </div>
</template>

<script>

export default {
    name: 'ViewRoomPhoto',
    data () {
        return {
            photoList: [],

            showPreview: false,
            photoIndex: 0
        }
    },
    created(){
        if(this.$route.query && Object.keys(this.$route.query).length > 0){
            this.photoList = this.$route.query.imgList.map(item => item.url);
        }
    },
    methods: {
        // 返回上一页
        goPrevPage(){
            this.$router.back(-1);
        },

        // 放大预览图片
        lookPhoto(key){
        	this.photoIndex = key;
        	this.showPreview = true;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .view-room-photo{
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 399;  
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
        .room-photo-list{
            height: calc(100vh - 50px);
            overflow: scroll;
            width: 100%;
            padding-top: 8px;
            padding-left: 8px;
            .van-image{
            	width: calc(25vw - 10px);
            	height: calc(25vw - 10px);
            	margin-right: 8px;
            	margin-bottom: 3px;
            }
        }
    }
</style>
