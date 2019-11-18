import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Login from '@/views/Login';
import Intro from '@/components/Intro';
import NotFound from '@/components/NotFound';
import signup from "../components/signup";
import enrollNan from "../views/enrollNan";
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
      name: 'signup',
      component: signup,
    },
    {
      path: '/enrollNan',
      name: 'enrollNan',
      component: enrollNan,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
