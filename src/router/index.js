import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Intro from '@/components/Intro';
import NotFound from '@/components/NotFound';
import Signup from '@/components/Signup';
import RefugeeForm from '@/components/RefugeeForm';
import ShowRefugee from '@/views/ShowRefugee';
import ShowVisit from '@/views/ShowVisit';
import WriteVisit from '@/views/WriteVisit';
import Statistic from '@/views/Statistic';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/registerRefugee',
      name: 'RefugeeForm',
      component: RefugeeForm
    },
    {
      path: '/showRefugee',
      name: 'ShowRefugee',
      component: ShowRefugee
    },
    {
      path: '/updateRefugee',
      name: 'UpdateRefugee',
      component: RefugeeForm,
      props: true
    },
    {
      path: '/showVisit',
      name: 'ShowVisit',
      component: ShowVisit
    },
    {
      path: '/writeVisit',
      name: 'WriteVisit',
      component: WriteVisit
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});
