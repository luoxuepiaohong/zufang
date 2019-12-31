<template>
    <div class="home-page">
        <van-nav-bar title="首页">
            <van-icon name="search" slot="left" @click.native="onClickLeft" />
        </van-nav-bar>
        <!-- 当月统计 -->
        <ul class="home-header">
            <li class="home-header-item">
                <span>0.00</span>
                <span>本月收入</span>
            </li>
            <li class="home-header-item">
                <span>0.00</span>
                <span>本月收入</span>
            </li>
            <li class="home-header-item">
                <span>0.00</span>
                <span>本月收入</span>
            </li>
        </ul>
        <!-- 账单与租客 -->
        <section class="quick-entry">
            <div class="quick-entry-item">
                <div class="entry-item-left">
                    <span class="entry-item-icon">
                        <i class="iconfont icon-zhangdan"></i>
                    </span>
                    <span class="entry-item-name">未收账单</span>
                </div>
            </div>
            <div class="quick-entry-item">
                <div class="entry-item-left">
                    <span class="entry-item-icon">
                        <i class="iconfont icon-zukehetong"></i>
                    </span>
                    <span class="entry-item-name">租客</span>
                </div>
                <div class="entry-item-right">1人</div>
            </div>
        </section>
        
        <!-- 双列宫格 -->
        <ul class="two-column-grid">
            <li class="two-column-grid-item">
                <div class="grid-item-top">
                    <i class="iconfont icon-zukeguanli"></i>
                    <span>到期租客</span>
                </div>
                <p class="grid-item-describe">暂无到期租客</p>
            </li>
            <li class="two-column-grid-item">
                <div class="grid-item-top">
                    <i class="iconfont icon-bangongshichuzu-fanghao"></i>
                    <span>闲置房号</span>
                </div>
                <p class="grid-item-describe">0间</p>
            </li>
        </ul>

        <!-- 三等分行 -->
        <ul class="three-row">
            <li class="three-row-item">
                <i class="iconfont icon-shouru"></i>
                <div class="row-item-character">
                    <span class="row-item-name">未付账单</span>
                    <span class="row-item-describe"></span>
                </div>
            </li>
            <li class="three-row-item">
                <i class="iconfont icon-shouru"></i>
                <div class="row-item-character">
                    <span class="row-item-name">业主</span>
                    <span class="row-item-describe">0人</span>
                </div>
            </li>  
            <li class="three-row-item">
                <i class="iconfont icon-shouru"></i>
                <div class="row-item-character">
                    <span class="row-item-name">到期业主</span>
                    <span class="row-item-describe">暂无到期业主</span>
                </div>
            </li> 
        </ul>

        <!-- 三列宫格 -->
        <ul class="three-column-grid">
            
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App-1111'
        }
    },
    methods: {
        onClickLeft() {
            this.$toast({
              message: '展示图片',
              icon: 'https://img.yzcdn.cn/vant/logo.png'
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .home-page{
        .van-nav-bar{
            background: #5788e4;
            .van-icon-search{
                color: #fff;
                font-size: 24px;
            }
            .van-nav-bar__title{
                color: #fff;
                font-size: 18px;
                font-weight: bold;
            }
        }
        .home-header{
            height: 90px;
            padding-top: 10px;
            background: #5788e4;
            display: flex;
            justify-content: space-around;
            margin-bottom: -30px;
            .home-header-item{
                width: 22%;
                height: 40px;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                color: #fff;
                font-size: 16px;
                span{
                    line-height: 1em;
                    &:last-child{
                        font-size: 12px;
                        color: #cad7fe
                    }
                }
            }
        }
        .quick-entry{
            width: calc(100% - 20px);
            margin: 0 10px;
            height: 60px;
            background: #fff;
            border-radius: 10px;
            border: 1px solid #eee;
            .quick-entry-item{
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 13px;
                box-sizing: border-box;
                border-right: 1px solid #f5f5f5;
                float: left;
                font-size: 13px;
                &:last-child{
                    border-right: 0;
                }
                .entry-item-left{
                    display: flex;
                    align-items: center;
                    .entry-item-icon{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 33px;
                        width: 33px;
                        border-radius: 50%;
                        background: linear-gradient(top left, #6cadff, #4481f6);
                        .iconfont{
                            color: #fff;
                        }
                    }
                    .entry-item-name{
                        margin-left: 11px;
                        color: #000;
                    }
                }
                .entry-item-right{
                    color: #636572;
                }
            }
        }
        .two-column-grid{
            overflow: hidden;
            clear: both;
            margin: 5px 0;
            .two-column-grid-item{
                width: 50%;
                height: 55px;
                float: left;
                background: #fff;
                border: 1px solid #f5f5f5;
                border-bottom: 0;
                border-left: 0;
                padding: 10px 18px 6px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-flow: column;
                &:nth-child(2n){
                    border-right: 0;
                }
                &:nth-child(-n+2){
                    border-top: 0;
                }
                .grid-item-top{
                    height: 21px;
                    display: flex;
                    align-items: center;
                    .iconfont{
                        font-size: 21px;
                        color: #fab251;
                        margin-right: 12px;
                    }
                    span{
                        font-size: 13px;
                        color: #000;
                    }
                }
                .grid-item-describe{
                    font-size: 12px;
                    color: #999;
                    margin-left: 33px;
                    line-height: 1em;
                }
            }
        }
        .three-row{
            overflow: hidden;
            clear: both;
            .three-row-item{
                height: 90px;
                width: calc(100%/3);
                background: #fff;
                float: left;
                padding: 16px 0 13px;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                .iconfont{
                    font-size: 22px;
                    color: #f78700;
                }
                .row-item-character{
                    height: 32px;
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #000;
                    span{
                        line-height: 1em;
                        &:last-child{
                            font-size: 12px;
                            color: #848484;
                        }
                    }
                }
            }
        }
    }
</style>
