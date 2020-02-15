<template>
    <div class="house-photo">
        <van-nav-bar title="照片" left-arrow  @click-left="goPrevPage"></van-nav-bar>
        
        <section class="house-photo-list">
            <van-uploader v-model="photoList" preview-size="calc(25vw - 10px)" multiple :after-read="afterRead" delete="deletePhoto" />
        </section>
    </div>
</template>

<script>

export default {
    name: 'HousePhoto',
    data () {
        return {
            photoList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                { url: 'https://cloud-image', isImage: true }
            ]
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
            // this.$router.push({path: '/addRoomNumber'})
            this.$router.back(-1);
        },

        // 存储sessionstorage
        afterRead(file){
            sessionStorage.setItem('photoList',JSON.stringify(this.photoList));
        },

        // 删除图片
        deletePhoto(file){
            console.log(file);
            sessionStorage.setItem('photoList',JSON.stringify(this.photoList));
        }

        
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .house-photo{
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
        .house-photo-list{
            height: calc(100vh - 50px);
            overflow: scroll;
            width: 100%;
            padding-top: 15px;
            padding-left: 8px;
        }
    }
</style>
