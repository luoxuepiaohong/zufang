<template>
    <div class="house-index">
        <van-nav-bar title="房产">
            <van-icon name="search" slot="left" />
            <span slot="right" class="nav-bar-right">管理</span>
        </van-nav-bar>
        <!-- 添加房产 -->
        <router-link to="/addHouse" class="header-add">
	        <van-icon name="add" />添加房产
        </router-link>
		
        <van-list class="list-container" v-model="loading" :finished="finished" :offset="100" finished-text="没有更多了" @load="onLoad">
	        <ul>
	        	<li v-for="(item, key) in houseList" :key="key">
	        		<van-swipe-cell>
					  	<van-cell :title="item.house_name" center is-link to="/roomNumberList">
                            <div slot="label">共<span class="mark">{{item.room_num}}</span>间住宅，闲置<span class="mark">{{item.idle_room_num}}</span>间</div>
                        </van-cell>
						<template slot="right">
						    <van-button square type="danger" text="删除" />
						</template>
					</van-swipe-cell>
	        	</li>
	        </ul>
        </van-list>
        

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
            skip: 0,
            limit: 10,
            loading: false,
            finished: false,

            houseList: []
        }
    },
    components: { footerNav },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            this.getHouseList();
        },

        // 获取房产列表
        getHouseList(){
            let url = "house/index";
            let params = { 
                uid: 100118,
                skip: this.skip, 
                limit: this.limit 
            };
            
            const toast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '加载中'
            });

            this.$post(url, params).then((res) => {
                this.$toast.clear();
                //返回数据的格式
                this.houseList = res.data;
            });
        },
        // 滚动加载
        onLoad() {
            if(this.houseList.length < this.limit){ return; }
            // 异步更新数据
            this.skip++;

            let url = "house/index";
            let params = { 
                uid: 100118,
                skip: this.skip, 
                limit: this.limit 
            };

            this.$post(url, params).then((res) => {
                //返回数据的格式
                this.houseList = [...this.houseList, ...res.data];
                // 去重
                this.houseList = Array.from(new Set([...this.houseList]));
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if(res.data.length < this.limit){ 
                    this.finished = true; 
                }
            });
        },
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
