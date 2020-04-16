import Vue from 'vue';

// eslint 不允许直接使用 new，给eslintrc加上no-new:"off"
/* 两种初始化方式效果相同
new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'this is template'
  }
});
*/

const app = new Vue({
  template: '<div ref="div"><p>{{text}}</p><span style="padding: 10px" ref="pCount">{{count}}</span><span style="padding: 10px">obj.a={{obj.a}}</span></div>',
  data: {
    text: 'this is template',
    count: 0,
    obj: {}
  },
  watch: {
    count (newVal, oldVal) {
      console.log('%c [watchValue]:', 'color:red', newVal, oldVal);
    }
  }
});

app.$mount('#root');

app.text = 'this is template changed by app';

let i = 0;
setInterval(() => {
  i++;

  app.count += 1;
  // 以下是测试vue是异步渲染的，这样的结果是每次页面上count值是一次+5；
  app.count += 1;
  app.count += 1;
  app.count += 1;
  app.count += 1;

  console.log('%c DOM还没更新', 'color: green', app.count);
  app.$nextTick(() => {
    // DOM更新了
    console.log('%c DOM更新了', 'color: lightgreen', app.count)
  });

  // app.obj.a = i; // 如果单独使用此段，没有使用app.count += 1的话，由于vue没有监测到响应的值，所以页面不会重新渲染，此时需要forceUpdate强制渲染
  // app.$forceUpdate(); // 强制组件重新渲染一次

  // 或者上面的一段可以改成
  app.$set(app.obj, 'a', i); // 这样会让vue把这个属性加入依赖进行检测，从而更新dom
}, 5000);

console.log('%c [data=]', 'color:red', app.$data);
console.log('%c [props=]', 'color:red', app.$props);
console.log('%c [element=]', 'color:red', app.$el);
// app.$options.data 与 app.$data不是同一个对象，所以操作app.$options.data无效
console.log('%c [options=]', 'color:red', app.$options);
// 改变$options中的render方法会起效果，会在第一次渲染结束之后执行
/* app.$options.render = (h) => {
  return h('div', {}, 'new Render function');
}; */

console.log('%c [app.$root === app]:', 'color:red', app.$root === app);
// <item><div children></div></item>
console.log('%c [app.$children]', 'color:red', app.$children);
console.log('%c [app.$slots]', 'color:red', app.$slots);
console.log('%c [app.$scopedSlots]', 'color:red', app.$scopedSlots);
console.log('%c [app.$refs]', 'color:red', app.$refs);
console.log('%c [app.$isServer]', 'color:red', app.$isServer); // 服务端渲染才会用到的判断

// 与直接在实例中使用watch相同,但使用$watch时要记得注销
/*
const unWatch = app.$watch('count', (newVal, oldVal) => {
  console.log('%c [watch]=', 'color:red', newVal, oldVal);
});
setTimeout(() => {
  unWatch(); // 注销之后则不再watch
}, 2000);
*/

app.$on('test', (a, b) => {
  console.log(`%c test 事件被触发 ${a} , ${b}`, 'color: goldenrod');
});

app.$once('test1', () => {
  console.log('%c $once只执行一次', 'color: blue');
})

setInterval(() => {
  app.$emit('test', 1, 2);
  app.$emit('test1');
}, 1000);
