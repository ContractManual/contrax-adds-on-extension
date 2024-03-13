import { createApp } from 'vue';
import './assets/index.css';
import App from './App.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import routes from './router';

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
