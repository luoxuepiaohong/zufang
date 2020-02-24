<template>
    <div class="add-house">
        <van-nav-bar title="添加房产" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="nextStep">下一步</span>
        </van-nav-bar>
		
        <!-- 添加房产需要填写的资料容器 -->
        <section class="add-house-container">
            <section>
                <van-cell title="房产名" center :value="houseInfo.house_name" is-link @click="goSelectHouse" />
                <van-cell title="详细地址" center :value="houseInfo.address" is-link @click="goSelectPosition" />
                <van-cell title="房产类型" :value="typeVal" is-link @click="openPopup('type')" />
                <van-cell title="收款账户" center is-link to="accountList">
                    <div>{{houseRelate.account_type}}</div>
                    <div>{{houseRelate.account_name}}</div>
                </van-cell>
            </section>

            <p class="tips">收款账户将附加在账单中显示</p>

            <van-switch-cell v-model="checked" title="批量添加房号" />

            <section v-if="checked" class="add-batch-container">
                <div class="batch-info">
                    <van-cell title="总楼层" :value="levelVal[1] + '(' + levelVal[0] + ')'" @click="openPopup('level')" is-link />
                    <van-cell title="每层房号数" :value="floorVal" @click="openPopup('floor')" is-link />
                    <van-field label="房号前缀" v-model="value" placeholder="如A" />
                </div>
                
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
        </section>
        
        <!-- 房产类型 -->
        <van-popup v-model="typeShow" position="bottom">
            <van-picker :columns="typeColumns" title="请选择房产类型" :default-index="3" show-toolbar @confirm="onConfirm" @cancel="typeShow = false" />
        </van-popup>

        <!-- 楼层 -->
        <van-popup v-model="levelShow" position="bottom">
            <van-picker :columns="levelColumns" title="请选择楼层" show-toolbar @confirm="onConfirm" @cancel="levelShow = false" />
        </van-popup>

        <!-- 房号数量 -->
        <van-popup v-model="floorShow" position="bottom">
            <van-picker :columns="floorColumns" title="请选择每层房间数" :default-index="4" show-toolbar @confirm="onConfirm" @cancel="floorShow = false" />
        </van-popup>

		
        <transition name="slide-right" mode="out-in">
            <router-view v-on:getHouseName="getHouseName" v-on:selectAccount="selectAccount" v-on:confirmStreet="confirmStreet" v-on:customStreet="customStreet"></router-view>
        </transition>
    </div>
</template>

<script>
const floorNum = Array.from({length:99}, (v,k) => k+1);
const citys = {
    '电梯': floorNum,
    '楼梯': floorNum
};

export default {
    name: 'AddHouse',
    data () {
        return {
            checked: false,
            value: '',
            result: [],
            list: ['健身房','游泳池','洗衣房','停车位','收快递'],

            // 值
            typeVal: '住宅/小区/公寓',
            levelVal: ['电梯',7],
            floorVal: 5,

            typeShow: false,
            levelShow: false,
            floorShow: false,

            popupType: '',

            // 上拉菜单
            typeColumns: ['厂房/车间', '仓库/车库/停车位', '写字楼/办公室', '住宅/小区/公寓', '商铺/门市房'],
            levelColumns:[
                {
                  values: Object.keys(citys),
                  className: 'column1'
                },
                {
                  values: citys['电梯'],
                  className: 'column2',
                  defaultIndex: 6
                }
            ],
            floorColumns: floorNum,


            // 房产信息
            houseInfo: {
                house_name: '请选择',
                address: '请选择',
                account_id: '',
            },
            // 房产相关信息（辅助信息）
            houseRelate: {
                lat: 0,
                lng: 0,
                city: '',
                adcode: 0,

                account_type: '请选择收款账户',
                account_name: '',
            }

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
            this.$router.push({path: '/houseIndex'})
            // this.$router.back(-1);
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
            // this.$toast(`当前值：${value}, 当前索引：${index}`);
            this[this.popupType + 'Val'] = value;
            this[this.popupType + 'Show'] = false;
        },

    
        // 下一步
        nextStep(){
            // 判断是否填写房产名和详细地址
            if(this.houseInfo.house_name == ''){ return this.$toast.fail('房产名不能为空'); }
            if(this.houseInfo.address == ''){ return this.$toast.fail('详细地址不能为空'); }
            if(this.checked){
                this.$router.push({path: '/batchAddRoom'})
            }else{
                this.$router.push({path: '/addRoomNumber'})
            } 
        },

        /*获取子页面信息*/
        // 获取房产名
        getHouseName(data){
            this.houseInfo.house_name = data.title;

            if(data.hasOwnProperty('address')){
                this.houseInfo.address = data.address;
                this.houseRelate.lat = data.location.lat;
                this.houseRelate.lng = data.location.lng;
                this.houseRelate.city = data.city;
                this.houseRelate.adcode = data.adcode;
            }
        },
        // 获得街道名
        confirmStreet(data){
            this.houseInfo.address = data.address;
            this.houseRelate.lat = data.lat;
            this.houseRelate.lng = data.lng;
            this.houseRelate.city = data.city;
            this.houseRelate.adcode = data.adcode;
        },
        // 获取自定义街道名
        customStreet(data){
            this.houseInfo.address = data.address;
            this.houseRelate.lat = 0;
            this.houseRelate.lng = 0;
        },
        // 获取选择的账户信息
        selectAccount(data){
            console.log('获取选择的账户信息:',data);
            this.houseInfo.account_id = data.id;

            switch(data.type){
                case 1:
                    this.houseRelate.account_type = '银行卡';
                    this.houseRelate.account_name = data.card_no;
                    break;
                case 2:
                    this.houseRelate.account_type = '微信';
                    this.houseRelate.account_name = data.weixin;
                    break;
                case 3:
                    this.houseRelate.account_type = '支付宝';
                    this.houseRelate.account_name = data.alipay;
                    break;
                case 4:
                    this.houseRelate.account_type = '其他';
                    this.houseRelate.account_name = '';
                    break;
            }
        },


        /* 去往子页面 */
        // 去往选择房产页面
        goSelectHouse(){
            if(this.houseRelate.lat == 0){
                this.$router.push({path: '/selectHouse'})
            }else{
                const param = {
                    lat: this.houseRelate.lat,
                    lng: this.houseRelate.lng,
                    city: this.houseRelate.city,
                    adcode: this.houseRelate.adcode
                }
                this.$router.push({path: '/selectHouse', query: param })
            }
        },

        // 去往选择详细地址页面
        goSelectPosition(){
            if(this.houseRelate.lat == 0){
                this.$router.push({path: '/selectPosition'})
            }else{
                const param = {
                    lat: this.houseRelate.lat,
                    lng: this.houseRelate.lng,
                    city: this.houseRelate.city,
                    adcode: String(this.houseRelate.adcode),
                    address: this.houseInfo.address
                }
                this.$router.push({path: '/selectPosition', query: param })
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .add-house{
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
        
        .add-house-container{
            height: calc(100vh - 50px);
            overflow: scroll;
            padding-top: 10px;
            box-sizing: border-box;
            .tips{
                height: 35px;
                line-height: 30px;
                font-size: 12px;
                color: #666;
                margin: 0;
                margin-left: 16px;
            }
            .add-batch-container{
                margin-top: 10px;
                .batch-info{
                    margin-bottom: 10px;
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
        }
        
    }
</style>
