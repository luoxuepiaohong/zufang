<template>
    <div class="room-number-list">
        <van-nav-bar title="房号" left-arrow @click-left="goPrevPage" />
		
        <!-- 头部 -->
        <header class="list-header">
            <div class="list-header-left">
                <div class="header-left-icon"><i class="iconfont icon-bangongshichuzu-fanghao"></i></div>
                <div class="header-left-info">
                    <span class="header-info-title">白云山小区</span>
                    <span class="header-info-desc">住宅/小区/公寓</span>
                </div>
            </div>
            <div class="list-header-right" @click="goEditHouse">
                <i class="iconfont icon-bangongshichuzu-fanghao"></i>
            </div>
        </header>

        <!-- 添加房号 -->
        <router-link to="/addRoomNumber" class="list-header-add">
            <van-icon name="add" />添加房号
        </router-link>
        
        <!-- 房号列表 -->
        <ul class="room-list-container">
            <li class="room-item" @click="goTenantList()">
                <div class="item-left">
                    <div class="item-left-icon">
                        <i class="iconfont icon-bangongshichuzu-fanghao"></i>
                    </div>
                    <div class="item-left-content">
                        <span class="item-content-title">101</span>
                        <span class="item-content-desc"></span>
                    </div>
                    
                </div>
                <div class="item-right">
                    <div class="item-right-content">
                        <span class="idle">闲置</span>
                    </div>
                    <i class="iconfont icon-bangongshichuzu-fanghao"></i>
                </div>
            </li>
            <li class="room-item">
                <div class="item-left">
                    <div class="item-left-icon">
                        <i class="iconfont icon-bangongshichuzu-fanghao"></i>
                    </div>
                    <div class="item-left-content">
                        <span class="item-content-title">102</span>
                        <span class="item-content-desc">1房1厅1卫&ensp;250.00元/月</span>
                    </div>
                    
                </div>
                <div class="item-right">
                    <div class="item-right-content">
                        <span>租客：1</span>
                    </div>
                    <i class="iconfont icon-bangongshichuzu-fanghao"></i>
                </div>
            </li>
        </ul>
		
        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'RoomNumberList',
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
            this.$router.push({path: '/houseIndex'})
        }, 

        /*去往子页面*/
        // 去编辑房产
        goEditHouse(){
            this.$router.push({path: '/editHouse'})
        },
        // 去往租客列表页面
        goTenantList(){
            this.$router.push({path: '/tenantList'})
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .room-number-list{
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 99;  
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
        .list-header{
            height: 35px;
            background: #fff;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            .list-header-left{
                display: flex;
                align-items: center;
                .header-left-icon{
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #20a0ff;
                    border-radius: 3px;
                    color: #fff;
                    .iconfont{
                        font-size: 20px;
                    }  
                }
                .header-left-info{
                    height: 100%;
                    margin: 0 8px;
                    display: flex;
                    justify-content: space-between;
                    flex-flow: column;
                    .header-info-title{
                        font-size: 16px;
                        line-height: 1em;
                    }
                    .header-info-desc{
                        font-size: 12px;
                        color: #999;
                        line-height: 1em;
                    }
                }
            }
            .list-header-right{
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
        .list-header-add{
            background: #fff;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5788e4;
            margin: 7px 0;
            .van-icon{
                margin-right: 8px;
                font-size: 22px;
            }
        }

        /*列表*/
        .room-list-container{
            height: calc(100vh - 165px);
            overflow: scroll;
            .room-item{
                height: 30px;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #eee;
                background: #fff;
                &:last-child{
                    border-bottom: 0;
                }
                .item-left{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .item-left-icon{
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        border-radius: 2px;
                        background: #ccc;
                        color: #fff;
                        margin-right: 10px;
                        .iconfont{
                            font-size: 14px;
                        }
                    }
                    .item-left-content{
                        height: 100%;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        .item-content-title{
                            font-size: 14px;
                            line-height: 1em;
                        }
                        .item-content-desc{
                            font-size: 12px;
                            line-height: 1em;
                            color: #999;
                            margin-top: 6px;
                        }
                    }
                }
                .item-right{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .iconfont{
                        margin-left: 10px;
                        color: #999;
                    }
                    .item-right-content{
                        font-size: 14px;
                        color: #999;
                        .idle{
                            color: #FFB90F;
                        }
                    }
                }
            }
        }
    }
</style>
