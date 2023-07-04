import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/menu/User/login2.vue'
import Home from '@/components/menu/Home2.vue'
import HomePage from '@/components/menu/User/HomePage.vue'

//https://registry.npm.taobao.org
import User from '@/components/menu/personalPage.vue'
import error from '@/components/other/404.vue'
//const inNeedToCheck = () => import('@/components/menu/outAndIn/managerCheck.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login ,},
  { path: '/', redirect: '/login' },
  { path: '/404', component: error ,},
  {
    path: '/home',
    component: Home,
    redirect: '/HomePage',
    children: [
      { path: '/personalPage', component: User },
      { path: '/HomePage', component: HomePage },
     
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
//       let role = localStorage.getItem('authority')
//       let token = localStorage.getItem('token')
//       console.log(token)
//       if (  token == null || token === '' ){
//         alert("请先进行登录操作")
//         next('/login')
//       }else {
//         if(to.meta.roles.includes(role)){
//           next() //放行
//         }else{
//           alert("没有权限查看")
//         }
//       }
//     }
//   }
 
// })
export default router
