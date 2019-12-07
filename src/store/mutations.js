import * as types from './mutation_types';

export default {
  [types.IS_AUTH] (state, isAuth) {
    state.isAuth = isAuth;
  },
  [types.ACCESSTOKEN] (state, accessToken) {
    state.accessToken = accessToken;
  },
  [types.IS_ADMIN] (state, isAdmin) {
    state.isAdmin = isAdmin;
  }
};
