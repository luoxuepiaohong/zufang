<template>
    <div class="account-list">
        <van-nav-bar title="收款账户" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right">保存</span>
        </van-nav-bar>

        <!-- 添加收款账户 -->
        <section class="header-add"><van-icon name="add" />添加收款账户</section>
		
        <!-- 账户列表 -->
        <van-pull-refresh class="list-container" v-model="isLoading" @refresh="onRefresh">
        	<van-radio-group v-model="radio">
		        <ul>
		        	<li>
		        		<van-swipe-cell>
						  	<van-cell clickable @click="radio = '1'">
						  		<span slot="title">微信</span>
						  		<van-radio slot="right-icon" name="1" />
						  		<span slot="label">qiao896388123</span>
						  	</van-cell>
							<template slot="right">
								<van-button square type="info" text="修改"/>
							    <van-button square type="danger" text="删除" />
							</template>
						</van-swipe-cell>
		        	</li>
		        	<li>
		        		<van-swipe-cell>
						  	<van-cell clickable @click="radio = '2'">
						  		<span slot="title">支付宝</span>
						  		<van-radio slot="right-icon" name="2" />
						  		<span slot="label">13800138000</span>
						  	</van-cell>
							<template slot="right">
								<van-button square type="info" text="修改"/>
							    <van-button square type="danger" text="删除" />
							</template>
						</van-swipe-cell>
		        	</li>
		        </ul>
	        </van-radio-group>
	    </van-pull-refresh>

	    <!-- 账户类型 -->
        <van-popup v-model="popupStatus" position="bottom">
            <van-picker :columns="columns" @cancel="floorShow = false" />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'AccountList',
    data () {
        return {
           isLoading: false,
           radio: '1',
           popupStatus: false,
           columns: ['银行卡','微信','支付宝','其他']
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            // this.getHouseList();
        },

        // getHouseList(){
        //     let url = "house/index";
        //     let params = { 
        //         uid: 100118,
        //         skip: this.page,
        //         limit: this.pageSize
        //     };
        //     this.$post(url, params).then((res) => {
        //         //返回数据的格式
        //         console.log(res);
        //     });
        // },

        // 返回上一页
        goPrevPage(){
            this.$router.push({path: '/addHouse'})
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
    .account-list{
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
        .header-add{
        	background: #fff;
        	height: 40px;
        	display: flex;
        	align-items: center;
        	justify-content: center;
        	color: #5788e4;
        	margin-bottom: 10px;
        	font-size: 14px;
        	.van-icon{
        		margin-right: 8px;
        		font-size: 18px;
        	}
        }
        .list-container{
        	height: calc(100vh - 96px);
        	padding: 0 10px;
        	ul{
        		height: calc(100vh - 141px);;
        		overflow: scroll;
        		.van-cell{
        			border-radius: 5px;
        			margin-bottom: 10px;
        		}
        		.van-button{
    				height: 100%;
    			}
        		
        	}
        }
    }
</style>
