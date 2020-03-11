<template>
    <div class="edit-room">
        <van-nav-bar title="修改房号" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveEdit">保存</span>
        </van-nav-bar>
		
        <!-- 房号信息 -->
        <div class="edit-room-container">
            <!-- 房号相关信息 -->
            <van-cell-group>
                <van-field v-model="houseOption.house.house_name" label="房产名" readonly input-align="right" />
                <van-field v-model="houseOption.room.room_no" placeholder="如 108" label="房号" input-align="right" clearable />
                <div class="photo-album" @click="goRoomPhoto">
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
                    <input type="text" :value="`${houseOption.room.room_stair}/第${houseOption.room.nowFloor}层/共${houseOption.room.total_floor}层`" placeholder="未选择" readonly @click="openPopup('level')">
                </li>
                <li class="renting-info-item">
                    <span>户型</span>
                    <input type="text" v-model="houseOption.room.room_data.room_type" placeholder="未选择"readonly @click="openPopup('type')">
                </li>
                <li class="renting-info-item">
                    <span>面积(m<sup>2</sup>)</span>
                    <input type="number" v-model="houseOption.room.room_data.area" placeholder="未填写">
                </li>
                <li class="renting-info-item">
                    <span>月租金</span>
                    <input type="number" v-model="houseOption.room.room_data.money" placeholder="未填写">
                </li>
                <li class="renting-info-item">
                    <span>收租周期</span>
                    <input type="text" v-model="houseOption.room.room_data.rents_cycle" placeholder="未选择" readonly @click="openPopup('period')">
                </li>
            </ul>
            
            <!-- 房间配置 -->
            <van-cell title="房间配置" is-link to="changeRoomConfig">
                <van-icon slot="right-icon" name="add" />
            </van-cell>
            <!-- 配置列表 -->
            <van-swipe-cell v-for="(item, key) in houseOption.room.room_data.dispose" :key="key" class="config-list" :ref="'dispose' + key" :before-close="beforeClose">
                <van-field v-model="item.remarks" :label="item.name" placeholder="品牌/新旧程度">
                    <i slot="left-icon" class="iconfont icon-weixin" @click="openSidebar(key)"></i>
                </van-field>
                <van-button slot="right" square text="删除" type="danger" @click="delDisposeItem(key)" />
            </van-swipe-cell>

            <!-- 其他信息 -->
            <ul class="other-info">
                <li class="other-info-item">
                    <van-cell title="房屋亮点" />
                    <ul class="desc-list">
                        <li v-for="(item, key) in lightspot" :key="key" :class="['desc-list-item', item.checked ? 'active' : '']" @click="item.checked = !item.checked">{{item.name}}</li>
                    </ul>
                </li>
                <li class="other-info-item">
                    <van-cell title="招租要求" />
                    <ul class="desc-list">
                        <li v-for="(item, key) in demand" :key="key" :class="['desc-list-item', item.checked ? 'active' : '']" @click="item.checked = !item.checked">{{item.name}}</li>
                    </ul>
                </li>
            </ul>

            <!-- 联系人 -->
            <div class="linkman-box">
                <van-field v-model="assistInfo.name" label="看房联系人" clearable placeholder="请输入姓名">
                    <div slot="button" class="sex-btn">
                        <span :class="{'active': assistInfo.sex == 1}" @click="changeSex(1)">女士</span>
                        <span :class="{'active': assistInfo.sex == 2}" @click="changeSex(2)">先生</span>
                    </div>
                </van-field>
                <van-field v-model="assistInfo.tel" type="tel" label="电话号码" clearable placeholder="请输入电话" />
            </div>
        </div>
        
        <!-- 楼层 -->
        <van-popup v-model="levelShow" position="bottom">
            <van-picker :columns="levelColumns" title="请选择楼层" show-toolbar @confirm="onConfirm" @cancel="levelShow = false" :default-index="2" />
        </van-popup>
        <!-- 户型 -->
        <van-popup v-model="typeShow" position="bottom">
            <van-picker :columns="typeColumns" title="请选择户型" show-toolbar @confirm="onConfirm" @cancel="typeShow = false" />
        </van-popup>
        <!-- 收租周期 -->
        <van-popup v-model="periodShow" position="bottom">
            <van-picker :columns="periodColumns" title="请选择收租周期" show-toolbar @confirm="onConfirm" @cancel="periodShow = false" />
        </van-popup>
    
        <transition name="slide-right" mode="out-in">
            <router-view v-on:getPhotoList="getPhotoList" v-on:getDisposeList="getDisposeList"></router-view>
        </transition>
    </div>
</template>

<script>
const tenNum = Array.from({length:10}, (v,k) => k);

