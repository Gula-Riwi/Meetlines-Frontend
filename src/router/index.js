import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie';

import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import VerifyEmail from '../views/VerifyEmail.vue'; 
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import CheckEmail from '../views/CheckEmail.vue';
import Profile from '../views/Profile.vue';
import ProjectsList from '../views/ProjectsList.vue'; 


const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard,
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
    path: '/projects', 
    name: 'ProjectsList', 
    component: ProjectsList,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth);
  
  const token = Cookies.get('auth_token');

  if (protectedRoute && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
