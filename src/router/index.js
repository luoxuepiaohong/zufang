import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'

const HomePage = ()=>import("@/views/home/index")
const HouseIndex = ()=>import("@/views/houseProperty/houseIndex")
const AddHouse = ()=>import("@/views/houseProperty/addHouse")


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
      	component: HouseIndex
    },
    {
    	path: '/addHouse',
      	name: 'AddHouse',
      	component: AddHouse
    }
  ]
})



export default router
