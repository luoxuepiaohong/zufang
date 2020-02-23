<template>
    <div class="add-account">
        <van-nav-bar :title="titleType + '收款账户'" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveAcconut">保存</span>
        </van-nav-bar>
		
		<!-- 银行卡 -->
        <van-cell-group v-if="accountInfo.type == 1">
  			<van-field v-model="accountInfo.name" placeholder="请输入持卡人姓名" required label="持卡人" />
  			<van-field v-model="accountInfo.card_no" label="卡号" placeholder="请输入卡号" required right-icon="photograph" @click-right-icon="photograph" />
  			<van-field v-model="accountInfo.bank" placeholder="请输入开户行" required label="开户行" />
  			<van-field v-model="accountInfo.branch" placeholder="请输入开户支行" label="开户支行" />
		</van-cell-group>
		<!-- 微信 -->
		<van-cell-group v-if="accountInfo.type == 2">
  			<van-field v-model="accountInfo.weixin" placeholder="请输入微信号" required label="微信" />
		</van-cell-group>
		<!-- 支付宝 -->
		<van-cell-group v-if="accountInfo.type == 3">
  			<van-field v-model="accountInfo.alipay" placeholder="请输入支付宝账号" required label="支付宝" />
		</van-cell-group>
		<!-- 备注 -->
		<van-cell-group>
			<van-field
				v-model="accountInfo.remarks"
				rows="1"
				autosize
				label="备注"
				type="textarea"
				placeholder="请输入备注内容"
			/>
		</van-cell-group>
		
		<!-- 删除 -->
		<van-button type="danger" plain block v-if="titleType == '修改'" @click.native="delAccount">删除</van-button>

        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'AddAccount',
    data () {
        return {
        	accountInfo: {
        		type: 1,
        		// 银行
	        	name: '',
	        	card_no: '',
	        	bank: '',
	            branch: '',
	            // 微信
	            weixin: '',
	            // 支付宝
	            alipay: '',
	            // 备注
	            remarks: ''
        	},

        	titleType: '添加'
        	
        }
    },
    created(){
    	if(this.$route.query){
    		let paramObj = this.$route.query;
    		if(paramObj.hasOwnProperty('id')){
    			this.accountInfo = Object.assign({},paramObj);
    			this.titleType = '修改'
    		}else{
    			this.accountInfo.type = paramObj.type;
    		}
    	}
    },
    methods: {
        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/accountList'})
            this.$router.back(-1);
        },

        photograph(){
        	this.$toast('暂不支持拍照功能，请先手动输入');
        },

        // 保存
        saveAcconut(){
        	let url = this.titleType == '添加' ? "Gettype/addType" : "Gettype/editType";
            let params = Object.assign({ uid: 100118 }, this.accountInfo);
            
        	if(params.type == 1 && this.name == ''){ return this.$toast.fail('持卡人不能为空'); }
        	if(params.type == 1 && this.card_no == ''){ return this.$toast.fail('卡号不能为空'); }
        	if(params.type == 1 && this.bank == ''){ return this.$toast.fail('开户行不能为空'); }
            if(params.type == 2 && this.weixin == ''){ return this.$toast.fail('微信号不能为空'); }
            if(params.type == 3 && this.alipay == ''){ return this.$toast.fail('支付宝账号不能为空'); }

            this.$post(url, params).then((res) => {
                //返回数据的格式
                if(res.code == 1){
                    if(res.data){ this.accountInfo.id = res.data; }
                    this.$emit('listenSaveAccount',this.accountInfo);
                	this.goPrevPage();
                }
            });
        },

        // 删除收款账户
        delAccount(){
            this.$dialog.confirm({
                title: '提示',
                message: '是否删除该账户？'
            }).then(() => {
                let url = "Gettype/delType";
                let params = { uid: 100118, id: this.accountInfo.id };

                this.$post(url, params).then((res) => {
                    // 返回数据的格式
                    if(res.code == 1){
                        this.$emit('listenDelAccount',this.accountInfo.id);
                        this.goPrevPage();
                    }
                });
            })
        	
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .add-account{
    	position: fixed;
    	width: 100vw;
    	top: 0;
    	left: 0;
    	height: 100vh;
    	background: #f5f5f5;
    	z-index: 399;
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
        .account-info{
        	margin-bottom: 8px;
        }
        .van-button--danger{
        	margin-top: 25px;
        	border: 0;
        }
        
    }
</style>
