import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

const HomePage = ()=>import("@/views/home/index")

// 房产模块
const HouseIndex = ()=>import("@/views/houseProperty/houseIndex")
const AddHouse = ()=>import("@/views/houseProperty/addHouse")
const AccountList = ()=>import("@/views/houseProperty/accountList")
const AddAccount = ()=>import("@/views/houseProperty/addAccount")
const AddRoomNumber = ()=>import("@/views/houseProperty/addRoomNumber")
const HousePhoto = ()=>import("@/views/houseProperty/housePhoto")
const RoomConfig = ()=>import("@/views/houseProperty/roomConfig")
const CustomConfig = ()=>import("@/views/houseProperty/customConfig")
const BatchAddRoom = ()=>import("@/views/houseProperty/batchAddRoom")

Vue.use(Router)

const router = new Router({
  routes: [
    {
      	path: '/',
      	name: 'HomePage',
      	component: HomePage
    },
    {
      	path: '/houseIndex',
      	name: 'HouseIndex',
      	component: HouseIndex,
        children:[
          {
            path: '/addHouse',
            name: 'AddHouse',
            component: AddHouse,
            children:[
              {
                path: '/accountList',
                name: 'AccountList',
                component: AccountList,
                children:[
                  {
                    path: '/addAccount',
                    name: 'AddAccount',
                    component: AddAccount,
                  }
                ]
              },
              {
                path: '/addRoomNumber',
                name: 'AddRoomNumber',
                component: AddRoomNumber,
                children:[
                  {
                    path: '/housePhoto',
                    name: 'HousePhoto',
                    component: HousePhoto
                  },
                  {
                    path: '/roomConfig',
                    name: 'RoomConfig',
                    component: RoomConfig,
                    children:[
                      {
                        path: '/customConfig',
                        name: 'CustomConfig',
                        component: CustomConfig,
                      }
                    ]
                  }
                ]
              },
              {
                path: '/batchAddRoom',
                name: 'BatchAddRoom',
                component: BatchAddRoom
                // ,
                // children:[
                //   {
                //     path: '/addAccount',
                //     name: 'AddAccount',
                //     component: AddAccount,
                //   }
                // ]
              }
            ]
          }
        ]
    }
    
  ]
})



export default router
