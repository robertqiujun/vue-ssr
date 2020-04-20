<template>
  <div class="todo-container">
    <section class="real-app">
      <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么?"
        v-model="todoText"
        @keyup.enter="addTodo"
      >
      <Item
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del-item="deleteTodo"
      ></Item>
      <tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clear-all="clearAllcompleted"></tabs>
      <router-view/>
    </section>
  </div>
</template>

<script>
  import Item from './item.vue'
  import Tabs from './tabs.vue'

  let TotalId = 0
  export default {
    beforeRouteEnter (to, from, next) {
      console.log('%c TODO组件中写入的路由钩子beforeRouteEnter', 'color: orangered');
      next((vm) => {
        console.log('%c beforeRouteEnter中调用组件实例中的参数=', 'color: blue', vm.id);
      });
    },
    beforeRouteUpdate (to, from, next) {
      // 例如替换地址栏后面的参数时，update会被触发
      console.log('%c TODO组件中写入的路由钩子beforeRouteUpdate', 'color: orangered');
      // 此时没有this上下文
      next();
    },
    beforeRouteLeave (to, from, next) {
      console.log('%c TODO组件中写入的路由钩子beforeRouteLeave', 'color: orangered');
      if (global.confirm('是否确认离开?')) {
        next();
      } else {

      }
    },
    name: 'todo.vue',
    components: {
      Item,
      Tabs
    },
    props: ['id'], // 从路由配置得props
    data () {
      return {
        todoText: '',
        todos: [],
        filter: 'all'
      }
    },
    mounted () {
      // mounted在同路由带不同参数切换的情况下仅有第一次会触发，此时需要使用routeUpdate处理
      console.log('todo mounted! 从地址栏来得id参数是=', this.id);
    },
    computed: {
      filteredTodos () {
        if (this.filter === 'all') {
          return this.todos;
        }

        const completed = this.filter === 'completed';
        return this.todos.filter(todo => completed === todo.completed);
      }
    },
    methods: {
      addTodo (e) {
        if (this.todoText && this.todoText.trim()) {
          this.todos.unshift({
            id: TotalId++,
            content: this.todoText.trim(),
            completed: false
          });
          this.todoText = '';
        }
      },
      deleteTodo (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
      },
      toggleFilter (state) {
        this.filter = state;
      },
      clearAllcompleted () {
        this.todos = this.todos.filter(todo => !todo.completed);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .todo-container {
    position absolute;
    width 100%;
    overflow hidden
  }

  .real-app {
    position: relative;
    width 600px;
    margin 0 auto;
    box-shadow 0 0 5px #666;
  }

  .add-input {
    position relative;
    margin 0;
    width 100%;
    font-size 24px;
    font-family inherit;
    font-weight inherit;
    line-height 40px;
    outline none;
    color inherit;
    box-sizing border-box;
    font-smoothing antialiased;
    padding 10px 40px;
    border none;
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.6);
  }
</style>
