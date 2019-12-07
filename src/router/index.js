import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Main from '@/views/Main';
import NotFound from '@/views/NotFound';
import Signup from '@/views/Signup';
import ShowRefugee from '@/views/ShowRefugee';
import ShowVisit from '@/views/ShowVisit';
import Statistic from '@/views/Statistic';
import store from '../store/store';
import Admin from '../views/Admin';

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = store.getters.getIsAuth;
  if (isAuthenticated) return next();
  window.alert('먼저 로그인 해주세요.');
  next('/login');
};

const requireAdmin = () => (from, to, next) => {
  const isAuthenticated = store.getters.getIsAuth;
  const isAdmin = store.getters.getIsAdmin;
  if (isAuthenticated && isAdmin) return next();
  window.alert('관리자가 아닙니다.');
  next('/');
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Intro',
      component: Main,
      beforeEnter: requireAuth()
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/showRefugee',
      name: 'ShowRefugee',
      component: ShowRefugee,
      beforeEnter: requireAuth()
    },
    {
      path: '/showVisit',
      name: 'ShowVisit',
      component: ShowVisit,
      beforeEnter: requireAuth()
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic,
      beforeEnter: requireAuth()
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: requireAdmin()
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});
