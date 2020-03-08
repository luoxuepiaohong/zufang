<!-- 账单 -->
<template>
    <div class="bill-list">
        <van-nav-bar title="账单" left-arrow  @click-left="goPrevPage"></van-nav-bar>

        <!-- 头部 -->
        <header class="bill-list-header">
            <div class="bill-list-header-left">
                <div class="bill-header-left-icon">黄</div>
                <div class="bill-header-left-info">
                    <span class="bill-header-info-title">黄先生</span>
                    <span class="bill-header-info-desc">13800138000</span>
                </div>
            </div>
            <div class="bill-list-header-right">
                <i class="iconfont icon-bangongshichuzu-fanghao"></i>
            </div>
        </header>
		
        <transition name="slide-right" mode="out-in">
            <router-view ></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'BillList',
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

        /*去往子页面*/
        // 去往房号详情页面
        // goRoomDetails(){
        // 	this.$router.push({path: '/roomDetails'})
        // },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .bill-list{
    	background: #f5f5f5;
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
        
        /*头部*/
        .bill-list-header{
            height: 35px;
            background: #fff;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            .bill-list-header-left{
                display: flex;
                align-items: center;
                .bill-header-left-icon{
                    width: 40px;
                    height: 40px;
                    line-height: 42px;
                    text-align: center;
                    background: #20a0ff;
                    border-radius: 50%;
                    color: #fff;
                    .iconfont{
                        font-size: 20px;
                    }  
                }
                .bill-header-left-info{
                    height: 100%;
                    margin: 0 10px;
                    display: flex;
                    justify-content: space-between;
                    flex-flow: column;
                    .bill-header-info-title{
                        font-size: 16px;
                        line-height: 1em;
                    }
                    .bill-header-info-desc{
                        font-size: 14px;
                        color: #20a0ff;
                        text-decoration: underline;
                        line-height: 1em;
                    }
                }
            }
            .bill-list-header-right{
                width: 35px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                background: #eee;
                border-radius: 50%;
                color: #20a0ff;
                .iconfont{
                    font-size: 20px;
                }
            }
        }
    }
</style>
