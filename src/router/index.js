import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/components/welcome/welcome.vue'
import Login from '@/components/welcome/Login.vue'
import Home from '@/menu/Home.vue'
import Enter from'@/menu/enter.vue'
import Plan from '@/menu/plan.vue'
import Out from '@/menu/out.vue'
import Seek from '@/menu/seekParcel.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/welcome', component: Welcome },
  { path: '/login', component: Login },
  // { path: '/register', component: Register },
  { path: '/', redirect: '/welcome' },
  {
    path: '/home',
    component: Home,
    children: [
      // 写子路由  显示在主区域
      { path: '/enter', component: Enter },
      { path: '/plan', component: Plan },
      { path: '/out', component: Out},
      { path: '/seek', component: Seek }
      // { path: '/changeInfo', component: ChangeInfo },
      // { path: '/personalPage', component: PersonalPage },
      // { path: '/userManagement', component: UserManagement },
      // { path: '/changePW', component: ChangePW },
      // { path: '/main', component: Main },
      // { path: '/algorithmCom', component: AlgorithmCom },
      // { path: '/userIndex', component: UserIndex },
      // { path: '/test', component: Test },
      // { path: '/judgeDefect', component: JudgeDefect },
      // { path: '/home', redirect: '/userIndex' }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
