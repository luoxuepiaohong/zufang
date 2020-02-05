<template>
    <div class="batch-add-room">
        <van-nav-bar title="确认房号" left-arrow  @click-left="goPrevPage">
        	<span slot="right" class="nav-bar-right" @click="nextStep">下一步</span>
        </van-nav-bar>
		
		<!--  -->
        <section class="batch-add-room-list">
        	<van-checkbox-group v-model="result">
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
    </div>
</template>

<script>

export default {
    name: 'BatchAddRoom',
    data () {
        return {
            result: [],
            list: [1,2,3,4,5,6,7],
            roomList: [
            	// {
            	// 	level: 1,
            	// 	room: [
            	// 		{ name: 101, checked: true },
            	// 		{ name: 102, checked: true },
		           //  	{ name: 103, checked: true },
		           //  	{ name: 104, checked: true },
		           //  	{ name: 105, checked: true }
            	// 	]
            	// },
            	// {
            	// 	level: 2,
            	// 	room: [
            	// 		{ name: 201, checked: true },
            	// 		{ name: 202, checked: true },
		           //  	{ name: 203, checked: true },
		           //  	{ name: 204, checked: true },
		           //  	{ name: 205, checked: true }
            	// 	]
            	// },
            	// {
            	// 	level: 3,
            	// 	room: [
            	// 		{ name: 301, checked: true },
            	// 		{ name: 302, checked: true },
		           //  	{ name: 303, checked: true },
		           //  	{ name: 304, checked: true },
		           //  	{ name: 305, checked: true }
            	// 	]
            	// },
            	// {
            	// 	level: 4,
            	// 	room: [
            	// 		{ name: 401, checked: true },
            	// 		{ name: 402, checked: true },
		           //  	{ name: 403, checked: true },
		           //  	{ name: 404, checked: true },
		           //  	{ name: 405, checked: true }
            	// 	]
            	// },
            	// {
            	// 	level: 5,
            	// 	room: [
            	// 		{ name: 501, checked: true },
            	// 		{ name: 502, checked: true },
		           //  	{ name: 503, checked: true },
		           //  	{ name: 504, checked: true },
		           //  	{ name: 505, checked: true }
            	// 	]
            	// },
            	// {
            	// 	level: 6,
            	// 	room: [
            	// 		{ name: 601, checked: true },
            	// 		{ name: 602, checked: true },
		           //  	{ name: 603, checked: true },
		           //  	{ name: 604, checked: true },
		           //  	{ name: 605, checked: true }
            	// 	]
            	// }
            ]
        }
    },
    created(){
    	let item = {
    		level: 7,
    		room: 11,
    	}
    	for(let i=1; i<=item.level; i++){
    		this.roomList.push({
    			level: i,
    			room: []
    		})
    		for(let j=1; j<=item.room; j++){
    			let tempNum = j > 9 ? (i + '' + j) : (i + '0' + j);
    			this.roomList[i-1].room.push({
    				name: tempNum, 
    				checked: true 
    			})
    		}
    	}

    	this.result = [...this.roomList]
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

        // 下一步
        nextStep(){

        },

        // 选择
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
            // if(){          //选中
            	for(let i in this.roomList[index].room){
            		this.roomList[index].room[i].checked = !this.$refs.checkboxes[index].checked
            	}
            // }else{                                              //取消选中
            // 	console.log('全不选');
            // }
        },

        // 点击房间
        clickRoom(key, idx){
        	// 单击取反
        	this.roomList[key].room[idx].checked = !this.roomList[key].room[idx].checked;
        	// 判断点击之后该层房间是否全选（true: 不全选,false: 全选）
        	let noAllCheck = this.roomList[key].room.some(item => item.checked == false);

        	if(noAllCheck){                
        		for(let i in this.result){
        			if(this.result[i].level == key+1){
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
    .batch-add-room{
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

        .batch-add-room-list{
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
