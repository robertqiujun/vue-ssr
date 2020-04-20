import Vue from 'vue'
import Vuex from 'vuex';
import App from './app.vue'
import VueRouter from 'vue-router';

// 使用url-loader加载图片和文件
import './assets/styles/global.styl'
import createRouter from './config/router';
import createStore from './store/store';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = createRouter();
const store = createStore();

/* 有了template之后就不需要再用这种方式了
const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
  render: (h) => h(App)
}).$mount(root); */

store.registerModule('c', { // 可以直接注册一个模块, 在mapState中可以拿到
  state: {
    text: '模块C中的文本'
  }
});

// store.unregisterModule('c'); // 解绑一个module

// store中的watch方法，第一个参数是一个getters，state变化的时候会执行操作，第二个参数是变化后的数据
/* store.watch((state) => state.count + 1, (newCount) => {
  console.log('%c newCount WATCHED', 'color: pink', newCount);
}); */

// 订阅所有的mutation，可以拿到调用mutation的信息,每次mutation调用都会触发
/* store.subscribe((mutation, state) => {
  console.log('=========store.subscribe=========');
  console.log('%c mutation.type=', 'color: purple', mutation.type);
  console.log('%c mutation.payload=', 'color: purple', mutation.payload);
  console.log('--------------------------------');
}); */

// 订阅action，action调用时会触发
/* store.subscribeAction((action, state) => {
  console.log('======store.subscibeAction=======');
  console.log('%c action.type=', 'color: purple', action.type);
  console.log('%c action.payload=', 'color: purple', action.payload);
  console.log('=================================');
}); */

router.beforeEach((to, from, next) => { // 路由守卫
  console.log('%c before each invoked ', 'color: green', ' to=', to, 'from=', from);
  /* if (to.fullPath === '/login') {
    next();
  } else {
    window.alert('被阻止了');
  } */
  next();
  // next({path: '/login', replace: true}); // 也可以直接传入route配置的参数
});

router.beforeResolve((to, from, next) => {
  console.log('%c before resolve invoked ', 'color: green', ' to=', to, 'from=', from);
  next();
});

router.afterEach((to, from, next) => {
  console.log('%c after each invoked ,跳转完成后执行', 'color: green', ' to=', to, 'from=', from);
});

let app = new Vue({
  router,
  store,
  render: (h) => h(App)
});

app.$mount('#root');
