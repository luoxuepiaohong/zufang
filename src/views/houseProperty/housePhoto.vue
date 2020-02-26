<template>
    <div class="house-photo">
        <van-nav-bar title="照片" left-arrow  @click-left="goPrevPage"></van-nav-bar>
        
        <section class="house-photo-list">
            <van-uploader v-model="fileList" preview-size="calc(25vw - 10px)" multiple :after-read="afterRead" @delete="deletePhoto" />
        </section>
    </div>
</template>

<script>

export default {
    name: 'HousePhoto',
    data () {
        return {
            fileList: [],

            photoList: []
        }
    },
    created(){
        if(this.$route.query && Object.keys(this.$route.query).length > 0){
            this.photoList = this.$route.query.imgList;
            this.fileList = this.$route.query.imgList;
        }
    },
    methods: {
        // 初始化
        init(){
        },

        // 返回上一页
        goPrevPage(){
            this.$emit('getPhotoList',this.photoList);
            this.$router.back(-1);
        },

        // 存储sessionstorage
        afterRead(file){
            let url = "upload/imgUpload";
            let params = new FormData();

            if(file instanceof Array){          //多图上传
                const photoLen = this.photoList.length;

                for(let i=0; i<file.length; i++){
                    file[i].status = 'uploading';
                    file[i].message = '上传中...';
                    params.append('uid', 100118);  
                    params.append('file', file[i].file);
  
                    this.$post(url, params).then((res) => {
                        file[i].status = 'done';
                        this.photoList[photoLen + i] = { url: res.data.src };
                    });
                }
            }else{                              //单图上传
                file.status = 'uploading';
                file.message = '上传中...';

                params.append('uid', 100118);  
                params.append('file', file.file);

                this.$post(url, params).then((res) => {
                    file.status = 'done';
                    this.photoList.push( { url: res.data.src })
                });
            }
        },

        // 删除图片
        deletePhoto(file,detail){
            this.photoList.splice(detail.index, 1);
            console.log(this.photoList);
        },

         // 
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
