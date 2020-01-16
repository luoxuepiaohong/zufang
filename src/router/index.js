import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

const HomePage = ()=>import("@/views/home/index")
const HouseIndex = ()=>import("@/views/houseProperty/houseIndex")
const AddHouse = ()=>import("@/views/houseProperty/addHouse")
const AccountList = ()=>import("@/views/houseProperty/accountList")
const AddAccount = ()=>import("@/views/houseProperty/addAccount")


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
              }
            ]
          }
        ]
    }
    
  ]
})



export default router
