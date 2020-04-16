import Todo from '../views/todo/todo.vue';
import Login from '../views/login/login.vue';
import Test from '../views/test/test.vue';

export default [
  {
    path: '/',
    redirect: '/app',
  },
  {
    path: '/app/:id', // /app/xxx
    // props: true, // 会直接把:id作为组件的props传递进组件
    props: (route) => { // 或者使用函数返回得方式自定义
      console.log('%c routes=', 'color: red', route);
      return {
        id: route.query.b || route.params.id // 可以在地址栏后加?b=789尝试得到得结果
      }
    },
    component: Todo,
    /*
    components: {// 多个路由在同一个页面显示时可以使用命名路由,貌似这种方式不支持props？
      default: Todo,
      a: Test
    },
    */
    name: 'app',
    meta: { // 保存路由的基础信息
      pageName: 'JTODO',
      title: 'this is app',
      description: 'this is jtodo'
    },
    children: [ // 子路由,注意需要在父级组件中加上router-view
      {
        path: 'test',
        component: Test,
        name: 'app.test'
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    // component: Login
    components: {
      default: Login,
      a: Test
    }
  },
  /* {
    path: '/login/exact',
    component: Login
  } */
]
