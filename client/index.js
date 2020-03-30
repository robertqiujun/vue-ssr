import Vue from 'vue'
import App from './app.vue'

// 使用url-loader加载图片和文件
import './assets/styles/global.styl'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root);
