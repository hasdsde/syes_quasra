import {MutationTree} from 'vuex';
import {MenuStateInterface} from './state';

const mutation: MutationTree<MenuStateInterface> = {
  someMutation(/* state: MenuStateInterface */) {
    // your code
  },
  uppermenu(state: any, value: String) {
    state.uppermenu = value;
  },
  thismenu(state: any, value: String) {
    state.thismenu = value;
  }
};

export default mutation;
