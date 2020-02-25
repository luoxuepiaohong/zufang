<template>
    <div class="custom-config">
        <van-nav-bar title="自定义配置" left-arrow  @click-left="goPrevPage">
        	<span slot="right" class="nav-bar-right" @click="saveCustom">保存</span>
        </van-nav-bar>

        <section>
        	<van-swipe-cell v-for="(item, key) in disposeList" :key="key" class="config-list" :ref="'dispose' + key" :before-close="beforeClose">
	            <van-field v-model="item.name">
	                <i slot="left-icon" class="iconfont icon-weixin" @click="openSidebar(key)"></i>
	            </van-field>
	            <van-button slot="right" square text="删除" type="danger" @click="delDisposeItem(key)" />
	        </van-swipe-cell>
        </section>
    </div>
</template>

<script>

export default {
    name: 'CustomConfig',
    data () {
        return {
            disposeList:[],

        }
    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            this.getTags();
        },

        // 获取房间配置列表
        getTags(){
            let url = "house/getTags";
            let params = {
                uid: 100118,
                name: this.setVal
            }

            this.$post(url, params).then((res) => {
                this.disposeList = res.data;
            });
        },

        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/roomConfig'})
            this.$router.back(-1);
        },  

        // 打开单元格侧边栏
        openSidebar(key){
            let refArr = Object.keys(this.$refs).filter(item => item.indexOf("dispose") == 0)

            // 循环判断，打开某行侧边栏时，关闭其他的侧边栏
            for(let i in refArr){
                if(refArr[i] == 'dispose' + key){
                    this.$refs[refArr[i]][0].open('right');
                }else{
                    this.$refs[refArr[i]][0].close();
                }
            }
        },
        // 关闭单元格前的回调（若去掉该方法则 openSidebar 方法不生效）
        beforeClose({ position, instance }){
        },

        // 删除一项房间配置
        delDisposeItem(key){
            this.disposeList.splice(key,1); 

            let refArr = Object.keys(this.$refs).filter(item => item.indexOf("dispose") == 0)
            for(let i in refArr){
                if(this.$refs[refArr[i]].length > 0){
                    this.$refs[refArr[i]][0].close();
                }
            }
        },

        // 保存
        saveCustom(){
            // let 
            let url = "house/editTags";
            let params = {
                uid: 100118,
                tags: this.disposeList
            }

            const toast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '保存中...',
            });
            this.$post(url, params).then((res) => {
                toast.clear();
                
                this.$emit('refreshDisposeList');
                this.goPrevPage();
            });
        	
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .custom-config{
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 599;  
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

        .custom-config-list{
        	height: calc(100vh - 50px);
        	overflow: scroll;
        	.config-list{
	            .van-cell__value{
	                text-align: left;
	            }
	            .icon-weixin{
	                color: #f00;
	                margin-right: 10px;
	            }
	        }
        }
    }
</style>
