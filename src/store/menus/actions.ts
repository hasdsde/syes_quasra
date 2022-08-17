import {ActionTree} from 'vuex';
import {StateInterface} from '../index';
import {MenuStateInterface} from './state';

const actions: ActionTree<MenuStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
    function uppermenu(context: any, value: String) {
      context.commit("uppermenu", value)
    }

    function thismenu(context: any, value: String) {
      context.commit("thismenu", value)
    }

  }
};

export default actions;
