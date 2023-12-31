import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import LoginComponent from '../components/login/LoginComponent.vue';
import RegisterComponent from '../components/register/RegisterComponent.vue';
import HomeComponent from '../components/home/HomeComponent.vue';
import Dashboard from '../components/DashboardModule.vue';
import Alteraconta from '../components/AlteracontaModule.vue';
import Alteraconta2 from '../components/AlteracontaModule2.vue';
import Listarusuarios from '../components/ListUserModule.vue';
import isAuthenticated from './authguard.js';
import PageNotFound from '../components/PageNotFound.vue'
import EditFormUser from '../components/EditFormUser.vue'

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
    path: '/:catchAll(.*)',
    component: PageNotFound,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeComponent,
    children: [
      {
        path: '/dash', // Rota vazia para a página inicial
        component: Dashboard,
        meta: { moduleName: 'Dashboard' },
      },
      {
        path: '/', // Rota vazia para a página inicial
        component: Dashboard,
        meta: { moduleName: 'Home' },
      },
      {
        path: '/listusers', // Rota vazia para a página inicial
        component: Listarusuarios,
        meta: { moduleName: 'Lista de usuários' },
      },
      {
        path: '/alterarconta', // Rota vazia para a página inicial
        component: Alteraconta,
        meta: { moduleName: 'Alterar conta contábil' },
      },
      {
        path: '/teste', // Rota vazia para a página inicial
        component: Alteraconta2,
        meta: { moduleName: 'Alterar conta contábil' },
      },
      {
        path: '/editarusuario/:userId', // Rota vazia para a página inicial
        component: EditFormUser,
        meta: { moduleName: 'Alterar usuário' },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
/*router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});*/
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (to.name === 'login' || to.name === 'register') {
    // Se a rota for a página de login ou registro, deixe o usuário passar
    next();
  } else {
    // Se a rota for protegida, verifique se o usuário está autenticado
    if (isAuthenticated()) {
      // Se estiver autenticado, deixe o usuário passar
      next();
    } else {
      // Se não estiver autenticado, redirecione para a página de login
      alert('Você precisa fazer o login para acessar esta página.');
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
