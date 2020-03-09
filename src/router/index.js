import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

const HomePage = ()=>import("@/views/home/index")

// 房产模块(添加)
const HouseIndex = ()=>import("@/views/houseProperty/houseIndex")
const AddHouse = ()=>import("@/views/houseProperty/addHouse")
const AccountList = ()=>import("@/views/houseProperty/accountList")
const AddAccount = ()=>import("@/views/houseProperty/addAccount")
const AddRoomNumber = ()=>import("@/views/houseProperty/addRoomNumber")
const HousePhoto = ()=>import("@/views/houseProperty/housePhoto")
const RoomConfig = ()=>import("@/views/houseProperty/roomConfig")
const CustomConfig = ()=>import("@/views/houseProperty/customConfig")
const BatchAddRoom = ()=>import("@/views/houseProperty/batchAddRoom")
const BatchConfigList = ()=>import("@/views/houseProperty/batchConfigList")
const BatchConfigItem = ()=>import("@/views/houseProperty/batchConfigItem")
const ApplyRoom = ()=>import("@/views/houseProperty/applyRoom")
const SelectHouse = () =>import("@/views/houseProperty/selectHouse")
const SelectPosition = () =>import("@/views/houseProperty/selectPosition")
const SearchPosition = () =>import("@/views/houseProperty/searchPosition")
// 房产模块(管理)
const RoomNumberList = ()=>import("@/views/manageHouses/roomNumberList")
const EditHouse = ()=>import("@/views/manageHouses/editHouse")
const TenantList = ()=>import("@/views/manageHouses/tenantList")
const HistoryTenant = ()=>import("@/views/manageHouses/historyTenant")
const RoomDetails = ()=>import("@/views/manageHouses/roomDetails")
const BillList = ()=>import("@/views/manageHouses/billList")
const ViewRoomPhoto = ()=>import("@/views/manageHouses/viewRoomPhoto")

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
                path: '/selectHouse',
                name: 'SelectHouse',
                component: SelectHouse
              },
              {
                path: '/selectPosition',
                name: 'SelectPosition',
                component: SelectPosition,
                children:[
                  {
                    path: '/searchPosition',
                    name: 'SearchPosition',
                    component: SearchPosition,
                  }
                ]
              },
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
                component: BatchAddRoom,
                children:[
                  {
                    path: '/batchConfigList',
                    name: 'BatchConfigList',
                    component: BatchConfigList,
                    children:[
                      {
                        path: '/batchConfigItem',
                        name: 'BatchConfigItem',
                        component: BatchConfigItem,
                        children:[
                          {
                            path: '/batchHousePhoto',
                            name: 'BatchHousePhoto',
                            component: HousePhoto
                          },
                          {
                            path: '/batchRoomConfig',
                            name: 'BatchRoomConfig',
                            component: RoomConfig,
                            children:[
                              {
                                path: '/batchCustomConfig',
                                name: 'BatchCustomConfig',
                                component: CustomConfig,
                              }
                            ]
                          },
                          {
                            path: '/applyRoom',
                            name: 'ApplyRoom',
                            component: ApplyRoom,
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            path: '/roomNumberList',
            name: 'RoomNumberList',
            component: RoomNumberList,
            children: [
              {
                path: '/editHouse',
                name: 'EditHouse',
                component: EditHouse,
                children:[
                  {
                    path: '/editOfAccountList',
                    name: 'EditOfAccountList',
                    component: AccountList,
                    children:[
                      {
                        path: '/editOfaddAccount',
                        name: 'EditOfAddAccount',
                        component: AddAccount,
                      }
                    ]
                  }
                ]
              },
              {
                path: '/tenantList',
                name: 'TenantList',
                component: TenantList,
                children: [
                  {
                    path: '/historyTenant',
                    name: 'HistoryTenant',
                    component: HistoryTenant,
                    children: [
                      {
                        path: '/billList',
                        name: 'BillList',
                        component: BillList,
                      }
                    ]
                  },
                  {
                    path: '/roomDetails',
                    name: 'RoomDetails',
                    component: RoomDetails,
                    children: [
                      {
                        path: '/viewRoomPhoto',
                        name: 'ViewRoomPhoto',
                        component: ViewRoomPhoto,
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
    }
    
  ]
})



export default router
