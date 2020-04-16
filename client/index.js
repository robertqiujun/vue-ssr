import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router';

// 使用url-loader加载图片和文件
import './assets/styles/global.styl'
import createRouter from './config/router';

const router = createRouter();

/* 有了template之后就不需要再用这种方式了
const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
  render: (h) => h(App)
}).$mount(root); */

Vue.use(VueRouter);

router.beforeEach((to, from, next) => { // 路由守卫
  console.log('before each invoked ', ' to=', to, 'from=', from);
  /* if (to.fullPath === '/login') {
    next();
  } else {
    window.alert('被阻止了');
  } */
  next();
});

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked ', ' to=', to, 'from=', from);
  next();
});

router.afterEach((to, from, next) => {
  console.log('after each invoked ,跳转完成后执行', ' to=', to, 'from=', from);
});

let app = new Vue({
  router,
  render: (h) => h(App)
});

app.$mount('#root');
