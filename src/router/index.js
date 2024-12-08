import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

Vue.use(Router);

const routes = [
  {
    path: '/login',
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
        path: '', // 默认子路由
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
        path: 'my-task/reviewing',
        name: 'ReviewingTasks',
        component: () => import('@/views/myTask/ReviewingTask.vue'),
      },
      {
        path: 'my-task/completed',
        name: 'CompletedTasks',
        component: () => import('@/views/myTask/CompletedTask.vue'),
      },
      {
        path: 'my-task/published',
        name: 'PublishedTasks',
        component: () => import('@/views/myTask/PublishedTask.vue'),
      },
      {
        path: 'my-team/members',
        name: 'TeamMembers',
        component: () => import('@/views/myTeam/TeamMembers.vue'),
      },
      {
        path: 'circle/discussion',
        name: 'CircleDiscussion',
        component: () => import('@/views/circle/Discussion.vue'),
      },
      {
        path: 'circle/messages',
        name: 'CircleMessages',
        component: () => import('@/views/circle/Messages.vue'),
      },
      {
        path: 'circle/feedback',
        name: 'CircleFeedback',
        component: () => import('@/views/circle/Feedback.vue'),
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
