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

            	<div class="main-info-linkman">
            		<div class="linkman-info">
            			<van-field v-model="text" label="姓名" placeholder="承租人姓名" clearable />
            			<van-field v-model="text" label="电话" type="tel" placeholder="承租人电话" clearable />
            		</div>
            		
            		<div class="linkman-icon">
            			<van-icon name="contact" />
            		</div>
            	</div>

            	<van-field v-model="text" label="身份证" type="number" placeholder="承租人身份证" />

            	<div class="main-info-card">
            		<span>身份证照片</span>
            		<div class="info-card-img">
            			<div class="info-card-img-item">
            				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584985802382&di=ced70a02584642eeb26b403c9dec5ee9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181212%2F513b69d9aed64cab850b48473eac3584.png" alt="">
            			</div>
            			<div class="info-card-img-item">
            				<img src="" alt="">
            			</div>
            		</div>
            	</div>
            </div>

            <!-- 房间配置 -->
	        <van-cell title="同住人(添加多个身份证或手机号)" class="cohabit" is-link to="roomConfig">
	            <van-icon slot="right-icon" name="add" />
	        </van-cell>
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
            text: '',
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
            		position: relative;
            		&:after{
            			position: absolute;
					    box-sizing: border-box;
					    content: ' ';
					    pointer-events: none;
					    right: 0;
					    bottom: 0;
					    left: 0px;
					    border-bottom: 1px solid #ebedf0;
					    -webkit-transform: scaleY(.5);
					    transform: scaleY(.5);
            		}
            		.main-title-right{
            			color: #5788e4;
            			.van-icon-scan{
            				margin-right: 5px;
            				font-size: 16px;
            				top: 3px;
            			}
            		}
            	}
            	.main-info-linkman{
            		display: flex;
            		position: relative;
            		&:after{
            			position: absolute;
					    box-sizing: border-box;
					    content: ' ';
					    pointer-events: none;
					    right: 0;
					    bottom: 0;
					    left: 16px;
					    border-bottom: 1px solid #ebedf0;
					    -webkit-transform: scaleY(.5);
					    transform: scaleY(.5);
            		}
            		
            		.linkman-info{
            			width: 80vw;

            		}
            		.linkman-icon{
            			width: 20vw;
            			background: #fff;
            			display: flex;
            			justify-content: center;
            			align-items: center;
            			color: #20a0ff;
            			font-size: 40px;
            		}
            	}
            	.main-info-card{
					display: flex;
					background: #fff;
					height: 50px;
					padding: 16px;
					align-items: center;
					justify-content: space-between;
					font-size: 14px;
					.info-card-img{
						height: 100%;
						width: 116px;
						display: flex;
						justify-content: space-between;
						.info-card-img-item{
							width: 50px;
							height: 100%;
							border-radius: 5px;
							background: #eee;
							img{
								border-radius: inherit;
						        height: 100%;
						        width: 100%;
						        object-fit: cover;
							}
						}
					}
            	}
            }
            .cohabit{
            	.van-cell__title{
					color: #999;
	            }
	            .van-icon-add{
		            font-size: 22px;
		            line-height: inherit;
		            color: #5788e4;
		        }
            }
            
        }
    }
</style>
