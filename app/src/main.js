import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // ルーターのインポート

createApp(App).use(router).mount('#app'); // ルーターを使う設定
