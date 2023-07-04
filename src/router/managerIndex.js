import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/menu/User/login2.vue'
import Home from '@/components/menu/Home2.vue'
import HomePage from '@/components/menu/User/HomePage.vue'
//https://registry.npm.taobao.org
import User from '@/components/menu/personalPage.vue'

// const inNeedToCheck = () => import('@/components/menu/outAndIn/managerCheck.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login ,},
  { path: '/', redirect: '/Login' },
  {
    path: '/home',
    component: Home,
    redirect: '/HomePage',
    children: [
      // 写子路由  显示在主区域
      { path: '/personalPage', component: User},
      { path: '/HomePage', component: HomePage},
      
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫（加别的页面跳转判断，如添加等）
// router.beforeEach((to, from, next) => {
//   if(to.path == '/login' || to.path == '/'){
//       next()
//   }else {
//     // let token = JSON.parse(window.localStorage.getItem("Token"))
//     let token = localStorage.getItem('token')
//     console.log(token)
//     if (  token == null || token === '' ){
//       alert("请先进行登录操作")
//       next('/login')
//     }else {
//       next()
//     }
//   }
// })
// export default router
