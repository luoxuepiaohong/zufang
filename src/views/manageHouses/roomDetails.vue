<template>
    <div class="room-details">
        <van-nav-bar title="房号详情" left-arrow  @click-left="goPrevPage"></van-nav-bar>
		
        <!-- 房号信息 -->
        <div class="room-details-container">
            <!-- 房号相关信息 -->
            <van-cell-group>
                <van-field v-model="houseOption.house.house_name" label="房产名" readonly input-align="right" />
                <van-field v-model="houseOption.room.room_no" placeholder="如 108" readonly label="房号" input-align="right" />
                <div class="photo-album" @click="goHousePhoto">
                    <span class="photo-name">相册</span>
                    <div class="phone-thumbnail">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582643520538&di=caec96aa432345a535684ddffd014185&imgtype=0&src=http%3A%2F%2Ftrademark-pics-search.oss-cn-shanghai.aliyuncs.com%2Fsmall%2Ft4518608796238848.jpg" v-if="houseOption.room.room_data.img.length == 0">
                        <img :src="houseOption.room.room_data.img[0].url" v-else>
                        <span class="phone-total">{{houseOption.room.room_data.img.length}}张</span>
                    </div>
                </div>
            </van-cell-group>

            <!-- 租房相关信息 -->
            <ul class="renting-info">
                <li class="renting-info-item">
                    <span>楼层</span>
                    <input type="text" :value="`${houseOption.room.room_stair}/第${houseOption.room.nowFloor}层/共${houseOption.room.total_floor}层`" placeholder="未选择" readonly>
                </li>
                <li class="renting-info-item">
                    <span>户型</span>
                    <input type="text" v-model="houseOption.room.room_data.room_type" placeholder="未选择" readonly>
                </li>
                <li class="renting-info-item">
                    <span>面积(m<sup>2</sup>)</span>
                    <input type="number" v-model="houseOption.room.room_data.area" readonly placeholder="未填写">
                </li>
                <li class="renting-info-item">
                    <span>月租金</span>
                    <input type="number" v-model="houseOption.room.room_data.money" readonly placeholder="未填写">
                </li>
                <li class="renting-info-item">
                    <span>收租周期</span>
                    <input type="text" v-model="houseOption.room.room_data.rents_cycle" placeholder="未选择" readonly>
                </li>
            </ul>

            <!-- 其他信息 -->
            <ul class="other-info">
                <li class="other-info-item">
                    <van-cell title="房屋配置" />
                    <ul class="desc-list">
                        <li class="desc-list-item">空调<span class="desc-list-item-info">111</span></li>
                        <li class="desc-list-item">空调<span class="desc-list-item-info">111</span></li>
                    </ul>
                </li>
                <li class="other-info-item">
                    <van-cell title="房屋亮点" />
                    <!-- <ul class="desc-list">
                        <li class="desc-list-item">首次招租</li>
                        <li class="desc-list-item">南北通透</li>
                        <li class="desc-list-item">超大阳台</li>
                    </ul> -->
                </li>
                <li class="other-info-item">
                    <van-cell title="招租要求" />
                    <ul class="desc-list">
                        <li class="desc-list-item">不可做饭</li>
                        <li class="desc-list-item">禁止宠物</li>
                        <li class="desc-list-item">1年起租</li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <!-- 底部操作按钮 -->
        <footer class="room-details-footer">
            <ul class="room-operation-btn">
                <li class="operation-btn-item">智能表</li>
                <li class="operation-btn-item">发布</li>
                <li class="operation-btn-item">分享</li>
                <li class="operation-btn-item">修改</li>
                <li class="operation-btn-item" @click="delRoom">删除</li>
            </ul>
        </footer>

    
        <transition name="slide-right" mode="out-in">
            <router-view ></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'RoomDetails',
    data () {
        return {
            houseOption: {
                house: {
                    name: '东亚.世纪城',

                },
                room: {
                    room_data: {
                        img: [],
                        room_type: '1房,1厅,1卫',
                        area: 23,
                        money: 850,
                        rents_cycle: '押1,付1'
                    },
                    room_no: 101,
                    room_stair: '电梯',
                    total_floor: 6,
                    nowFloor: 1
                }
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
            this.$router.back(-1);
        },

        // 去往下一页
        goHousePhoto(){
            if(this.houseOption.room.room_data.img.length > 0){
                this.$router.push({path: '/housePhoto', query: {imgList: houseOption.room.room_data.img}})
            }
        },
        

        // 删除
        delRoom(){
            this.$dialog.confirm({
                title: '删除确认',
                message: `您确定要删除${this.houseOption.house.name}-${this.houseOption.room.room_no}，同时将删除其全部租客及账单？`
            }).then(() => {
                // on confirm
                this.$toast.success('删除成功');
            }).catch(() => {
                // on cancel
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .room-details{
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

        .room-details-container{
            height: calc(100vh - 95px);
            margin-bottom: 3px;
            overflow: scroll;
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

            .other-info{
                background: #fff;
                .other-info-item{
                    border-top: 1px solid #f1f1f1;
                    &:first-child{
                        border-top: 0;
                    }
                    .van-cell{
                        &:after{
                            border-bottom: 0;
                        }
                    }
                    .desc-list{
                        overflow: hidden;
                        clear: both;
                        padding: 0 15px;
                        .desc-list-item{
                            border: 1px solid #999;
                            display: inline-block;
                            border-radius: 3px;
                            padding: 3px 8px;
                            margin-bottom: 10px;
                            font-size: 12px;
                            margin-right: 10px;
                            /*&+.desc-list-item{
                                margin-left: 10px;
                            }*/
                            .desc-list-item-info{
                                padding-left: 10px;
                                display: inline-block;
                                position: relative;
                                &:before{
                                    content: '';
                                    height: 1em;
                                    width: 1px;
                                    background: #999;
                                    position: absolute;
                                    left: 5px;
                                }
                            }
                        }
                    }
                }
                
            }
        }

        .room-details-footer{
            overflow: hidden;
            clear: both;
            background: #fff;
            .room-operation-btn{
                height: 46px;
                padding: 8px 0px;
                box-sizing: border-box;
                display: flex;
                .operation-btn-item{
                    height: 100%;
                    width: 20%;
                    font-size: 14px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid #eee;
                    &:last-child{
                        border-right: 0;
                    }
                }
            }
        }
        
    }
</style>
