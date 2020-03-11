<template>
    <div class="add-tenant">
        <van-nav-bar title="添加租客" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="nextPage">下一步</span>
        </van-nav-bar>
		
        <!-- 添加租客需要填写的资料容器 -->
        <section class="add-tenant-container">
        	<!-- 房产信息 -->
            <div class="house-name">东亚.世纪城-101</div>

            <!-- 租客主要信息 -->
            <div class="tenant-main-info">
            	<div class="main-info-title">
            		<span>承租人</span>
            		<span class="main-title-right" @click="clickScan"><van-icon name="scan" />识别身份证</span>
            	</div>
            </div>
        </section>
    
        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'AddTenant',
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
        	this.$dialog.confirm({
			  	title: '提醒',
			  	message: '信息尚未保存，是否离开页面'
			}).then(() => {
			  	this.$router.back(-1);
			}).catch(() => {
			  	// on cancel
			});
        },

        // 下一页
        nextPage(){

        },

        // 点击扫描
        clickScan(){
        	this.$toast('暂时不开放此功能');
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .add-tenant{
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
        
        .add-tenant-container{
            height: calc(100vh - 46px);
            overflow: scroll;
            .house-name{
            	height: 50px;
            	line-height: 50px;
            	background: #fff;
            	font-size: 14px;
            	padding: 0 15px;
            }
            .tenant-main-info{
            	margin: 8px 0;
            	.main-info-title{
            		height: 35px;
            		padding: 0 15px;
            		background: #fff;
            		display: flex;
            		justify-content: space-between;
            		align-items: center;
            		color: #999;
            		font-size: 14px;
            		.main-title-right{
            			color: #5788e4;
            			.van-icon-scan{
            				margin-right: 5px;
            				font-size: 16px;
            				top: 3px;
            			}
            		}
            	}
            }
        }
    }
</style>
