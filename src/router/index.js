import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Intro from '@/components/Intro'
import NotFound from '@/components/NotFound'
import Signup from "@/components/Signup"
import EnrollNan from "@/views/EnrollNan"
import ShowVisit from "@/views/ShowVisit"
import WriteVisit from '@/views/WriteVisit'
import Statistic from '@/views/Statistic'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '',
          component: Intro,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/enrollNan',
      name: 'EnrollNan',
      component: EnrollNan,
    },
    {
      path: '/showVisit',
      name: 'ShowVisit',
      component: ShowVisit,
    },
    {
      path: '/writeVisit',
      name: 'WriteVisit',
      component: WriteVisit,
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
