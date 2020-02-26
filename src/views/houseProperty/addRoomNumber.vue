<template>
    <div class="add-room-number">
        <van-nav-bar title="添加房号" left-arrow  @click-left="goPrevPage"></van-nav-bar>
        
        <!-- 房号相关信息 -->
        <van-cell-group>
            <van-field v-model="houseOption.house.house_name" label="房产名" readonly input-align="right" />
            <van-field v-model="houseOption.room.house_no" label="楼栋号(选填)" placeholder="如 A" input-align="right">
                <span slot="button" class="input-tail">栋</span>
            </van-field>
            <van-field v-model="houseOption.room.room_no" placeholder="如 108" required label="房号" input-align="right" />
            <router-link :to="{path: '/housePhoto', query: {imgList: houseOption.room.room_data.img}}" class="photo-album">
                <span class="photo-name">相册</span>
                <div class="phone-thumbnail">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582643520538&di=caec96aa432345a535684ddffd014185&imgtype=0&src=http%3A%2F%2Ftrademark-pics-search.oss-cn-shanghai.aliyuncs.com%2Fsmall%2Ft4518608796238848.jpg" v-if="houseOption.room.room_data.img.length == 0">
                    <img :src="houseOption.room.room_data.img[0].url" v-else>
                    <span class="phone-total">0张</span>
                </div>
            </router-link>
        </van-cell-group>

        <!-- 租房相关信息 -->
        <ul class="renting-info">
            <li class="renting-info-item">
                <span>楼层</span>
                <input type="text" v-model="othersInfo.levelVal" placeholder="请选择" readonly @click="openPopup('level')">
            </li>
            <li class="renting-info-item">
                <span>户型</span>
                <input type="text" v-model="othersInfo.typeVal" placeholder="请选择" readonly @click="openPopup('type')">
            </li>
            <li class="renting-info-item">
                <span>面积(m<sup>2</sup>)</span>
                <input type="number" v-model="houseOption.room.room_data.area" placeholder="请填写">
            </li>
            <li class="renting-info-item">
                <span>月租金</span>
                <input type="number" v-model="houseOption.room.room_data.money" placeholder="请填写">
            </li>
            <li class="renting-info-item">
                <span>收租周期</span>
                <input type="text" v-model="othersInfo.periodVal" placeholder="请选择" readonly @click="openPopup('period')">
            </li>
        </ul>
        
        <!-- 房间配置 -->
        <van-cell title="房间配置" is-link to="roomConfig">
            <van-icon slot="right-icon" name="add" />
        </van-cell>
        <!-- 配置列表 -->
        <van-swipe-cell v-for="(item, key) in houseOption.room.room_data.dispose" :key="key" class="config-list" :ref="'dispose' + key" :before-close="beforeClose">
            <van-field v-model="item.remarks" :label="item.name" placeholder="品牌/新旧程度">
                <i slot="left-icon" class="iconfont icon-weixin" @click="openSidebar(key)"></i>
            </van-field>
            <van-button slot="right" square text="删除" type="danger" @click="delDisposeItem(key)" />
        </van-swipe-cell>

        <!-- 楼层 -->
        <van-popup v-model="levelShow" position="bottom">
            <van-picker :columns="levelColumns" title="请选择楼层" show-toolbar @confirm="onConfirm" @cancel="levelShow = false" />
        </van-popup>
        <!-- 户型 -->
        <van-popup v-model="typeShow" position="bottom">
            <van-picker :columns="typeColumns" title="请选择户型" show-toolbar @confirm="onConfirm" @cancel="typeShow = false" />
        </van-popup>
        <!-- 收租周期 -->
        <van-popup v-model="periodShow" position="bottom">
            <van-picker :columns="periodColumns" title="请选择收租周期" show-toolbar @confirm="onConfirm" @cancel="periodShow = false" />
        </van-popup>

        <van-button :loading="saveStatus" type="info" loading-text="保存中..." :disabled="saveStatus" @click="saveRoomNumber" class="save-btn">保存</van-button>

        <transition name="slide-right" mode="out-in">
            <router-view v-on:getPhotoList="getPhotoList" v-on:getDisposeList="getDisposeList"></router-view>
        </transition>
    </div>
