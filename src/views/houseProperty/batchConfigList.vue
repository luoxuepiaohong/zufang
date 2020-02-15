<template>
    <div class="batch-config-list">
        <van-nav-bar title="房间配置" left-arrow @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveConfig">保存</span>
        </van-nav-bar>
        <!-- 添加房产 -->
        <router-link to="/batchConfigItem" class="header-add">
	        <van-icon name="add" />新增配置
        </router-link>
		
        <ul class="list-container">
        	<li class="list-container-item">
        		<div class="item-header">
        			<div class="item-header-title">配置1</div>
					
					<div class="item-header-btn">
						<span>删除</span>
        				<span>编辑</span>
					</div>
        		</div>
        		<ul class="item-info">
        			<li>
        				<span class="item-info-label">户型</span>
        				<span>1房1厅1卫</span>
        			</li>
        			<li>
        				<span class="item-info-label">面积</span>
        				<span>17</span>
        			</li>
        			<li>
        				<span class="item-info-label">月租金</span>
        				<span>280</span>
        			</li>
        			<li>
        				<span class="item-info-label">收租周期</span>
        				<span>付1押金自定义</span>
        			</li>
        		</ul>
        	</li>
        	<li class="list-container-item">
        		<div class="item-header">
        			<div class="item-header-title">配置2</div>
					
					<div class="item-header-btn">
						<span>删除</span>
        				<span>编辑</span>
					</div>
        		</div>
        		<ul class="item-info">
        			<li>
        				<span class="item-info-label">户型</span>
        				<span>1房1厅1卫</span>
        			</li>
        			<li>
        				<span class="item-info-label">面积</span>
        				<span>17</span>
        			</li>
        			<li>
        				<span class="item-info-label">月租金</span>
        				<span>280</span>
        			</li>
        			<li>
        				<span class="item-info-label">收租周期</span>
        				<span>付1押金自定义</span>
        			</li>
        		</ul>
        	</li>
        </ul>

        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'BatchConfigList',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App-1111',
            isLoading: false
        }
    },
    methods: {
        // 返回上一页
        goPrevPage(){
            this.$router.push({path: '/batchAddRoom'})
        }, 
        // 保存配置
        saveConfig(){

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
    .batch-config-list{
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 299;  
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
        	margin-bottom: 10px;
        	.van-icon{
        		margin-right: 8px;
        		font-size: 22px;
        	}
        }
        .list-container{
        	height: calc(100vh - 91px);
        	padding: 0 10px;
        	overflow: scroll;
        	.list-container-item{
        		margin-bottom: 10px;
        		background: #fff;
        		overflow: hidden;
        		height: 115px;
        		border-radius: 10px;
				padding: 0 10px;
				.item-header{
					height: 40px;
					font-size: 14px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					.item-header-title{
						padding-left: 8px;
						position: relative;
						&:before{
							content: ' ';
							position: absolute;
							top: 20%;
							left: 0;
							height: 65%;
							width: 1px;
							background: #20a0ff;
						}
					}
					.item-header-btn{
						color: #20a0ff;
						width: 70px;
						display: flex;
						justify-content: space-between;

					}
				}
				.item-info{
					font-size: 14px;
					li{
						width: 50%;
						float: left;
						margin: 10px 0;
						&:nth-child(-n+2){
							margin-bottom: 0;
						}
						.item-info-label{
							color: #999;
							display: inline-block;
							width: 60px;
						}
					}
				}
        	}
        }
    }
</style>
