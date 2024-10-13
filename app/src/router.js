import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue'; // パスを修正
import Detail from './views/DetailPage.vue'; // パスを修正

const routes = [
  { path: '/', component: Home }, // トップページ
  { path: '/detail/:id', component: Detail } // 詳細ページ
];

const router = createRouter({
  history: createWebHistory(my-vue-crud),
  routes
});

export default router;
