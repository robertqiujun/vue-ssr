import Vue from 'vue';

let app = new Vue({
  // template: `<div>{{text}}</div>`, // 此处不写template，使用render来试验
  data: {
    text: 0
  },
  beforeCreate () {
    // DOM节点还没建立，无法操作，也不要修改data中的数据
    console.log('%c 生命周期:beforeCreate', 'color:red', this.$el);
  },
  created () {
    // DOM节点还没建立，无法操作
    console.log('%c 生命周期:created', 'color:red', this.$el);
  },
  beforeMount () {
    // DOM节点建立，但没有绑定数据
    console.log('%c 生命周期:beforeMount', 'color:red', this.$el);
  },
  mounted () {
    // DOM节点建立，绑定数据
    console.log('%c 生命周期:mounted', 'color:red', this.$el);
  },
  beforeUpdate () {
    console.log('%c 生命周期:beforeUpdate', 'color:red', this);
  },
  updated () {
    console.log('%c 生命周期:updated', 'color:red', this);
  },
  activated () { // 在组件章节
    console.log('%c 生命周期:actived', 'color:red', this);
  },
  deactivated () { // 在组件章节
    console.log('%c 生命周期:deactived', 'color:red', this);
  },
  beforeDestroy () {
    console.log('%c 生命周期:beforeDestroy', 'color:red', this);
  },
  destroyed () {
    console.log('%c 生命周期:destoryed', 'color:red', this);
  },
  render (h) {
    // throw new TypeError('render error'); // 用于测试renderError
    console.log('render function invoked');
    return h('div', {}, this.text);
  },
  renderError (h, err) {
    // 开发中会调用，正式不会调用, 只报当前组件的错误
    return h('div', {}, err.stack);
  },
  renderCapture () {
    // 可以捕获子组件错误，会向上冒泡，并且正式环境可以使用
  }
});

app.$mount('#root');

setTimeout(() => {
  app.text += 1;
}, 1000);

setTimeout(() => {
  app.$destroy(); // 主动销毁实例
}, 3000);
