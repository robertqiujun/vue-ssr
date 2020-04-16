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
      required: true, // 和default一般不会同时出现
      default: false
    },
    propOne: {
      type: String,
      default: '',
      validator: (value) => {
        console.log('propOneValidator', value);
        return typeof value === 'string'
      }
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

Vue.component('CompOne', component);

let app = new Vue({
  components: {
    'CompTwo': component1
  },
  data: {
    text1: '点我',
    text2: '点我哟',
    text: '123'
  },
  template: `
    <div>
        <comp-one></comp-one>
        <!--使用v-bind可以进行类型检查, 推荐使用连接符隔开props，而不使用驼峰-->
        <comp-two ref="comp1" :active="true" :prop-one="text1" :type="1" :on-change="handleChange"></comp-two>
        <comp-two ref="comp2" :active="false" :propOne="text2" :type="2" @on-child-change="handleChange2"></comp-two>
    </div>
  `,
  mounted () {
    console.log(this.$refs.comp1);
    console.log(this.$refs.comp2);
  },
  methods: {
    handleChange () {
      this.text1 = '从父组件传递的onchange事件修改子组件的值'
    },
    handleChange2 (params) {
      console.log(params);
      this.text2 = params;
    }
  }
});

app.$mount('#root');
