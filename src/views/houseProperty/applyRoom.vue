<template>
    <div class="apply-room">
    	<!-- 批量添加时确认房号 -->
        <van-nav-bar title="应用房间" left-arrow  @click-left="goPrevPage">
        	<span slot="right" class="nav-bar-right" @click="saveApply">保存</span>
        </van-nav-bar>
		
		<!--  -->
        <section class="apply-room-list">
        	<van-checkbox-group v-model="selectRoom">
                <van-cell-group>
                	<div v-for="(item, key) in roomList" :key="key">
                		<van-cell clickable :title="item.level" @click="toggle(key)">
                      		<van-checkbox :name="item" ref="checkboxes" slot="right-icon" :disabled="disabledArr[key]" />
                    	</van-cell>
                		<ol class="room-number-list">
                			<li v-for="(index, idx) in item.room" :class="{'active': index.checked, 'disabled': index.disabled}" @click="clickRoom(key, idx)">{{index.name}}</li>
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
    	// 获取用户确认的房号列表
    	this.roomList = JSON.parse(sessionStorage.getItem("conformRoom")) || [];
    	// 获取用户已经应用于房间配置上的房间列表
    	const disposeRoom = ['102','103','104'];
    	// 获取用户在该配置上选中的房间列表
    	const checkedRoom = this.$route.query.roomNo || [];

    	// 1、把用户在该配置上没有选中房间全部重置为未选状态
    	// 2、把用户在其他配置上应用的房间全部调整为不可点击状态
    	this.roomList.forEach((value,index) => {
            this.roomList[index].room = this.roomList[index].room.map(item => {

            	// 调整选中状态
            	if(checkedRoom.length > 0){
            		for(let i=0; i<checkedRoom.length; i++){
	            		if(item.name == checkedRoom[i]){
	            			item.checked = true;
	            			break
	            		}else if(i == checkedRoom.length - 1){
	            			item.checked = false;
	            		}
	            	}
            	}else{
            		item.checked = false;
            	}
            	
            	// 调整点击状态
            	for(let j=0; j<disposeRoom.length; j++){
            		if(item.name == disposeRoom[j]){
            			item.disabled = true;
            			break
            		}else if(j == disposeRoom.length - 1){
            			item.disabled = false;
            		}
            	}
            	return item;
            })

            if(!this.roomList[index].room.some(item => !item.disabled && !item.checked)){
            	this.$nextTick(function(){
            		this.$refs.checkboxes[index].toggle();
            	})
            }
        })
    },
    computed: {
    	disabledArr: function(){
    		let tempArr = [];
    		for(let i in this.roomList){
    			let state = this.roomList[i].room.some(item => !item.disabled)
    			tempArr[i] = !state;
    		}
    		return tempArr;
    	}
    },
    methods: {
        // 返回上一页
        goPrevPage(){
            this.$router.back(-1);
        },  

        // 保存应用房间
        saveApply(){
            let applyRoom = [];
            for(let i=0; i<this.roomList.length; i++){
            	for(let j=0; j<this.roomList[i].room.length; j++){
            		if(!this.roomList[i].room[j].disabled && this.roomList[i].room[j].checked){
            			applyRoom.push(this.roomList[i].room[j].name);
            		}
            	}
            }
            this.$emit('getApplyRoom',applyRoom);
            this.goPrevPage();
        },

        // 选择
        toggle(index) {
        	// 若该层房间均已禁用，则不做任何操作
        	if(this.disabledArr[index]){ return; }

            this.$refs.checkboxes[index].toggle();
            for(let i in this.roomList[index].room){
            	if(!this.roomList[index].room[i].disabled){
            		this.roomList[index].room[i].checked = !this.$refs.checkboxes[index].checked
            	}
            }
        },

        // 点击房间
        clickRoom(key, idx){
        	// 若该房间已禁用，则不做任何操作
        	if(this.disabledArr[key]){ return; }

        	// 单击取反
        	this.roomList[key].room[idx].checked = !this.roomList[key].room[idx].checked;
        	// 判断点击之后该层房间是否全选（true: 不全选,false: 全选）
        	let noAllCheck = this.roomList[key].room.some(item => !item.disabled && !item.checked);

        	if(noAllCheck){                
        		for(let i=0; i<this.roomList.length; i++){
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
        				border-color: #5788e4;
        				color: #fff;
        			}
        			&.disabled{
						background: #dcdcdc;
        				border-color: #dcdcdc;
        				color: #999;
        			}
        		}
        	}
        }
    }
</style>
