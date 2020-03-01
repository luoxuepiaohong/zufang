<template>
    <div class="batch-config-item">
        <van-nav-bar title="房间配置" left-arrow  @click-left="goPrevPage">
        	<span slot="right" class="nav-bar-right" @click="saveConfigItem">确定</span>
        </van-nav-bar>
        
        <van-cell title="配置" />
        <section class="config-info">
        	<ul class="config-info-list">
        		<li class="config-info-item">
        			<span class="info-item-label">户型</span>
                	<input type="text" v-model="room_item.room_type" placeholder="请选择" readonly @click="openPopup('type')">
        		</li>
        		<li class="config-info-item">
        			<span class="info-item-label">面积(m<sup>2</sup>)</span>
                	<input type="number" v-model="room_item.area" placeholder="请填写">
        		</li>
        		<li class="config-info-item">
        			<span class="info-item-label">月租金</span>
                	<input type="number" v-model="room_item.money" placeholder="请填写">
        		</li>
        		<li class="config-info-item">
        			<span class="info-item-label">收租周期</span>
                	<input type="text" v-model="room_item.rents_cycle" placeholder="请选择" readonly @click="openPopup('period')">
        		</li>
        	</ul>
        </section>
        <router-link :to="{path: '/batchHousePhoto', query: {imgList: room_item.img}}" class="photo-album">
            <span class="photo-name">相册</span>
            <div class="phone-thumbnail">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582643520538&di=caec96aa432345a535684ddffd014185&imgtype=0&src=http%3A%2F%2Ftrademark-pics-search.oss-cn-shanghai.aliyuncs.com%2Fsmall%2Ft4518608796238848.jpg" v-if="room_item.img.length == 0">
                <img :src="room_item.img[0].url" v-else>
                <span class="phone-total">{{room_item.img.length}}张</span>
            </div>
        </router-link>

        <!-- 房间配置 -->
        <van-cell title="房间配置" is-link to="batchRoomConfig">
            <van-icon slot="right-icon" name="add" />
        </van-cell>
        <!-- 配置列表 -->
        <van-swipe-cell v-for="(item, key) in room_item.dispose" :key="key" class="config-list" :ref="'dispose' + key" :before-close="beforeClose">
            <van-field v-model="item.remarks" :label="item.name" placeholder="品牌/新旧程度">
                <i slot="left-icon" class="iconfont icon-weixin" @click="openSidebar(key)"></i>
            </van-field>
            <van-button slot="right" square text="删除" type="danger" @click="delDisposeItem(key)" />
        </van-swipe-cell>
        <van-cell value="房间配置可以是家私、水电存折、钥匙号等" class="tips" />

		<!-- 应用房间 -->
        <van-cell title="应用房间" :value="room_item.room_no.length ? room_item.room_no.length + '间' : '请选择'" is-link :to="{path: '/applyRoom', query: {roomNo: room_item.room_no}}"  />

        <!-- 户型 -->
        <van-popup v-model="typeShow" position="bottom">
            <van-picker :columns="typeColumns" title="请选择户型" show-toolbar @confirm="onConfirm" @cancel="typeShow = false" />
        </van-popup>
        <!-- 收租周期 -->
        <van-popup v-model="periodShow" position="bottom">
            <van-picker :columns="periodColumns" title="请选择收租周期" show-toolbar @confirm="onConfirm" @cancel="periodShow = false" />
        </van-popup>
		

        <transition name="slide-right" mode="out-in">
            <router-view v-on:getPhotoList="getPhotoList" v-on:getDisposeList="getDisposeList" v-on:getApplyRoom="getApplyRoom"></router-view>
        </transition>
    </div>
</template>

<script>
const floorNum = Array.from({length:99}, (v,k) => k+1);
const tenNum = Array.from({length:10}, (v,k) => k);

export default {
    name: 'BatchConfigItem',
    data () {
        return {
  
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

            popupType: '',


            roomList: [],

            room_item: {
                room_no: [],
                room_type: "",//房间类型
                area: "",//面积
                money: "",//租金
                rents_cycle: "",//收租周期
                dispose: [],//房间配置集合
                img: []
            }

        }
    },

    created(){
        if(this.$route.query && this.$route.query.room_item){
            this.room_item = this.$route.query.room_item;
        }
    },
    methods: {
        

        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/batchConfigList'})
            this.$router.back(-1);
        },

        // 打开上拉菜单
        openPopup(type){
            this.popupType = type;
            this[this.popupType + 'Show'] = true;
        },
        // 上拉菜单确定选择
        onConfirm(value, index) {
            this.room_item[this.popupType == 'type' ? 'room_type' : 'rents_cycle'] = value.toString();
            this[this.popupType + 'Show'] = false;
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
            this.room_item.dispose.splice(key,1); 

            let refArr = Object.keys(this.$refs).filter(item => item.indexOf("dispose") == 0)
            for(let i in refArr){
                if(this.$refs[refArr[i]].length > 0){
                    this.$refs[refArr[i]][0].close();
                }
            }
        },

        // 保存配置
        saveConfigItem(){
            if(this.room_item.room_type == ''){ return this.$toast.fail('户型不能为空'); }

            if(this.room_item.area == ''){ return this.$toast.fail('面积不能为空'); }
            if(this.room_item.money == ''){ return this.$toast.fail('月租金不能为空'); }
            if(this.room_item.rents_cycle == ''){ return this.$toast.fail('收租周期不能为空'); }
            if(this.room_item.room_no.length == 0){ return this.$toast.fail('应用房间不能为空'); }
            // console.log(this.room_item);
            
            this.$emit('getRoomData', this.room_item);
            this.goPrevPage();
        },

        /*获取子页面数据*/
        getPhotoList(data){
            this.room_item.img = data;
        },
        getDisposeList(data){
            this.room_item.dispose = [];
            if(data.length > 0){ 
                for(let i in data){
                    this.room_item.dispose.push({ name: data[i], remarks: '' })
                }
            }
        },
        getApplyRoom(data){
            this.room_item.room_no = data;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .batch-config-item{
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
        
        .config-info{
        	padding-left: 16px;
        	height: 88px;
        	background: #fff;
        	position: relative;
        	&::after{
        		position: absolute;
			    box-sizing: border-box;
			    content: ' ';
			    pointer-events: none;
			    right: 0;
			    bottom: 0;
			    left: 16px;
			    border-bottom: 1px solid #ebedf0;
			    transform: scaleY(.5);
        	}
        	.config-info-list{
        		display: flex;
        		flex-wrap: wrap;
        		.config-info-item{
					width: 50%;
					height: 40px;
					display: flex;
					align-items: center;
					font-size: 14px;
					.info-item-label{
						color: #999;
						width: 60px;
					}
					input{
	                    width: calc(100% - 76px);
	                    border: 0;
	                    height: 18px;
	                    font-size: 14px;
	                    color: #20a0ff;
	                    &::-webkit-input-placeholder{
	                        color: #ababab;

	                    }
	                }
        		}	
        	}
        }

        .photo-album{
            padding: 5px 16px;
            height: 55px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            position: relative;
            &::after{
        		position: absolute;
			    box-sizing: border-box;
			    content: ' ';
			    pointer-events: none;
			    right: 0;
			    bottom: 0;
			    left: 16px;
			    border-bottom: 1px solid #ebedf0;
			    transform: scaleY(.5);
        	}
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

        .van-icon-add{
            font-size: 22px;
            line-height: inherit;
            color: #5788e4;
        }
        .tips{
        	.van-cell__value--alone{
        		font-size: 12px;
        		color: #999;
        	}
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
