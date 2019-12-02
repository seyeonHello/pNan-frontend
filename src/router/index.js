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

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = store.getters.getIsAuth;
  if (isAuthenticated) return next();
  window.alert('먼저 로그인 해주세요.');
  next('/login');
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
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});
