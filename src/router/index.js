import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/menu/User/login2.vue'
import Home from '@/components/menu/Home2.vue'
import HomePage from '@/components/menu/User/HomePage.vue'
import Old from '@/components/menu/Management/old.vue'
import AddOld from '@/components/menu/Management/addOld'
import AddFace from '@/components/menu/Management/addFace'
import Volunteer from '@/components/menu/Management/volunteer.vue'
import AddVolunteer from '@/components/menu/Management/addVolunteer'
import Employee from '@/components/menu/Management/employee'
import AddEmployee from '@/components/menu/Management/addEmployee'
import MinitorEmotion from '@/components/menu/Minitoring/minitorEmotion.vue'
import MinitorFall from '@/components/menu/Minitoring/minitorFall.vue'
import MinitorInteract from '@/components/menu/Minitoring/minitorInteract.vue'
import MinitorIntrusion from '@/components/menu/Minitoring/minitorIntrusion.vue'
import Test from '@/components/other/test'

import User from '@/components/menu/personalPage.vue'
import error from '@/components/other/404.vue'



//const inNeedToCheck = () => import('@/components/menu/outAndIn/managerCheck.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login ,},
  { path: '/', redirect: '/login' },
  { path: '/404', component: error ,},
  { path: '/testcamera',component: Test},
  {
    path: '/home',
    component: Home,
    redirect: '/HomePage',
    children: [
      { path: '/personalPage', component: User },
      { path: '/HomePage', component: HomePage },
      { path: '/old', component: Old },
      { path: '/addOld', component: AddOld },
      { path: '/addFace', component:AddFace},
      { path: '/volunteer',component: Volunteer },
      { path: '/addVolunteer', component: AddVolunteer },
      { path: '/employee',component: Employee },
      { path: '/addEmployee',component: AddEmployee },
      { path: '/minitorEmotion',component:MinitorEmotion},
      { path: '/minitorFall',component:MinitorFall},
      { path: '/minitorinteract',component:MinitorInteract},
      { path: '/minitorintrusion',component:MinitorIntrusion}
    ]
  }
]


const router = new VueRouter({
  routes
})

// 路由守卫（加别的页面跳转判断，如添加等）
// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     next('/404')
//   }else {
//     if(to.path == '/login' || to.path == '/' || to.path == '/404'){
//         next()
//     }else {

//       let token = window.sessionStorage.getItem('username')
//       console.log(token)
//       if (  token == null || token === '' ){
//         alert("请先进行登录操作")
//         next('/login')
//       }else {
//          next() //放行
//       }
//     }
//   }

// })
export default router
