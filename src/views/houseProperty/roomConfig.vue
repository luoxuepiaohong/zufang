<template>
    <div class="room-config">
        <van-nav-bar title="房间配置" left-arrow  @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveSelect">完成</span>
        </van-nav-bar>
        
        <section class="room-config-list">
        	<!-- 选项列表 -->
        	<van-checkbox-group v-model="result">
        		<!-- 默认配置 -->
				<van-cell-group title="默认配置">
				    <van-cell v-for="(item, index) in list" clickable :key="item" :title="item" @click="toggle(index, 'checkboxes')">
				      	<van-checkbox :name="item" ref="checkboxes" slot="right-icon"/>
				    </van-cell>
				</van-cell-group>
				<!-- 自定义配置 -->
				<van-cell-group title="自定义配置" v-if="list2.length > 0">
				    <van-cell v-for="(item, index) in list2" clickable :key="index" :title="item.name" @click="toggle(index, 'checkboxes2')">
				      	<van-checkbox :name="item.name" ref="checkboxes2" slot="right-icon"/>
				    </van-cell>
				</van-cell-group>
			</van-checkbox-group>
			
			<!-- 底部按钮 -->
			<div class="list-btn">
				<van-button icon="add" plain @click="openDialog">添加自定义配置</van-button>
                <!-- 判断当前配置页是批量配置还是单房配置 -->
				<van-button icon="setting" type="primary" color="linear-gradient(to right, #4bb0ff, #6149f6)" :to="{path: this.$router.history.current.name == 'RoomConfig' ? '/customConfig' : 'batchCustomConfig'}" v-if="list2.length > 0">管理自定义配置</van-button>
			</div>
        </section>

        <!-- 弹窗 -->
		<van-dialog v-model="dialogShow" title="添加自定义配置" show-cancel-button :before-close="beforeClose">
  			<van-field v-model="setVal" placeholder="配置名" />
		</van-dialog>

		<transition name="slide-right" mode="out-in">
            <router-view v-on:refreshDisposeList="refreshDisposeList"></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'RoomConfig',
    data () {
        return {
            result: [],
            list: ['空调', '冰箱', '洗衣机', '热水器', '油烟机', '沙发', '椅子', '床', '衣柜', '梳妆台'],
            list2: [],

            dialogShow: false,
            setVal: '',


        }
    },
    mounted() {
        this.init();
    },
    methods: {
        // 初始化
        init(){
            this.getTags();
        },

        // 获取房间配置列表
        getTags(){
            let url = "house/getTags";
            let params = {
                uid: 100118,
                name: this.setVal
            }

            this.$post(url, params).then((res) => {
                this.list2 = res.data;
            });
        },

        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/addRoomNumber'})
            this.$router.back(-1);
        },  

        toggle(index, resName) {
      		this.$refs[resName][index].toggle();
    	},

    	openDialog(){
    		this.setVal = '';
    		this.dialogShow = true;
    	},


    	beforeClose(action, done){
    		if (action === 'confirm') {
                let url = "house/addTags";
                let params = {
                    uid: 100118,
                    name: this.setVal
                }
                this.$post(url, params).then((res) => {
                    this.getTags();
                    done();
                });
  			} else {
    			done();
  			}
    	},

        // 保存选择
        saveSelect(){
            this.$emit('getDisposeList', this.result);
            this.goPrevPage();
        },


        // 刷新自定义配置列表
        refreshDisposeList(){
            this.result = [];
            this.getTags();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .room-config{
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 499;  
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

        .room-config-list{
        	height: calc(100vh - 50px);
        	overflow: scroll;
        	.list-btn{
        		margin: 20px 0;
        		display: flex;
        		justify-content: space-around;
        	}
        }
    }
</style>
