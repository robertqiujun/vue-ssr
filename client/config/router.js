import VueRouter from 'vue-router';
import routes from './routes';

export default () => { // 每次重新创建一个router，防止内存溢出
  return new VueRouter({
    routes,
    mode: 'history', // 默认路由形式是/#/lgoin之类的hash路由，不会被搜索引擎捕获，这里改成使用history
    // base: '/base/', // 会在所有路径之前加上base
    linkActiveClass: 'active-link', // 修改路由组件router-link的class默认名称
    linkExactActiveClass: 'exact-active-link', // 修改路由组件router-link的class默认名称
    scrollBehavior (to, from, savedPosition) { // 页面跳转时是否记录滚动的位置
      if (savedPosition) {
        return savedPosition;
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    },
    fallback: true, // 由于不是所有浏览器都支持history，在不支持的浏览器下可以自动改成hash模式
    /*
    parseQuery (query) { // 用于处理url中的query参数
      console.log('query=', query);
      return '?' + query;
    },
    stringifyQuery (obj) { // 用于处理url中的query参数
      console.log('obj=', obj);
      return '?' + obj;
    }
    */
  });
}
