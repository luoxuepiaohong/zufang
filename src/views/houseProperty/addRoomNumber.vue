<template>
    <div class="add-room-number">
        <van-nav-bar title="添加房号" left-arrow  @click-left="goPrevPage"></van-nav-bar>
        
        <!-- 房号相关信息 -->
        <van-cell-group>
            <van-field v-model="houseOption.house_name" label="房产名" readonly input-align="right" />
            <van-field v-model="build_no" label="楼栋号(选填)" placeholder="如 A" input-align="right">
                <span slot="button" class="input-tail">栋</span>
            </van-field>
            <van-field v-model="houseOption.house_no" placeholder="如 108" required label="房号" input-align="right" />
            <div class="photo-album">
                <span class="photo-name">相册</span>
                <div class="phone-thumbnail">
                    <img src="">
                    <span class="phone-total">0张</span>
                </div>
            </div>
        </van-cell-group>

        <!-- 租房相关信息 -->
        <ul class="renting-info">
            <li class="renting-info-item">
                <span>楼层</span>
                <input type="text" placeholder="请选择" readonly @click="selectFloorNumber">
            </li>
            <li class="renting-info-item">
                <span>户型</span>
                <input type="text" placeholder="请选择" readonly @click="selectHouseType">
            </li>
            <li class="renting-info-item">
                <span>面积(m<sup>2</sup>)</span>
                <input type="number" placeholder="请填写">
            </li>
            <li class="renting-info-item">
                <span>月租金</span>
                <input type="number" placeholder="请填写">
            </li>
            <li class="renting-info-item">
                <span>收租周期</span>
                <input type="text" placeholder="请选择" readonly @click="selectPeriod">
            </li>
        </ul>

        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'AddRoomNumber',
    data () {
        return {
            houseOption: {
                house_name: '白云山小区',
                house_no: '',
            },
            build_no: ''
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
            this.$router.push({path: '/addHouse'})
        },

        selectFloorNumber(){
            console.log('点击了');
        },
        selectHouseType(){
            console.log('点击了');
        },
        selectPeriod(){
            console.log('点击了');
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .add-room-number{
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
        .input-tail{
            color: #323233;
        }
        .photo-album{
            padding: 5px 16px;
            height: 55px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .photo-name{
                color: #323233;
                font-size: 14px;
            }
            .phone-thumbnail{
                width: 45px;
                height: 45px;
                position: relative;
                background: #eee;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .phone-total{
                    position: absolute;
                    bottom: 0;
                    display: block;
                    width: 100%;
                    text-align: center;
                    height: 18px;
                    line-height: 18px;
                    background: rgba(0,0,0,0.3);
                    font-size: 13px;
                    color: #fff;
                }
            }
        }

        .renting-info{
            margin: 8px 0;
            overflow: hidden;
            clear: both;
            background: #fff;
            .renting-info-item{
                height: 40px;
                padding: 15px 0;
                width: calc(100%/3);
                float: left;
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                align-items: center;
                position: relative;
                &:after{
                    height: 40%;
                    width: 1px;
                    background: #eee;
                    content: "";
                    position: absolute;
                    top: 30%;
                    right: 0;
                }
                &:nth-child(3n){
                    &:after{
                        width: 0;
                    }
                }
                span{
                    color: #323233;
                    font-size: 14px;
                }
                input{
                    text-align: center;
                    width: 80%;
                    font-size: 12px;
                    border: 0;
                    color: #323233;
                    &::-webkit-input-placeholder{
                        color: #ababab;
                    }
                }
            }
        }
    }
</style>
