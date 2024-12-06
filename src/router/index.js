import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/ForgotPassword.vue'),
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '', // 默认子路由
        name: 'Home',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Home.vue'),
      },
      {
        path: 'view-task',
        name: 'ViewTask',
        component: () => import(/* webpackChunkName: "task" */ '@/views/taskHall/ViewTask.vue'),
      },
      {
        path: 'publish-task',
        name: 'PublishTask',
        component: () => import(/* webpackChunkName: "task" */ '@/views/taskHall/PublishTask.vue'),
      },
      {
        path: 'task-detail/:taskName',  // 动态路由，接收任务 ID
        name: 'TaskDetail',
        component: () => import(/* webpackChunkName: "task" */ '@/views/taskHall/TaskDetail.vue'),
        props: true, // 将路由参数作为 props 传递给组件
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "error" */ '@/views/404.vue'), // 404 错误页面
  },
];

const router = new Router({
  mode: 'history',  // 使用 history 模式
  routes,
});

export default router;
