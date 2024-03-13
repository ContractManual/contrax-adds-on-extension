export default [
  { path: '/', component: () => import('./pages/Home.vue'), name: 'home', meta: { displayName: 'heem' } },
  { path: '/about', component: () => import('./pages/About.vue'), name: 'about', meta: { displayName: 'About' } },
];
