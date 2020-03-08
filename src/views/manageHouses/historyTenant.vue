<!-- 历史租客 -->
<template>
    <div class="history-tenant">
        <van-nav-bar title="历史租客" left-arrow  @click-left="goPrevPage"></van-nav-bar>
		
		<van-list class="history-tenant-list" v-model="loading" :finished="finished" :offset="100" finished-text="没有更多了" @load="onLoad">
        	<van-swipe-cell>
				<div class="history-tenant-item" @click="goBillList">
					<div class="tenant-item-left">
						<div class="tenant-item-left-icon">黄</div>
						<div class="tenant-item-left-content">
	            			<div class="tenant-item-content-info">黄某某</div>
	            			<div class="tenant-item-content-desc">
	            				<span>退房日期：2020-03-05</span>
	            				<span>东亚.世纪城-101</span>
	            			</div>
	            		</div>
					</div>
					<van-icon name="arrow" class="tenant-item-right" />
				</div>
				
				<template slot="right">
					<van-button square type="danger" text="删除" />
				</template>
			</van-swipe-cell>
		</van-list>
		
    
        <transition name="slide-right" mode="out-in">
            <router-view ></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'HistoryTenant',
    data () {
        return {
            loading: false,
            finished: false,

            tenantList: [],

            skip: 0,
            limit: 10,
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
        // 去往账单页面
        goBillList(){
        	this.$router.push({path: '/billList'})
        },
        
        // 滚动加载
        onLoad() {
            if(this.tenantList.length < this.limit){ return this.loading = false; }
            // 异步更新数据
            this.skip++;

            let url = "";
            let params = { 
                uid: 100118,
                skip: this.skip, 
                limit: this.limit 
            };

            this.$post(url, params).then((res) => {
                //返回数据的格式
                this.tenantList = [...this.tenantList, ...res.data];
                // 去重
                this.tenantList = Array.from(new Set([...this.tenantList]));
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
    .history-tenant{
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
        
        .history-tenant-list{
        	margin-top: 8px;
            height: calc(100vh - 54px);
            overflow: scroll;
            box-sizing: border-box;
            .history-tenant-item{
            	width: 100vw;
        		height: 80px;
        		padding: 8px 15px;
        		box-sizing: border-box;
        		display: flex;
        		align-items: center;
        		justify-content: space-between;
        		border-bottom: 1px solid #eee;
        		background: #fff;
        		&:last-child{
        			border-bottom: 0;
        		}
        		.tenant-item-left{
        			display: flex;
        			align-items: center;
        			height: 100%;
        			.tenant-item-left-icon{
        				height: 35px;
	        			width: 35px;
	        			line-height: 38px;
	        			text-align: center;
	        			color: #fff;
	        			border-radius: 50%;
						background: #5788e4;
						margin-right: 15px;
        			}
        			.tenant-item-left-content{
        				height: 100%;
        				display: flex;
        				flex-flow: column;
        				justify-content: space-between;
        				.tenant-item-content-desc{
        					height: 30px;
        					color: #ababab;
        					font-size: 12px;
        					display: flex;
        					justify-content: space-between;
        					flex-flow: column;
        					span{
        						line-height: 1em;
        					}
        				}
        			}
        		}
            }
            .van-button--danger{
    			height: 100%;
    		}
        }
    }
</style>
