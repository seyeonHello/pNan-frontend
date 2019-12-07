import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import createPersist from 'vuex-localstorage';

Vue.use(Vuex);

const getdefaultState = () => {
  return {
    isAuth: false,
    accessToken: '',
    isAdmin: false
  };
};

const state = getdefaultState();

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersist({
    namespace: 'pnan',
    initialState: {},
    expires: 150 * 60 * 1000
  })]
});
