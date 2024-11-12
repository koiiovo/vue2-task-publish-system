import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

import MainLayout from '@/layouts/MainLayout.vue';

Vue.use(Router);

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/', component: MainLayout },  // 使用 MainLayout 布局
];

const router = new Router({
  mode: 'history',  // 使用 history 模式
  routes,
});

export default router;
