/**
 * Created by caoziwen on 2018/05/26.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import vuexAlong from 'vuex-along';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [vuexAlong]
});
