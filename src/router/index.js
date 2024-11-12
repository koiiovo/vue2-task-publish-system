import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(Router);

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = new Router({
  mode: 'history',  // 使用 history 模式
  routes,
});

export default router;
