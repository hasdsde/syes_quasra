import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),//侧边栏
    children: [
      {path: '', redirect: 'Dashboard'},  //组件
      {path: 'Dashboard', component: () => import('pages/Dashboard.vue')},
      {path: 'CheckInfo', component: () => import('pages/CheckInfo.vue')},
      {path: 'UserManager', component: () => import('pages/UserManager.vue')},
      {path: 'ItemManager', component: () => import('pages/ItemManager.vue')},
      {path: 'CommentManager', component: () => import('pages/CommentManager.vue')},
      {path: 'PicManager', component: () => import('pages/PicManager.vue')},
      {path: 'UserSetting', component: () => import('pages/UserSetting.vue')},
      {path: 'About', component: () => import('pages/About.vue')},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  //404页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
