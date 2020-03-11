<template>
    <div class="tenant-list">
        <van-nav-bar title="租客" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="goHistoryTenant">历史租客</span>
        </van-nav-bar>
		
        <!-- 添加房产需要填写的资料容器 -->
        <section class="tenant-list-container">
            <header class="tenant-header">
            	<div class="house-name">东亚.世纪城</div>
            	<div class="room-info">
            		<div class="room-info-container">
            			<div class="room-info-left">
            				<div class="room-info-left-icon">招</div>
            				<div class="room-name">101</div>
            			</div>
            			<div class="room-info-right" @click="goRoomDetails">
            				<i class="iconfont icon-bangongshichuzu-fanghao"></i>
            			</div>
            		</div>
            		<ul class="room-operation-btn">
            			<li class="operation-btn-item">智能表</li>
            			<li class="operation-btn-item">发布</li>
            			<li class="operation-btn-item">分享</li>
            			<li class="operation-btn-item" @click="editRoom">修改</li>
            			<li class="operation-btn-item" @click="delRoom">删除</li>
            		</ul>
            	</div>
            </header>

            <router-link to="/addTenant" class="add-tenant-btn">
            	<van-icon name="add"  />添加租客
            </router-link>

            <ul class="tenant-list-show">
            	<van-swipe-cell>
					<div class="tenant-list-show-item">
						<div class="tenant-list-item-left">黄</div>
	            		<div class="tenant-list-item-content">
	            			<div class="list-item-content-info">黄某某<i class="iconfont icon-weixin"></i></div>
	            			<div class="list-item-content-time">2020-03-05至2022-03-04</div>
	            		</div>
					</div>
					
					<template slot="right">
						<van-button square type="danger" text="删除" />
					</template>
				</van-swipe-cell>
            </ul>
        </section>
    
        <transition name="slide-right" mode="out-in">
            <router-view v-on:getEditRoomData="getEditRoomData"></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'TenantList',
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
        // 去往历史租客页面
        goHistoryTenant(){
        	this.$router.push({path: '/historyTenant'})
        },
        // 去往房号详情页面
        goRoomDetails(){
        	this.$router.push({path: '/roomDetails'})
        },
        editRoom(){
        	this.$router.push({path: '/editRoom'})
        },

        // 删除房间
        delRoom(){
        	this.$dialog.confirm({
			  	title: '删除确认',
			  	message: `您确定要删除东亚-世纪城-101，同时将删除其全部租客及账单？`
			}).then(() => {
			  	// on confirm
			  	this.$toast.success('删除成功');
			}).catch(() => {
			  	// on cancel
			});
        },

        // 获取子页面数据
        getEditRoomData(data){
        	console.log(data);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .tenant-list{
    	background: #f5f5f5;
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 199;
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
        
        .tenant-list-container{
            height: calc(100vh - 46px);
            box-sizing: border-box;
            .tenant-header{
            	overflow: hidden;
            	clear: both;
            	margin-bottom: 8px;
            	.house-name{
            		height: 30px;
            		line-height: 30px;
            		font-size: 14px;
            		padding: 0 15px;
            		color: #676767;
            	}
            	.room-info{
            		height: 116px;
            		background: #fff;
            		.room-info-container{
            			height: 70px;
            			display: flex;
            			justify-content: space-between;
            			align-items: center;
            			padding: 0 15px;
            			border-bottom: 1px solid #eee;
            			.room-info-left{
            				display: flex;
            				align-items: center;
            				.room-info-left-icon{
            					width: 20px;
            					height: 20px;
            					line-height: 20px;
            					text-align: center;
            					border-radius: 2px;
            					background: #ccc;
            					color: #fff;
								font-size: 14px;
								margin-right: 15px;
            				}
            				.room-name{
            					line-height: 25px;
            				}
            			}
            			.room-info-right{
            				height: 35px;
            				width: 35px;
            				line-height: 35px;
            				text-align: center;
            				border-radius: 50px;
            				background: #ECF5FF;
            				i{
            					color: #5788e4;
            					font-size: 20px;
            				}
            			}
            		}
            		.room-operation-btn{
            			height: 46px;
            			padding: 8px 0px;
            			box-sizing: border-box;
            			display: flex;
            			.operation-btn-item{
            				height: 100%;
            				width: 20%;
            				font-size: 14px;
            				display: flex;
            				justify-content: center;
            				align-items: center;
            				border-right: 1px solid #eee;
            				&:last-child{
								border-right: 0;
            				}
            			}
            		}
            	}
            }
            .add-tenant-btn{
	            background: #fff;
	            height: 40px;
	            display: flex;
	            align-items: center;
	            justify-content: center;
	            color: #5788e4;
	            .van-icon{
	                margin-right: 8px;
	                font-size: 22px;
	            }
	        }
	        .tenant-list-show{
	        	height: calc(100% - 194px);
	        	overflow: scroll;
	        	.tenant-list-show-item{
	        		width: 100vw;
	        		height: 60px;
	        		padding: 8px 15px;
	        		box-sizing: border-box;
	        		display: flex;
	        		align-items: center;
	        		border-top: 1px solid #eee;
	        		background: #fff;
	        		.tenant-list-item-left{
	        			height: 35px;
	        			width: 35px;
	        			line-height: 38px;
	        			text-align: center;
	        			color: #fff;
	        			border-radius: 50%;
						background: #5788e4;
						margin-right: 10px;
	        		}
	        		.tenant-list-item-content{
	        			display: flex;
	        			justify-content: space-between;
	        			flex-flow: column;
	        			height: 100%;
	        			.list-item-content-info{
	        				font-size: 15px;
	        				i{
	        					margin-left: 5px;
	        					color: #ccc;
	        				}
	        			}
	        			.list-item-content-time{
	        				font-size: 12px;
	        				color: #ababab;
	        			}
	        		}
	        	}
	        	.van-button--danger{
        			height: 100%;
        		}
	        }
        }
    }
</style>
