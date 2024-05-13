// See README.md for more for routing routing

export default [
  { path: '/', component: () => import('./pages/Home.vue'), name: 'home', meta: { displayName: 'Home', description: "Welcome to the Home Page", icon: "Home" } },
  { path: '/setup', component: () => import('./pages/Setup.vue'), name: 'setup', meta: { displayName: 'Setup', description: "Fill out the form below to analyze your document.", icon: "UserCog" } },
  { path: '/contract-analysis', component: () => import('./pages/ContractAnalysis.vue'), name: 'contract-analysis', meta: { displayName: 'Contract Analysis', description: "Analyze your document for Fairness, Onerousness, & Enforceability", icon: "FileBarChart2" } },
  { path: '/legal-text', component: () => import('./pages/LegalText.vue'), name: 'legal-text', meta: { displayName: 'Legal Text', description: "", icon: "Gavel" } },
  { path: '/basic-review', component: () => import('./pages/BasicReview.vue'), name: 'basic-review', meta: { displayName: 'Basic Review', description: "Id anim nostrud irure exercitation cillum dolore id elit do nostrud.", icon: "Rabbit" } },
  { path: '/in-depth-analysis', component: () => import('./pages/InDepthAnalysis.vue'), name: 'in-depth-analysis', meta: { displayName: 'In Depth Analysis', description: "Dolor cillum aliquip voluptate esse exercitation sunt.", icon: "Search" } },
  // { path: '/about', component: () => import('./pages/About.vue'), name: 'about', meta: { displayName: 'About', icon: "TestTubeDiagonal", } },
];
