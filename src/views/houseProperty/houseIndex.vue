<template>
    <div class="house-index">
        <van-nav-bar title="房产">
            <van-icon name="search" slot="left" @click.native="onClickLeft" />
            <span slot="right" class="nav-bar-right" @click="onClickLeft">管理</span>
        </van-nav-bar>
        <!-- 添加房产 -->
        <router-link to="/addHouse" class="header-add">
	        <van-icon name="add" />添加房产
        </router-link>
		
		<van-pull-refresh class="list-container" v-model="isLoading" @refresh="onRefresh">
	        <ul>
	        	<li>
	        		<van-swipe-cell>
					  	<van-cell title="赛格广场" center is-link to="/roomNumberList">
                            <div slot="label">共<span class="mark">30</span>间住宅，闲置<span class="mark">30</span>间</div>
                        </van-cell>
						<template slot="right">
						    <van-button square type="danger" text="删除" />
						</template>
					</van-swipe-cell>
	        	</li>
	        	<li>
	        		<van-swipe-cell>
					  	<van-cell title="赛格广场" center is-link to="/roomNumberList">
                            <div slot="label">共<span class="mark">30</span>间住宅，闲置<span class="mark">30</span>间</div>                
                        </van-cell>
						<template slot="right">
						    <van-button square type="danger" text="删除" />
						</template>
					</van-swipe-cell>
	        	</li>
	        	<li>
	        		<van-swipe-cell>
					  	<van-cell title="赛格广场" center is-link to="/roomNumberList">
                            <div slot="label">共<span class="mark">30</span>间住宅，闲置<span class="mark">30</span>间</div>
                        </van-cell>
						<template slot="right">
						    <van-button square type="danger" text="删除" />
						</template>
					</van-swipe-cell>
	        	</li>
	        </ul>
	    </van-pull-refresh>
        

		<!-- 底部导航 -->
        <footerNav></footerNav>

        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import footerNav from "@/components/footerNav"

export default {
    name: 'HouseIndex',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App-1111',
            isLoading: false
        }
    },
    components: { footerNav },
    methods: {
        onClickLeft() {
            this.$toast({
              message: '展示图片',
              icon: 'https://img.yzcdn.cn/vant/logo.png'
            });
        },
        onRefresh() {
		    setTimeout(() => {
		        this.$toast('刷新成功');
		        this.isLoading = false;
		    }, 500);
	    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .house-index{
    	height: 100vh;
    	background: #f5f5f5;
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
            .nav-bar-right{
            	color: #fff;
            	font-size: 16px;
            }
        }
        .header-add{
        	background: #fff;
        	height: 40px;
        	display: flex;
        	align-items: center;
        	justify-content: center;
        	color: #5788e4;
        	margin-bottom: 5px;
        	.van-icon{
        		margin-right: 8px;
        		font-size: 22px;
        	}
        }
        .list-container{
        	height: calc(100vh - 141px);
        	ul{
        		height: calc(100vh - 141px);;
        		overflow: scroll;
                .mark{
                    color: #f00;
                }
        	}
        }
    }
</style>
