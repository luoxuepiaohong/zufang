<template>
    <div class="account-list">
        <van-nav-bar title="收款账户" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveSelect">保存</span>
        </van-nav-bar>

        <!-- 添加收款账户 -->
        <section class="header-add" @click="sheetShow = true"><van-icon name="add" />添加收款账户</section>
		
        <!-- 账户列表 -->
        <van-list class="list-container" v-model="loading" :finished="finished" :offset="100" finished-text="没有更多了" @load="onLoad">
        	<van-radio-group v-model="radio">
		        <ul>
                    <li v-for="(item, key) in accountList" :key="key">
                        <van-swipe-cell>
                            <van-cell clickable @click="radio = item.id">
                                <span slot="title" v-if="item.type == 1">{{item.bank}}<i class="iconfont icon-yinlian"></i></span>
                                <span slot="title" v-if="item.type == 2">微信<i class="iconfont icon-weixin"></i></span>
                                <span slot="title" v-if="item.type == 3">支付宝<i class="iconfont icon-umidd17"></i></span>
                                <van-radio slot="right-icon" :name="item.id" />
                                <span slot="label" v-if="item.type == 1">{{item.card_no}}</span>
                                <span slot="label" v-if="item.type == 2">{{item.weixin}}</span>
                                <span slot="label" v-if="item.type == 3">{{item.alipay}}</span>
                            </van-cell>
                            <template slot="right">
                                <van-button square type="info" @click.native="editAccount(item)" text="修改"/>
                                <van-button square type="danger" @click.native="delAccount(item.id)" text="删除" />
                            </template>
                        </van-swipe-cell>
                    </li>
		        </ul>
	        </van-radio-group>
        </van-list>

	    <!-- 账户类型 -->
        <van-action-sheet
          v-model="sheetShow"
          :actions="actions"
          cancel-text="取消"
          @cancel="sheetShow = false"
          @select="onSelect"
        />

        <transition name="slide-right" mode="out-in">
            <router-view v-on:listenDelAccount="delAccount" v-on:listenSaveAccount="saveAccount"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'AccountList',
    data () {
        return {
            loading: false,
            finished: false,


            radio: '',
            sheetShow: false,
            actions: [
                { name: '银行卡', type: 1 },
                { name: '微信', type: 2 },
                { name: '支付宝', type: 3 },
                { name: '其他', type: 4 }
            ],

            accountList: [],

            skip: 0,
            limit: 10,
        }
    },
    created(){

    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            this.getAccountList();
        },

        // 获取账户列表
        getAccountList(){
            let url = "Gettype/index";
            let params = { 
                uid: 100118,
                skip: this.skip, 
                limit: this.limit 
            };

            this.$post(url, params).then((res) => {
                //返回数据的格式
                this.accountList = res.data;
            });
        },

        // 选择收款账户类型
        onSelect(item){
            this.sheetShow = false;

            let jumpPath = this.$router.history.current.name == 'AccountList' ? '/addAccount' : 'editOfaddAccount';
            this.$router.push({path:  jumpPath, query: item})
        },

        // 编辑收款账户
        editAccount(item){
            let jumpPath = this.$router.history.current.name == 'AccountList' ? '/addAccount' : 'editOfaddAccount';
            this.$router.push({path: jumpPath, query: item})
        },

        // 删除收款账户
        delAccount(id){
            // 获取该账户所处的数组下标
            let index = this.accountList.findIndex(item => item.id == id);

            let url = "Gettype/delType";
            let params = { uid: 100118, id: id };

            this.$post(url, params).then((res) => {
                //返回数据的格式
                if(res.code == 1){
                    this.accountList.splice(index,1); 
                }
            });
        },

        // 监听编辑账户事件
        saveAccount(obj){
            let index = this.accountList.findIndex(item => item.id == obj.id);
            index > -1 ? (this.accountList[index] = obj) : this.accountList.unshift(obj);
        },

        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/addHouse'})
            this.$router.back(-1);
        },
        // 滚动加载
        onLoad() {
            // 异步更新数据
            this.skip++;
            let url = "Gettype/index";
            let params = { 
                uid: 100118,
                skip: this.skip, 
                limit: this.limit 
            };

            this.$post(url, params).then((res) => {
                //返回数据的格式
                this.accountList = [...this.accountList, ...res.data];
                // 去重
                this.accountList = Array.from(new Set([...this.accountList]));
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if(res.data.length < this.limit){ 
                    this.finished = true; 
                }
            });
        },

        // 保存
        saveSelect(){
            if(this.radio == ''){ return this.$toast.fail('请选择收款账户'); }

            this.$emit('selectAccount', this.radio);
            this.$router.push({path: '/addHouse'})
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
            overflow: scroll;
        	ul{
        		height: calc(100vh - 141px);;
        		overflow: scroll;
        		.van-cell{
        			border-radius: 5px;
        			margin-bottom: 10px;
                    .iconfont{
                        margin-left: 5px;
                        &.icon-yinlian{
                            color: #999;
                        }
                        &.icon-weixin{
                            color: rgb(97, 186, 70);
                        }
                        &.icon-umidd17{
                            color: rgb(18, 150, 219);
                        }
                    }
        		}
        		.van-button{
    				height: 100%;
    			}
        		
        	}
        }
    }
</style>
