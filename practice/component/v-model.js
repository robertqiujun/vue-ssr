import Vue from 'vue';

const component = {
  props: ['value'],
  template: `
    <div>
        <input type="text" @input="handleInput" :value="value">
        {{value}}
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value);
    }
  }
};

const component2 = {
  model: { // 当你不想使用value作为V-MODEL传递的参数时，可以使用这个属性,也可以改变传递的事件名称
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
        <input type="text" @input="handleInput" :value="value1">
        {{value1}}
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value);
    }
  }
};

// 组件中实现V-MODEL

let app = new Vue({
  components: {
    CompOne: component,
    CompTwo: component2,
  },
  el: '#root',
  data () {
    return {
      value: '123',
      value1: '456',
    }
  },
  template: `
    <div>
        <p>组件实现V-MODEL的两种方式</p>
        <comp-one v-model="value"></comp-one>
        <comp-two v-model="value1"></comp-two>
    </div>
  `
});
