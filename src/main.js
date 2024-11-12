import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'

// 引入 Element UI 样式
import 'element-ui/lib/theme-chalk/index.css' 

// 将 axios 添加到 Vue 原型
Vue.prototype.$axios = axios;

// 引入 mock.js
import './mock/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')