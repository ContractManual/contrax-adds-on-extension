// Docs - Route manual configuration

// keep the following format: page.sub-page.sub-sub-page
// meaning: page -> sub-page -> sub-sub-page -> ... match the pat5h /page/sub-page/sub-sub-page
// for each page, add the fields `path`, `component`, `name`, `meta.displayName` 

// `path` is the url path
// `component` is the component to be rendered
// `name` is the name of the route
// `meta.displayName` is the name to be displayed in the sidebar

export default [
  { path: '/', component: () => import('./pages/Home.vue'), name: 'home', meta: { displayName: 'home' } },
  { path: '/about', component: () => import('./pages/About.vue'), name: 'about', meta: { displayName: 'About' } },
  { path: '/about', component: () => import('./pages/About.vue'), name: 'about', meta: { displayName: 'About' } },
  { path: '/setup', component: () => import('./pages/Setup.vue'), name: 'setup', meta: { displayName: 'Setup' } },
];
