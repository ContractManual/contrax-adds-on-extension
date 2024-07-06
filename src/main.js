import { createApp } from 'vue';
import './assets/index.css';
import App from './App.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import routes from './router';

try {
  // Mock Google Script for development
  if (process.env.NODE_ENV === 'development') {
    import("./lib/mock-google-script");
  }
} catch {}

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
