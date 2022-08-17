import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),//侧边栏
    children: [
      {path: '', redirect: 'Dashboard'},  //组件
      {path: 'Dashboard', component: () => import('pages/Dashboard.vue')},
      {path: 'CheckInfo', component: () => import('pages/CheckInfo.vue')}
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
