<template>
    <div class="edit-house">
        <van-nav-bar title="修改房产" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveEdit">保存</span>
        </van-nav-bar>
		
        <!-- 添加房产需要填写的资料容器 -->
        <section class="edit-house-container">
            <section>
                <van-cell title="房产名" value="请选择" is-link />
                <van-cell title="详细地址" value="请选择" is-link />
                <van-cell title="房产类型" :value="typeVal" is-link @click="openPopup('type')" />
                <van-cell title="收款账户" value="请选择收款账户" is-link to="editOfAccountList" />
            </section>

            <p class="tips">收款账户将附加在账单中显示</p>

            <div class="batch-facility">
                <h4>公共设施</h4>
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell v-for="(item, index) in list"
                          clickable
                          :key="item"
                          :title="item"
                          @click="toggle(index)"
                        >
                          <van-checkbox :name="item" ref="checkboxes" slot="right-icon"/>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div> 
        </section>
        <!-- 删除按钮 -->
        <van-button type="danger" plain block class="del-btn" @click.native="delDialog = true">删除</van-button>
        
        <!-- 房产类型 -->
        <van-popup v-model="typeShow" position="bottom">
            <van-picker :columns="typeColumns" title="请选择房产类型" :default-index="3" show-toolbar @confirm="onConfirm" @cancel="typeShow = false" />
        </van-popup>

        <!-- 房号数量 -->
        <van-popup v-model="floorShow" position="bottom">
            <van-picker :columns="floorColumns" title="请选择每层房间数" :default-index="4" show-toolbar @confirm="onConfirm" @cancel="floorShow = false" />
        </van-popup>

        <!-- 删除弹窗 -->
        <van-dialog v-model="delDialog" title="删除房产确认" show-cancel-button @confirm="confirmDel">
            <p class="del-dialog-tips">
                删除房产将一同删除房产下所有的<b>房号、租客、账单、房产配置</b>等信息，并且将<em>无法恢复</em>！！<br>
                您确定要删除此房产吗?
            </p>
        </van-dialog>

		
        <transition name="slide-right" mode="out-in">
            <router-view v-on:selectAccount="selectAccount"></router-view>
        </transition>
    </div>
</template>

<script>
const floorNum = Array.from({length:99}, (v,k) => k+1);

export default {
    name: 'AddHouse',
    data () {
        return {
            page: 1,
            pageSize: 10,

            result: [],
            list: ['健身房','游泳池','洗衣房','停车位','收快递'],

            // 值
            typeVal: '住宅/小区/公寓',
            floorVal: 5,

            typeShow: false,
            floorShow: false,

            popupType: '',

            // 上拉菜单
            typeColumns: ['厂房/车间', '仓库/车库/停车位', '写字楼/办公室', '住宅/小区/公寓', '商铺/门市房'],
            floorColumns: floorNum,

            // 弹窗
            delDialog: false,

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
            // this.$router.push({path: '/houseIndex'})
            this.$router.back(-1);
        },
        // 选择公共设施
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },

        // 打开上拉菜单
        openPopup(type){
            this.popupType = type;
            this[this.popupType + 'Show'] = true;
        },
        // 上拉菜单确定选择
        onConfirm(value, index) {
            this[this.popupType + 'Val'] = value;
            this[this.popupType + 'Show'] = false;
        },

        // 获取选择的账户信息
        selectAccount(data){
            console.log('获取选择的账户信息:',data);
        },

        // 保存信息
        saveEdit(){
            this.goPrevPage();
        },

        // 删除房产
        confirmDel(){
            // console.log('确认删除');
            this.$router.push({path: '/houseIndex'})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .edit-house{
    	background: #f5f5f5;
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
        
        .edit-house-container{
            height: calc(100vh - 90px);
            overflow: scroll;
            padding: 10px 0;
            box-sizing: border-box;
            .tips{
                height: 35px;
                line-height: 30px;
                font-size: 12px;
                color: #666;
                margin: 0;
                margin-left: 16px;
            }
            .batch-facility{
                background: #fff;
                h4{
                    color: #323233;
                    font-size: 14px;
                    font-weight: 500;
                    margin: 0;
                    margin-left: 16px;
                    line-height: 40px;
                }
            }
        }
        .del-btn{
            border: 0;
            border-top: 1px solid #f5f5f5;
        }

        .van-dialog{
            border-radius: 8px;
            .van-dialog__header{
                padding-top: 15px;
                font-size: 17px;
            }
            .del-dialog-tips{
                margin: 0;
                padding: 15px 20px;
                font-size: 15px;
                em{
                    color: #f00;
                    font-style:normal;
                }
            }
        }
        
        
    }
</style>
