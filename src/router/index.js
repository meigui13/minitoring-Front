import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/menu/User/login2.vue'
import Home from '@/components/menu/Home2.vue'
import HomePage from '@/components/menu/User/HomePage.vue'
import Old from '@/components/menu/Management/old.vue'
import Volunteer from '@/components/menu/Management/volunteer.vue'
import Worker from '@/components/menu/Management/worker.vue'
import Minitor from '@/components/menu/Minitoring/minitor.vue'
import Accident from '@/components/menu/Minitoring/accident.vue'
//import Minitorother from '@/components/menu/Minitoring/minitoring.vue'

//https://registry.npm.taobao.org
import User from '@/components/menu/personalPage.vue'
import error from '@/components/other/404.vue'
//const inNeedToCheck = () => import('@/components/menu/outAndIn/managerCheck.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login ,},
  { path: '/', redirect: '/login' },
  { path: '/404', component: error ,},
  //{path:'/minitoring',component:Minitorother},
  {
    path: '/home',
    component: Home,
    redirect: '/HomePage',
    children: [
      { path: '/personalPage', component: User },
      { path: '/HomePage', component: HomePage },
      {path: '/old', component: Old},
      {path:'/volunteer',component:Volunteer},
      {path:'/worker',component:Worker},
      {path:'/minitor',component:Minitor},
      {path:'/accident',component:Accident}
    ]
  }
]


const router = new VueRouter({
  routes
})

// // 路由守卫（加别的页面跳转判断，如添加等）
// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     next('/404')
//   }else {
//     if(to.path == '/login' || to.path == '/' || to.path == '/404'){
//         next()
//     }else {
     
//       let token = localStorage.getItem('userID')
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
