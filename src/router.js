// Docs - Route manual configuration

// keep the following format: page.sub-page.sub-sub-page
// meaning: page -> sub-page -> sub-sub-page -> ... match the pat5h /page/sub-page/sub-sub-page
// for each page, add the fields `path`, `component`, `name`, `meta.displayName` 

// `path` is the url path
// `component` is the component to be rendered
// `name` is the name of the route
// `meta.displayName` is the name to be displayed in the sidebar
// `meta.description` is the description to be displayed under the displayName
// `meta.icon` is the icon to be displayed in the sidebar and in the name, see https://lucide.dev/guide/packages/lucide-vue-next

export default [
  { path: '/', component: () => import('./pages/Home.vue'), name: 'home', meta: { displayName: 'Home', description: "Welcome to the Home Page", icon: "Home" } },
  { path: '/setup', component: () => import('./pages/Setup.vue'), name: 'setup', meta: { displayName: 'Setup', description: "Fill out the form below to analyze your document.", icon: "UserCog" } },
  { path: '/about', component: () => import('./pages/About.vue'), name: 'about', meta: { displayName: 'About', icon: "TestTubeDiagonal", } },
];
