<template>
    <div class="batch-config-list">
        <van-nav-bar title="房间配置" left-arrow @click-left="goPrevPage">
            <span slot="right" class="nav-bar-right" @click="saveConfig">保存</span>
        </van-nav-bar>
        <!-- 添加配置 -->
        <div class="header-add" @click="goConfigItem('add')">
	        <van-icon name="add" />新增配置
        </div>
		
        <ul class="list-container">
        	<li class="list-container-item" v-for="(item, key) in room_data" :key="key">
        		<div class="item-header">
        			<div class="item-header-title">配置{{key + 1}}</div>
					
					<div class="item-header-btn">
						<span @click="delConfigItem(key)">删除</span>
        				<span @click="goConfigItem('edit',key)">编辑</span>
					</div>
        		</div>
        		<ul class="item-info">
        			<li>
        				<span class="item-info-label">户型</span>
        				<span>{{item.room_type}}</span>
        			</li>
        			<li>
        				<span class="item-info-label">面积</span>
        				<span>{{item.area}}</span>
        			</li>
        			<li>
        				<span class="item-info-label">月租金</span>
        				<span>{{item.money}}</span>
        			</li>
        			<li>
        				<span class="item-info-label">收租周期</span>
        				<span>{{item.rents_cycle}}</span>
        			</li>
        		</ul>
        	</li>
        </ul>

        <transition name="slide-right" mode="out-in">
            <router-view v-on:getRoomData="getRoomData"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'BatchConfigList',
    data () {
        return {
            houseConfig: [],
            room_data: [],
        }
    },

    created(){
        console.log(this.$route);
        if(this.$route.query && this.$route.query.houseConfig){
            this.houseConfig = this.$route.query.houseConfig;
        }
        console.log(this.houseConfig)
    },
    methods: {
        // 返回上一页
        goPrevPage(){
            // this.$router.push({path: '/batchAddRoom'})
            sessionStorage.removeItem("configInfo");
            this.$router.back(-1);
        }, 
        // 保存配置
        saveConfig(){
            if(this.room_data.length == 0){
                return this.$toast.fail('请先添加配置');
            }
            let url = "house/addHouse";
            let params = Object.assign({uid: 100118}, this.houseConfig);

            params.house.uid = 100118;
            params.room.allRoom_status = 1;
            params.room.installation = params.room.installation.join(',');
            params.room.room_data = this.room_data;
            
            console.log('params:',params);

            this.$post(url, params).then((res) => {
                console.log('res:',res);
            });
        },

        // 删除单个配置
        delConfigItem(key){
            this.room_data.splice(key, 1);
        },

        // 去往配置页面
        goConfigItem(type,key){
            let configInfo = {
                type: type,
                disposeRoom: []
            };

            for(let i=0; i<this.room_data.length; i++){
                if(type == 'edit' && key == i){ 
                    configInfo.index = key;
                    continue; 
                }
                configInfo.disposeRoom = [...configInfo.disposeRoom, ...this.room_data[i].room_no];
            }

            sessionStorage.setItem("configInfo",JSON.stringify(configInfo));

            if(type == 'add'){
                this.$router.push({path: '/batchConfigItem'})
            }else{
                this.$router.push({path: '/batchConfigItem', query: {room_item: this.room_data[key]}})
            }
        },

        // 获取房间数据
        getRoomData(data){
            let configInfo = JSON.parse(sessionStorage.getItem("configInfo"));

            if(configInfo.type == 'add'){
                this.room_data.push(data);
            }else{
                this.room_data[configInfo.index] = data;
            }
            
        },
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .batch-config-list{
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        height: 100vh;
        background: #f5f5f5;
        z-index: 299;  
        .van-nav-bar{
            background: #5788e4;
            .van-icon-search{
                color: #fff;
                font-size: 24px;
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
        .header-add{
        	background: #fff;
        	height: 40px;
        	display: flex;
        	align-items: center;
        	justify-content: center;
        	color: #5788e4;
        	margin-bottom: 10px;
        	.van-icon{
        		margin-right: 8px;
        		font-size: 22px;
        	}
        }
        .list-container{
        	height: calc(100vh - 91px);
        	padding: 0 10px;
        	overflow: scroll;
        	.list-container-item{
        		margin-bottom: 10px;
        		background: #fff;
        		overflow: hidden;
        		height: 115px;
        		border-radius: 10px;
				padding: 0 10px;
				.item-header{
					height: 40px;
					font-size: 14px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;
					.item-header-title{
						padding-left: 8px;
						position: relative;
						&:before{
							content: ' ';
							position: absolute;
							top: 20%;
							left: 0;
							height: 65%;
							width: 1px;
							background: #20a0ff;
						}
					}
					.item-header-btn{
						color: #20a0ff;
						width: 70px;
						display: flex;
						justify-content: space-between;

					}
				}
				.item-info{
					font-size: 14px;
					li{
						width: 50%;
						float: left;
						margin: 10px 0;
						&:nth-child(-n+2){
							margin-bottom: 0;
						}
						.item-info-label{
							color: #999;
							display: inline-block;
							width: 60px;
						}
					}
				}
        	}
        }
    }
</style>
