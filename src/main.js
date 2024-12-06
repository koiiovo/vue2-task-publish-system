import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import './mock/mock.js'


//Google的 Material Icons CSS
import 'material-icons/iconfont/material-icons.css'

//font-awesome图标库导入
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(solid)
library.add(regular)
library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

// 引入 Element UI 样式
import 'element-ui/lib/theme-chalk/index.css' 

Vue.config.productionTip = false
Vue.use(ElementUI)


import axios from 'axios'
Vue.prototype.$axios = axios;// 将 axios 挂载到 Vue 原型

import apiClient from './api/task';
Vue.prototype.$api = apiClient; // 将 API 挂载到 Vue 实例

import moment from 'moment'; // 引入 moment
Vue.prototype.$moment = moment;// 将 moment 挂载到 Vue 原型上

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')