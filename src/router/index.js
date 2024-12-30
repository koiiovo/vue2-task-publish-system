import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/login/ForgotPassword.vue'),
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'home', // 默认子路由
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'view-task',
        name: 'ViewTask',
        component: () => import('@/views/taskHall/ViewTask.vue'),
      },
      {
        path: 'publish-task',
        name: 'PublishTask',
        component: () => import('@/views/taskHall/PublishTask.vue'),
      },
      {
        path: 'task-detail/:taskName',  // 动态路由，接收任务名称
        name: 'TaskDetail',
        component: () => import('@/views/taskHall/TaskDetail.vue'),
        props: true,
      },
      {
        path: 'my-task/ongoing',
        name: 'OngoingTasks',
        component: () => import('@/views/myTask/OngoingTask.vue'),
      },
      {
        path: 'my-task/ongoing/detail/:taskName',  // 新的路由路径，用于显示进行中任务的详情
        name: 'OngoingDetail',
        component: () => import('@/views/myTask/OngoingDetail.vue'),
        props: true,
      },
      {
        path: 'my-task/reviewing',
        name: 'ReviewingTasks',
        component: () => import('@/views/myTask/ReviewingTask.vue'),
      },
      {
        path: 'my-task/reviewing/detail/:taskName',
        name: 'ReviewingDetail',
        component: () => import('@/views/myTask/ReviewingDetail.vue'),
        props: true,
      },
      {
        path: 'my-task/completed',
        name: 'CompletedTasks',
        component: () => import('@/views/myTask/CompletedTask.vue'),
      },
      {
        path: 'my-task/completed/detail/:taskName',
        name: 'CompletedDetail',
        component: () => import('@/views/myTask/CompletedDetail.vue'),
        props: true,
      },
      {
        path: 'my-task/published',
        name: 'PublishedTasks',
        component: () => import('@/views/myTask/PublishedTask.vue'),
      },
      {
        path: 'my-task/published/detail/:taskName',
        name: 'PublishedDetail',
        component: () => import('@/views/myTask/PublishedDetail.vue'),
        props: true,
      },
      
      {
        path: 'my-message/feedback',
        name: 'FeedbackList',
        component: () => import('@/views/my-message/Feedback.vue'),
      }, {
        path: '/my-message/feedback/:id',
        name: 'FeedbackDetail',
        component: () => import('@/views/my-message/FeedbackDetail.vue'),
        props: true, // 允许将路由参数作为 props 传递给组件
      },
      {
        path: 'my-message/feedback/submit', // 新增路由，指向反馈提交页面
        name: 'SubmitFeedback',
        component: () => import('@/views/my-message/SubmitFeedback.vue'),
      },

      {
        path: 'system-management/user-info',
        name: 'UserInfo',
        component: () => import('@/views/systemManagement/UserInfo.vue'),
      },
      {
        path: 'system-management/settings',
        name: 'SystemSettings',
        component: () => import('@/views/systemManagement/Settings.vue'),
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'), // 404 错误页面
  },
];

const router = new Router({
  mode: 'history',  // 使用 history 模式
  routes,
});

export default router;
