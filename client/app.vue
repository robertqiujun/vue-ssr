<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<todo></todo>-->
    <p>{{storeCount}} {{fullName}} {{storeCount2}}</p>
    <p>textA: {{textA}}, textB: {{textB}}, textPlus: {{textPlus}}, textC: {{textC}}</p>
    <div class="routes">
      <router-link to="/app/123" class="router-button">App</router-link>
      <router-link to="/login" class="router-button">Login</router-link>
      <!-- 可以在routes配置带有exact-active-link的className的链接
        <router-link to="/login/exact">login exact</router-link>
      -->
      <router-link :to="{name: 'app', params: {id: '456'}}" class="router-button">使用NAME来跳转App</router-link>
      <router-link :to="{name: 'app.test'}" class="router-button">跳转app的子节点</router-link>
      <router-link :to="{name: 'app', params: {id: '135'}}" class="router-button">触发routeUpdate</router-link>
    </div>
    <!--具有命名的路由，可以在配置中指定路由渲染到这个view下-->
    <!--    <router-view name="a" /> -->
    <div class="router-container">
      <transition :name="transitionName"> <!--定义了transition之后需要写样式，见下方定义的样式，样式名与name相关-->
        <router-view class="child-view"/>
      </transition>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  // import Todo from './views/todo/todo.vue' // 因为routes中配置了异步加载，所以这里暂时去掉

  // console.log(Header.__docs)

  export default {
    name: 'app',
    components: {
      // Todo,
      Header,
      Footer
    },
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    render () {

    },
    mounted () {
      console.log('%c STORE=', 'color: purple', this.$store);
      console.log(this.$route, this.$route.query); // 也可以获取到?后面的query参数
      // this.$store.state.count = 3; // 在Store初始化时配置了strict禁止外部数据操作的时候，这种操作会报错
      // let i = 0;
      setInterval(() => {
        // i++;
        // this.$store.commit('updateCount', {num: i, num2: i * 2});
        this.$store.commit('updateUserName');
        // shi用mapMutations之后可以直接调用mutation中的方法
        this.updateUserName();
      }, 5000);

      // 直接从外部使用action来修改数据
      // this.$store.dispatch('updateCountAsync', {num: 100, num2: 1000, time: 2000});

      // 使用mapActions可以直接调用action中的方法
      console.log('store=', this.$store, this['b/textPlus']);
      this.updateCountAsync({num: 100, num2: 1000, time: 2000});
      this.updateText('修改了模块A的数据');
      this['b/updateText']('修改了模块B的数据');
      this['b/add']();
      this.testAction();
    },
    computed: {
      // ...mapState(['count']),
      /* storeCount () { // store中的state变量
        return this.count;
      }, */
      // 改变需要的state的引用名称
      ...mapState({
        storeCount: 'count',
        storeCount2: (state) => state.count2, // 如果需要做些计算，可以使用这种方式
        // 注意，c模块是在index.js中注册的
        textC: state => state.c.text,
      }),

      // ...mapGetters(['fullName', 'b/textPlus']), // 带有命名空间的方法不好写入模板
      ...mapGetters({
        'fullName': 'fullName',
        textPlus: 'b/textPlus'
      }),

      textA () {
        return this.$store.state.a.text;
      },
      textB () {
        return this.$store.state.b.text;
      },

      /* fullName () { // 使用mapGetters之后就不需要了
        return this.$store.getters.fullName;
      } */
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;

        console.log('现在路由:', to.path.split('/')[1], '来自路由:',
          from.path.split('/')[1], '现在的动画:', this.transitionName);

        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
    },
    methods: {
      ...mapActions(['updateCountAsync', 'b/add', 'testAction']),
      // 没有namespace的情况下，模块中的mutation方法(updateText)可以通过mapMutations直接获取
      ...mapMutations(['updateCount', 'updateUserName', 'updateText', 'b/updateText']),
    }
  }
</script>

<style lang="stylus" scoped>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display flex;
    flex-direction column;
  }

  #cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.9;
    z-index: -1;
  }

  .router-container {
    position relative
    width 100%;
    height 100%;
    overflow-x hidden;
    overflow-y scroll;
  }

  .routes {
    position relative;
    margin-bottom: 20px;
    height 60px;
    overflow: hidden;
    display flex;
    flex-direction row;
    align-items center;
  }

  .clear {
    clear both;
  }

  .router-button {
    padding: 5px 10px;
    border: 1px solid lightblue;
  }

  .active-link {
    background-color lightgoldenrodyellow;
  }

  .child-view {
    width 100%;
    transition: all .5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity 0;
    -webkit-transform translate(100%, 0);
    transform translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity 0;
    -webkit-transform translate(-100%, 0);
    transform translate(-100%, 0);
  }

</style>
