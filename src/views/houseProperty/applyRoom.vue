<template>
    <div class="apply-room">
    	<!-- 批量添加时确认房号 -->
        <van-nav-bar title="确认房号" left-arrow  @click-left="goPrevPage">
        	<span slot="right" class="nav-bar-right" @click="nextStep">下一步</span>
        </van-nav-bar>
		
		<!--  -->
        <section class="apply-room-list">
        	<van-checkbox-group v-model="selectRoom">
                <van-cell-group>
                	<div v-for="(item, key) in roomList" :key="key">
                		<van-cell clickable :title="item.level" @click="toggle(key)">
                      		<van-checkbox :name="item" ref="checkboxes" slot="right-icon"/>
                    	</van-cell>
                		<ol class="room-number-list">
                			<li v-for="(index, idx) in item.room" :class="{'active': index.checked}" @click="clickRoom(key, idx)">{{index.name}}</li>
                		</ol>
                	</div>
                </van-cell-group>
            </van-checkbox-group>
        </section>

        <transition name="slide-right" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'ApplyRoom',
    data () {
        return {
            selectRoom: [],
            roomList: []
        }
    },
    created(){
    	console.log('进来该页面');
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

        // 下一步
        nextStep(){
            let params = Object.assign({roomList: this.roomList},this.houseConfig);

        	this.$router.push({path: '/batchConfigList',query: params})
        },

        // 选择
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
            for(let i in this.roomList[index].room){
            	this.roomList[index].room[i].checked = !this.$refs.checkboxes[index].checked
            }
        },

        // 点击房间
        clickRoom(key, idx){
        	// 单击取反
        	this.roomList[key].room[idx].checked = !this.roomList[key].room[idx].checked;
        	// 判断点击之后该层房间是否全选（true: 不全选,false: 全选）
        	let noAllCheck = this.roomList[key].room.some(item => item.checked == false);

        	if(noAllCheck){                
        		for(let i in this.roomList){
        			if(this.roomList[i].level == key+1){
        				this.$refs.checkboxes[key].checked = false;
        				break;
        			}
        		}
        	}else{
        		this.$refs.checkboxes[key].checked = true;
        	}

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .apply-room{
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

        .apply-room-list{
        	height: calc(100vh - 50px);
        	overflow: scroll;

        	.room-number-list{
        		overflow: hidden;
        		clear: both;
        		/*height: 80px;*/
        		background: #f5f5f5;
        		li{
        			margin: 5px 8px;
        			width: calc(25vw - 18px);
        			background: #fff;
        			height: 40px;
        			line-height: 40px;
        			text-align: center;
        			border-radius: 3px;
        			float: left;
        			border: 1px solid #aaa;
        			color: #999;
        			&.active{
        				background: #5788e4;
        				border-color: #5788e4;;
        				color: #fff;
        			}
        		}
        	}
        }
    }
</style>
