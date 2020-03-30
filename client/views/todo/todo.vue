<template>
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

    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let TotalId = 0
export default {
  name: 'todo.vue',
  components: {
    Item,
    Tabs
  },
  data () {
    return {
      todoText: '',
      todos: [],
      filter: 'all'
    }
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
    .real-app {
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
