<template>
    <div class="home-page">
        <van-nav-bar title="首页">
            <van-icon name="search" slot="left" @click.native="onClickLeft" />
        </van-nav-bar>
        <!-- 当月统计 -->
        <ul class="home-header">
            <li>
                <span>0.00</span>
                <span>本月收入</span>
            </li>
            <li>
                <span>0.00</span>
                <span>本月收入</span>
            </li>
            <li>
                <span>0.00</span>
                <span>本月收入</span>
            </li>
        </ul>
        <!-- 账单与租客 -->
        <section class="quick-entry">
            <div class="quick-entry-item">
                <div><i class="iconfont "></i></div>
            </div>
            <div class="quick-entry-item">
                <div><i class="iconfont "></i></div>
                <div>1人</div>
            </div>
        </section>

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
            li{
                width: 22%;
                background: #20a0ff;
                height: 40px;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                color: #fff;
                font-size: 14px;
                span{
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
            transform: translateY(-50%);
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 3px 5px #CCC;
            .quick-entry-item{
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 13px;
                box-sizing: border-box;
            }
        }
    }
</style>
