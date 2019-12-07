// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import store from './store/store';

Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.headers.common['x-access-token'] = `${store.getters.getAccessToken}`;
axios.defaults.baseURL = 'http://localhost:3000';
Vue.prototype.$store = store;

export default new Vuetify({ });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify: new Vuetify(),
  template: '<App/>',
  render: h => h(App)
}).$mount('#app');