export default {
    name: 'EditRoom',
    data () {
        return {
            houseOption: {
                house: {
                    house_name: '东亚.世纪城',

                },
                room: {
                    room_data: {
                        img: [],
                        room_type: '1房,1厅,1卫',
                        area: 23,
                        money: 850,
                        rents_cycle: '押1,付1',
                        dispose: [],
                    },
                    room_no: 101,
                    room_stair: '电梯',
                    total_floor: 6,
                    nowFloor: 1
                }
            },

            assistInfo: {
                name: '',
                tel: '',
                sex: 1
            },

            // 选择器相关参数
            popupType: '',

            // 楼层
            levelShow: false,
            levelColumns: tenNum.map(item => (item + 1) + '房'),
            // 户型
            typeShow: false,
            typeColumns:[
                {
                  values: tenNum.map(item => (item + 1) + '房'),
                  className: 'column1',
                  defaultIndex: 0
                },
                {
                  values: tenNum.map(item => item + '厅'),
                  className: 'column2',
                  defaultIndex: 0
                },
                {
                  values: tenNum.map(item => item + '卫'),
                  className: 'column3',
                  defaultIndex: 0
                }
            ],
            // 押金
            periodShow: false,
            periodColumns:[
                {
                  values: ['付1','付2','付3','付4','付5','付6','付12'],
                  className: 'column1',
                  defaultIndex: 0
                },
                {
                  values: ['押1','押2','押3','押4','押5','押6','押金自定义'],
                  className: 'column2',
                  defaultIndex: 0
                },
            ],

            // 房屋亮点
            lightspot: [
                {
                    name: '南北通透',
                    checked: false,
                },
                {
                    name: '超大阳台',
                    checked: true,
                },
                {
                    name: '首次出租',
                    checked: false,
                },
                {
                    name: '随时看房',
                    checked: false,
                }
            ],
            // 招租要求
            demand: [
                {
                    name: '不可做饭',
                    checked: false,
                },
                {
                    name: '禁止宠物',
                    checked: true,
                },
                {
                    name: '1年起租',
                    checked: false,
                }
            ]
        }
    },
    created(){
        this.levelColumns = Array.from({length: this.houseOption.room.total_floor}, (v,k) => '第' + (k + 1) + '层');
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
        goRoomPhoto(){
            this.$router.push({path: '/editRoomPhoto', query: {imgList: this.houseOption.room.room_data.img}})
        },
        
        // 改变性别
        changeSex(num){
            this.assistInfo.sex = num;
        },

        // 打开上拉菜单
        openPopup(type){
            this.popupType = type;
            this[this.popupType + 'Show'] = true;
        },
        // 上拉菜单确定选择
        onConfirm(value, index) {
            switch(this.popupType){
                case 'level':
                    this.houseOption.room.nowFloor = index + 1;
                    break;
                case 'type':
                    this.houseOption.room.room_data.room_type = value.toString();
                    break;
                case 'period':
                    this.houseOption.room.room_data.rents_cycle = value.toString();
                    break;
            }
            this[this.popupType + 'Show'] = false;
        },

        // 关闭单元格前的回调（若去掉该方法则 openSidebar 方法不生效）
        beforeClose({ position, instance }){
        },

        // 删除一项房间配置
        delDisposeItem(key){
            this.houseOption.room.room_data.dispose.splice(key,1); 

            let refArr = Object.keys(this.$refs).filter(item => item.indexOf("dispose") == 0)
            for(let i in refArr){
                if(this.$refs[refArr[i]].length > 0){
                    this.$refs[refArr[i]][0].close();
                }
            }
        },

        /*获取子页面数据*/
        getPhotoList(data){
            this.houseOption.room.room_data.img = data;
        },
        getDisposeList(data){
            console.log('data:',data);
            this.houseOption.room.room_data.dispose = [];
            if(data.length > 0){ 
                for(let i in data){
                    this.houseOption.room.room_data.dispose.push({ name: data[i], remarks: '' })
                }
            }
        },

        // 保存修改
        saveEdit(){
            this.$emit('getEditRoomData', 123456);
            this.goPrevPage();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .edit-room{
    	background: #f5f5f5;
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

        .edit-room-container{
            height: calc(100vh - 46px);
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
            
            .van-icon-add{
                font-size: 22px;
                line-height: inherit;
                color: #5788e4;
            }
            .config-list{
                .van-cell__value{
                    text-align: left;
                }
                .icon-weixin{
                    color: #f00;
                    margin-right: 10px;
                }
            }

            .other-info{
                /*background: #fff;*/
                margin-top: 8px;
                .other-info-item{
                    margin-bottom: 8px;
                    background: #fff;
                    padding-bottom: 5px;
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
                            background: #eee;
                            color: #5788e4;
                            display: inline-block;
                            border-radius: 3px;
                            padding: 5px 10px;
                            margin-bottom: 10px;
                            font-size: 12px;
                            margin-right: 10px;
                            &.active{
                                background: #5788e4;
                                color: #fff;
                            }
                        }
                    }
                }
                
            }

            .linkman-box{
                .sex-btn{
                    border-radius: 2px;
                    border: 1px solid #5788e4;
                    span{
                        display: inline-block;
                        padding: 1px 5px;
                        font-size: 14px;
                        color: #5788e4;
                        &.active{
                            color: #fff;
                            background: #5788e4;
                        }
                    }
                }
            }
        }
    }
</style>
