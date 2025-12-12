import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';
import { getCurrentSubdomain, isInProjectSubdomain } from '../services/tenantService';

import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue';
import VerifyEmail from '../views/VerifyEmail.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import CheckEmail from '../views/CheckEmail.vue';
import Profile from '../views/Profile.vue';
import ProjectsList from '../views/ProjectsList.vue';
import BotConfigSetup from '../views/BotConfigSetup.vue';
import ChannelsManager from '../views/ChannelsManager.vue';
import EmployeeLogin from '../views/EmployeeLogin.vue';
import EmployeeResetPassword from '../views/EmployeeResetPassword.vue';
import OAuthDiscordCallback from '../views/OAuthDiscordCallback.vue';
import OAuthFacebookCallback from '../views/OAuthFacebookCallback.vue';
import EmployeesManager from '../views/EmployeesManager.vue';
import ProjectConfig from '../views/ProjectConfig.vue';


const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/employee-login',
    name: 'EmployeeLogin',
    component: EmployeeLogin
  },
  {
    path: '/employee-reset-password',
    name: 'EmployeeResetPassword',
    component: EmployeeResetPassword
  },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => {
      if (isInProjectSubdomain()) {
        return import('../views/EmployeeDashboard.vue');
      } else {
        return import('../views/Dashboard.vue');
      }
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: VerifyEmail
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/check-email',
    name: 'CheckEmail',
    component: CheckEmail
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/employees',
    name: 'EmployeesManager',
    component: EmployeesManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'ProjectsList',
    component: ProjectsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:projectId/bot-setup',
    name: 'BotConfigSetup',
    component: BotConfigSetup,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:projectId/channels',
    name: 'ChannelsManager',
    component: ChannelsManager,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:projectId/config',
    name: 'ProjectConfig',
    component: ProjectConfig,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/discord/callback',
    name: 'OAuthDiscordCallback',
    component: OAuthDiscordCallback
  },
  {
    path: '/auth/facebook/callback',
    name: 'OAuthFacebookCallback',
    component: OAuthFacebookCallback
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth);
  const token = Cookies.get('auth_token');
  const inProjectSubdomain = isInProjectSubdomain();
  const subdomain = getCurrentSubdomain();

  // Si estamos en un subdominio de proyecto
  if (inProjectSubdomain) {
    // Si ya estamos autenticados, forzamos al dashboard del tenant
    if (token) {
      if (to.name !== 'Dashboard') {
        console.log(`📍 Subdominio detectado: ${subdomain}, redirigiendo a dashboard`);
        next({ name: 'Dashboard' });
        return;
      }
      // si ya vamos al dashboard, permitir
      next();
      return;
    }

    // Si NO estamos autenticados y no estamos en la ruta de login de empleados, redirigir allí
    if (to.name !== 'EmployeeLogin') {
      console.log(`📍 Subdominio detectado: ${subdomain}, usuario no autenticado - redirigiendo a EmployeeLogin`);
      next({ name: 'EmployeeLogin' });
      return;
    }
    // Si ya vamos a EmployeeLogin, permitir
    next();
    return;
  }

  // Si intentamos acceder a una ruta protegida sin token
  if (protectedRoute && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
