import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import LoginComponent from '../components/login/LoginComponent.vue';
import RegisterComponent from '../components/register/RegisterComponent.vue';
import HomeComponent from '../components/home/HomeComponent.vue';
import Dashboard from '../components/DashboardModule.vue';
import Alteraconta from '../components/AlteracontaModule.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent,
  },
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
    children: [
      {
        path: '/dash', // Rota vazia para a página inicial
        component: Dashboard,
        meta: { moduleName: 'Dashboard' },
      },
      {
        path: '/alterarconta', // Rota vazia para a página inicial
        component: Alteraconta,
        meta: { moduleName: 'Alterar conta contábil' },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