</template>

<script>
const floorNum = Array.from({length:99}, (v,k) => k+1);
const tenNum = Array.from({length:10}, (v,k) => k);

export default {
    name: 'AddRoomNumber',
    data () {
        return {
            houseOption: {
                house: {
                    house_name: '',
                },
                room: {
                    room_data: {
                        room_type: "",
                        area: "",
                        money: "",
                        rents_cycle: "",
                        dispose: [],
                        img: [],                  //图片列表
                    },

                    room_no: '',
                    total_floor: '',
                    nowFloor: '',
                    allRoom_status: 0,
                    house_no: "",
                    room_stair: ""
                },
            },

            othersInfo: {
                levelVal: '',
                typeVal: '',
                periodVal: '',

                popupType: '',
            },
            
            // 上拉菜单状态
            levelShow: false,
            typeShow: false,
            periodShow: false,
            
            // 上拉菜单列表
            levelColumns:[
                {
                  values: ['电梯','楼梯'],
                  className: 'column1'
                },
                {
                  values: floorNum.map(item => '第' + item + '层'),
                  className: 'column2',
                  defaultIndex: 6
                },
                {
                  values: floorNum.map(item => '共' + item + '层'),
                  className: 'column3',
                  defaultIndex: 6
                }
            ],
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

            
            // 保存状态按钮
            saveStatus: false,

        }
    },

    created(){
        if(this.$route.query && Object.keys(this.$route.query).length > 0){
            this.houseOption.house.house_name = this.$route.query.house_name;
            this.houseOption.house.address = this.$route.query.address;
            this.houseOption.house.house_type = this.$route.query.typeVal;
            this.houseOption.house.account_id = this.$route.query.account_id;
        }
    },
    methods: {
        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/addHouse'})
            this.$router.back(-1);
        },

        // 打开上拉菜单
        openPopup(type){
            this.othersInfo.popupType = type;
            this[this.othersInfo.popupType + 'Show'] = true;
        },
        // 上拉菜单确定选择
        onConfirm(value, index) {
            if(this.othersInfo.popupType == 'level'){
                if(index[1] > index[2]){ return this.$toast('总层数不能小于所在楼层'); }

                this.houseOption.room.room_stair = this.levelColumns[0].values[index[0]];
                this.houseOption.room.nowFloor = index[1] + 1;
                this.houseOption.room.total_floor = index[2] + 1;
            }

            this.othersInfo[this.othersInfo.popupType + 'Val'] = value.toString();
            this[this.othersInfo.popupType + 'Show'] = false;
        },


        // 打开单元格侧边栏
        openSidebar(key){
            let refArr = Object.keys(this.$refs).filter(item => item.indexOf("dispose") == 0)

            // 循环判断，打开某行侧边栏时，关闭其他的侧边栏
            for(let i in refArr){
                if(refArr[i] == 'dispose' + key){
                    this.$refs[refArr[i]][0].open('right');
                }else{
                    this.$refs[refArr[i]][0].close();
                }
            }
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

        // 保存
        saveRoomNumber(){
            
            let url = "house/addHouse";
            let params = Object.assign({
                uid: 100118
            }, this.houseOption);

            params.house.uid = 100118;
            params.room.room_data.room_type = this.othersInfo.typeVal;
            params.room.room_data.rents_cycle = this.othersInfo.periodVal;
            console.log(params);
            this.$post(url, params).then((res) => {
                console.log(res);
            });

            this.saveStatus = false;
        },

        /*获取子页面数据*/
        getPhotoList(data){
            this.houseOption.room.room_data.img = data;
        },
        getDisposeList(data){
            this.houseOption.room.room_data.dispose = [];
            if(data.length > 0){ 
                for(let i in data){
                    this.houseOption.room.room_data.dispose.push({ name: data[i], remarks: '' })
                }
            }
        }

        /*去往子页面*/
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
        .save-btn{
            margin: 20px 0 10% 50%;
            transform: translateX(-50%);
            width: 120px;
            background: #5788e4;
        }
        
    }
</style>
