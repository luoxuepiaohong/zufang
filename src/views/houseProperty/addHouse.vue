<template>
    <div class="add-house">
        <van-nav-bar title="添加房产" left-arrow>
            <span slot="right" class="nav-bar-right">下一步</span>
        </van-nav-bar>
		
        <!-- 添加房产需要填写的资料容器 -->
        <section class="add-house-container">
            <section>
                <van-cell title="房产名" value="请选择" is-link />
                <van-cell title="详细地址" value="请选择" is-link />
                <van-cell title="房产类型" :value="houseType" is-link @click="openType" />
                <van-cell title="收款账户" value="请选择收款账户" is-link />
            </section>

            <p class="tips">收款账户将附加在账单中显示</p>

            <van-switch-cell v-model="checked" title="批量添加房号" />

            <section v-if="checked" class="add-batch-container">
                <div class="batch-info">
                    <van-cell title="总楼层" :value="levelVal[1] + '(' + levelVal[0] + ')'" @click="openLevel" is-link />
                    <van-cell title="每层房号数" value="5" is-link />
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
            <van-picker :columns="columns" title="请选择房产类型" :default-index="3" show-toolbar @confirm="onConfirm" @cancel="typeShow = false" />
        </van-popup>

        <!-- 楼层 -->
        <van-popup v-model="levelShow" position="bottom">
            <van-picker :columns="levelColumns" title="请选择楼层" show-toolbar @confirm="onConfirm1" @cancel="levelShow = false" />
        </van-popup>
		
        
    </div>
</template>

<script>
const citys = {
    '电梯': Array.from({length:99}, (v,k) => k+1),
    '楼梯': Array.from({length:99}, (v,k) => k+1)
};

export default {
    name: 'HouseIndex',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App-1111',
            checked: false,
            value: '',
            result: [],
            list: ['健身房','游泳池','洗衣房','停车位','收快递'],

            houseType: '住宅/小区/公寓',
            levelVal: ['电梯',7],

            typeShow: false,
            levelShow: false,

            columns: ['厂房/车间', '仓库/车库/停车位', '写字楼/办公室', '住宅/小区/公寓', '商铺/门市房'],

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
            ]

        }
    },
    methods: {
        // 选择公共设施
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },
        // 打开房产类型选择器
        openType(){
            this.typeShow = true;
        },
        // 确定房产类型
        onConfirm(value, index) {
            // this.$toast(`当前值：${value}, 当前索引：${index}`);
            this.houseType = value;
            this.typeShow = false;
        },
        // 打开楼层
        openLevel(){
            this.levelShow = true;
        },
        // 确定楼层
        onConfirm1(value, index){
            this.levelVal = value;
            this.levelShow = false;
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
