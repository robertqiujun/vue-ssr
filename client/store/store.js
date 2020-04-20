import Vuex from 'vuex';

import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

const isDev = process.env.NODE_ENV === 'development';
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 加上之后就无法从外部使用$store来修改数据了,仅仅用在开发环境，正式环境不要用
    state: defaultState,
    mutations: mutations,
    actions,
    getters,
    modules: { // 分模块
      a: {
        state: {
          text: 'a模块的数据'
        },
        mutations: { // 默认mutations会被统一放在全局下面，所以mapMutations可以直接拿到模块的mutation方法
          updateText (state, text) {
            console.log('a模块中的state=', state);
            state.text = text;
          }
        },
        actions: {
          testAction ({commit}) {
            console.log('A中修改B的text')
            commit('b/updateText', 'A中修改B的text', {root: true});
          }
        }
      },
      b: {
        namespaced: true, // 使用命名空间，防止mutation被放在全局下面
        state: {
          text: 'b模块的数据'
        },
        mutations: {
          updateText (state, text) {
            console.log('b模块中的state=', state);
            state.text = text;
          }
        },
        getters: {
          textPlus (state, getters, rootState) { // rootState是全局的state
            return state.text + '_1_' + rootState.a.text;
          }
        },
        actions: {
          add ({state, commit, rootState}) { // 模块的context, 包含了state, commit, rootState
            commit('updateText', 'b模块action方法修改了text=>' + rootState.count);
            commit('updateCount', {num: 56789}, {root: true}); // 这样会去全局找updateCount方法
          },
        }
      }
    },
    plugins: [ // 定义一个vuex插件
      (store) => {
        console.log('my plugin invoked');
      }
    ]
  });

  if (module.hot) { // vuex 热更新功能
    module.hot.accept([ // 把对应方法的文件路径传入
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default;
      const newMutations = require('./mutations/mutations').default;
      const newGetters = require('./getters/getters').default;
      const newActions = require('./actions/actions').default;

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions,
      })
    });
  }

  return store;
};
