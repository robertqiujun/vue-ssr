import Vue from 'vue';

const component = {
  props: ['prop1'],
  /* template: `
    <div :style="style">
        <slot></slot>
    </div>
  `, */
  render (h) {
    return h('div', {
      style: this.style,
      on: {
        click: () => {
          this.$emit('click');
        }
      }
    }, [
      this.$slots.header,
      this.prop1,
    ]);
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid red',
      },
      value: 'component value'
    }
  }
};

const component2 = {
  props: ['prop2'],
  render (h) {
    return h('div', {
      style: 'width:200px;height:200px;border: 1px solid blue',
    }, [
      h('a', {style: 'color: red;cursor: pointer'}, this.prop2)
    ]);
  }
};

let app = new Vue({
  el: '#root',
  components: {
    CompOne: component,
    CompTwo: component2,
  },
  /* template: `
    <div>
        <comp-one ref="comp">
             <span ref="span">{{value}}</span>
        </comp-one>
    </div>
  `, */
  render (createElement) { // 使用render方法实现template
    // return this.$createElement();

    return createElement('div', {},
      [
        createElement('comp-one', {
          ref: 'comp',
          props: {
            prop1: this.value1
          },
          on: { // 使用on时，子组件必须使用$emit调用其中的方法
            click: this.handleClick
          }
        },
        [
          createElement('span',
            {
              ref: 'span',
              slot: 'header',
              domProps: {
                innerHTML: '创建时指定的domProps'
              },
              attrs: {
                id: 'testId',
              },
              style: 'color: orangered'
            },
            this.value), // 子节点必须作为数组传递
        ]
        ),
        createElement('comp-two', {
          props: {
            prop2: this.value2
          },
          nativeOn: { // 自动绑定事件到原生节点上，不需要在子组件中再使用$emit
            click: this.handleClick2
          }
        })
      ]
    )
  },
  data () {
    return {
      value: '1234',
      value1: 'onClick',
      value2: 'nativeOnClick'
    }
  },
  methods: {
    handleClick () {
      console.log('clicked');
    },
    handleClick2 () {
      console.log('nativeOnClicked');
    }
  }
});
