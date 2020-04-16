import Vue from 'vue';

const component = {
  template: `<div>this is component {{text}}</div>`,
  data () {
    return {
      text: '123'
    }
  }
};

const component1 = {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    propOne: {
      type: String,
      default: ''
    },
    onChange: {
      type: Function,
      default: () => {
        return null;
      }
    },
    type: {
      type: Number,
      default: 1
    }
  },
  template: `<div>
        {{text}}
        <input type="text" v-model.lazy="text">
        <span v-show="active">show me if active</span>
        <a v-if="type === 1" @click="handleChange" style="color: blue; cursor: pointer">propOne={{propOne}}</a>
        <a v-else @click="handleChange2" style="color: red; cursor: pointer">propOne={{propOne}}</a>
    </div>`,
  data () {
    return {
      text: '这是局部注册组件'
    }
  },
  mounted () {
    console.log('组件mounted');
    // this.propOne = '不推荐子组件直接修改props'; // 不推荐修改props
  },
  methods: {
    handleChange () {
      this.onChange();
    },
    handleChange2 () {
      // 更简单的调用方式，直接调用父组件方法
      this.$emit('on-child-change', '子组件直接调用父级方法并传递值');
    }
  }
};

const parent = new Vue({
  name: 'parent',
})

// 组件继承组件
const component2 = {
  extends: component1,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    this.$parent.text = '12345'; // 可以从子组件改变父组件的值
    console.log('%c 组件component2的parent=', 'color: orange', this.$parent.$options.name);
  }
};

Vue.component('CompOne', component);

const CompVue = Vue.extend(component1); // 使用component的配置创建vue实例

/* 使用继承组件来创建vue实例
let app = new CompVue({
  el: '#root',
  propsData: { // 传入props的方式
    propOne: '从实例化中传入组件的props'
  },
  data: {
    text: '创建时合并data'
  },
  mounted () { // mounted在组件和实例化中会被同时调用
    console.log('实例化mounted');
  }
}); */

// 使用继承了组件的组件来创建vue实例
let app = new Vue({
  parent: parent,
  name: 'Root2',
  el: '#root',
  components: {
    CompTwo: component2
  },
  data () {
    return {
      text: '23333'
    }
  },
  template: `
        <div>
            <span>{{text}}</span>
            
            <comp-two></comp-two>
        </div>
</div>
    `,
  mounted () {
    console.log('component2 mounted');
    console.log('%c VUE实例指定的parent=', 'color: orange', this.$parent.$options.name);
  }
})
