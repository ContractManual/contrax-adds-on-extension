import { createApp } from 'vue';
import './app.css';
import App from './App.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import routers from './router';

const router = createRouter({
  history: createMemoryHistory(),
  routers,
});

createApp(App).use(router).mount('#app');
