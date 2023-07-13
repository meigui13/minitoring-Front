import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import * as echarts from 'echarts'

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
// window.localStorage.setItem('token',JSON.stringify({
//   token: "okkk"
// }))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
