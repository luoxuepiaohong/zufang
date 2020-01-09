<template>
    <div class="add-house">
        <van-nav-bar title="添加房产" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right">下一步</span>
        </van-nav-bar>
		
        <!-- 添加房产需要填写的资料容器 -->
        <section class="add-house-container">
            <section>
                <van-cell title="房产名" value="请选择" is-link />
                <van-cell title="详细地址" value="请选择" is-link />
                <van-cell title="房产类型" :value="typeVal" is-link @click="openPopup('type')" />
                <van-cell title="收款账户" value="请选择收款账户" is-link to="accountList" />
            </section>

            <p class="tips">收款账户将附加在账单中显示</p>

            <van-switch-cell v-model="checked" title="批量添加房号" />

            <section v-if="checked" class="add-batch-container">
                <div class="batch-info">
                    <van-cell title="总楼层" :value="levelVal[1] + '(' + levelVal[0] + ')'" @click="openPopup('level')" is-link />
                    <van-cell title="每层房号数" :value="floorVal" @click="openPopup('floor')" is-link />
                    <van-field label="房号前缀" v-model="value" placeholder="如A" />
                    <van-cell title="收款账户" value="请选择收款账户" is-link />
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
            <router-view></router-view>
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
            page: 1,
            pageSize: 10,

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

        }
    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            this.getHouseList();
        },

        getHouseList(){
            let url = "house/index";
            let params = { 
                uid: 100118,
                skip: this.page,
                limit: this.pageSize
            };
            this.$post(url, params).then((res) => {
                //返回数据的格式
                console.log(res);
            });
        },

        // 返回上一页
        goPrevPage(){
            this.$router.push({path: '/houseIndex'})
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .add-house{
    	height: 100vh;
    	background: #f5f5f5;
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
