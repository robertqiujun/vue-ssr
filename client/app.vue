<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<todo></todo>-->
    <div class="routes">
      <router-link to="/app/123" class="router-button">App</router-link>
      <router-link to="/login" class="router-button">Login</router-link>
      <!-- 可以在routes配置带有exact-active-link的className的链接
        <router-link to="/login/exact">login exact</router-link>
      -->
      <router-link :to="{name: 'app', params: {id: '456'}}" class="router-button">使用NAME来跳转App</router-link>
      <router-link :to="{name: 'app.test'}" class="router-button">跳转app的子节点</router-link>
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
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import Todo from './views/todo/todo.vue'

  // console.log(Header.__docs)

  export default {
    name: 'app',
    components: {
      Todo,
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
      console.log(this.$route, this.$route.query); // 也可以获取到?后面的query参数
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;

        console.log('现在路由:', to.path.split('/')[1], '来自路由:',
          from.path.split('/')[1], '现在的动画:', this.transitionName);

        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
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
