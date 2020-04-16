import Vue from 'vue';

// 组件的高级功能
const component = {
  template: `
    <div :style="style">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="body">
            <slot name="body"></slot>
        </div>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
};

const ChildComponent = {
  template: `
    <div style="color: orange">
        child component
        <p>ChildComponent的爷爷是={{grandFather.$options.name}}</p>
        <p>父级inject进来的value不会随着父级变化重新渲染==={{value}}</p>
        <p style="color: orangered">使父级inject进来的value随父级变化而改变==={{data.value}}</p>
    </div>
  `,
  inject: ['grandFather', 'value', 'data'],
  mounted () {
    console.log('%c ChildComponent的parent是=', 'color: red', this.$parent.$options.name);
    console.log('%c ChildComponent的爷爷是=', 'color: orange', this.grandFather, this.value);
  }
};

const component2 = {
  name: 'component2',
  components: {
    ChildComponent
  },
  template: `
    <div :style="style">
        <slot name="desc"></slot>
        <slot :value="value" aaa="abc"></slot>
        <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '400px',
        border: '1px solid red'
      },
      value: 'componentValue',
    }
  }
};

let app = new Vue({
  name: 'APP',
  components: {
    CompOne: component,
    CompTwo: component2,
  },
  provide () { // 可以把定义的属性传给任意子组件，孙组件, 需要在用到的组件中使用inject
    // 普通情况下，父组件通过provide传入子孙组件的值不会随着父组件值的改变而改变，
    // 需要通过defineProperty方法来实现
    const data = {};

    // 不推荐，有可能以后会出现错误
    Object.defineProperty(data, 'value', {
      get: () => {
        return this.defineValue;
      },
      enumerable: true
    });

    return {
      grandFather: this,
      value: this.value,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123',
      defineValue: 'definedProperty'
    }
  },
  template: `
    <div>
        <comp-one>
            <span slot="header">this is header</span>
            <span slot="body">this is body</span>
        </comp-one>
        <comp-two ref="comp2">
            <p slot="desc">作用域插槽可以使用组件中的值</p>
            <span slot-scope="props" ref="comp2span">{{props.value}}-{{props.aaa}}-父级value={{value}}</span>
        </comp-two>
        <input type="text" v-model="value">
        <input type="text" v-model="defineValue">
    </div>
  `,
  mounted () {
    console.log(this.$refs.comp2, this.$refs.comp2.value, this.$refs.comp2span);
  }
});
