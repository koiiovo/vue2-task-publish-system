import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

Vue.use(Router);

const routes = [
  // 登录相关路由
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
  // 主路由，所有页面都基于此布局
  {
    path: '/',
    component: MainLayout,  // 使用 MainLayout 作为页面布局
    children: [
      // 默认子路由：主页
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      // 查看任务页面
      {
        path: 'view-task',
        name: 'ViewTask',
        component: () => import('@/views/taskHall/ViewTask.vue'),
      },
      // 发布任务页面
      {
        path: 'publish-task',
        name: 'PublishTask',
        component: () => import('@/views/taskHall/PublishTask.vue'),
      },
      // 任务详情页面，动态路由根据任务名称加载
      {
        path: 'task-detail/:taskName',
        name: 'TaskDetail',
        component: () => import('@/views/taskHall/TaskDetail.vue'),
        props: true, // 将路由参数作为 props 传递给组件
      },
      // 我的任务路由：进行中任务
      {
        path: 'my-task/ongoing',
        name: 'OngoingTasks',
        component: () => import('@/views/myTask/OngoingTask.vue'),
      },
      // 进行中任务详情
      {
        path: 'my-task/ongoing/detail/:taskName',
        name: 'OngoingDetail',
        component: () => import('@/views/myTask/OngoingDetail.vue'),
        props: true, // 将路由参数作为 props 传递给组件
      },
      // 我的任务路由：审核中任务
      {
        path: 'my-task/reviewing',
        name: 'ReviewingTasks',
        component: () => import('@/views/myTask/ReviewingTask.vue'),
      },
      // 审核中任务详情
      {
        path: 'my-task/reviewing/detail/:taskName',
        name: 'ReviewingDetail',
        component: () => import('@/views/myTask/ReviewingDetail.vue'),
        props: true,
      },
      // 我的任务路由：已完成任务
      {
        path: 'my-task/completed',
        name: 'CompletedTasks',
        component: () => import('@/views/myTask/CompletedTask.vue'),
      },
      // 已完成任务详情
      {
        path: 'my-task/completed/detail/:taskName',
        name: 'CompletedDetail',
        component: () => import('@/views/myTask/CompletedDetail.vue'),
        props: true,
      },
      // 我的任务路由：已发布任务
      {
        path: 'my-task/published',
        name: 'PublishedTasks',
        component: () => import('@/views/myTask/PublishedTask.vue'),
      },
      // 已发布任务详情
      {
        path: 'my-task/published/detail/:taskName',
        name: 'PublishedDetail',
        component: () => import('@/views/myTask/PublishedDetail.vue'),
        props: true,
      },
      // 我的消息：问题反馈
      {
        path: 'my-message/feedback',
        name: 'FeedbackList',
        component: () => import('@/views/my-message/Feedback.vue'),
      },
      // 问题反馈详情页面
      {
        path: '/my-message/feedback/:id',
        name: 'FeedbackDetail',
        component: () => import('@/views/my-message/FeedbackDetail.vue'),
        props: true, // 将路由参数作为 props 传递给组件
      },
      // 提交反馈页面
      {
        path: 'my-message/feedback/submit',
        name: 'SubmitFeedback',
        component: () => import('@/views/my-message/SubmitFeedback.vue'),
      },
      // 系统管理：用户信息
      {
        path: 'system-management/user-info',
        name: 'UserInfo',
        component: () => import('@/views/systemManagement/UserInfo.vue'),
      },
      // 系统管理：设置
      //{
      //  path: 'system-management/settings',
      //  name: 'SystemSettings',
      //  component: () => import('@/views/systemManagement/Settings.vue'),
      //},
    ],
  },
  // 404 错误页面
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  },
];


const router = new Router({
  mode: 'history',  // 使用 history 模式，避免 URL 中出现 # 符号
  routes,
});

export default router;
