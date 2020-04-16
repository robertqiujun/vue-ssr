import Vue from 'vue';

var globalVar = '111'; // eslint-disable-line
let app = new Vue({
  template: `
    <div :id="mainId" :class="[{active: isActive}, 'main']">
        computedClassName:{{className}}
        {{isActive ? 'active' : 'notActive'}} {{Date.now()}}
        <span :style="[styles, styles2]">{{getJoinedArr(arr)}}</span>
        <div v-html="html" :class="[isActive ? 'active' : '']" @click="handleClick"></div>
    </div>
  `,
  data: {
    isActive: true,
    arr: [1, 2, 3, 4],
    html: '<a style="color:red">点击事件绑定</a>',
    mainId: 'main',
    styles: {
      color: 'red',
      fontSize: '20px',
      appearance: 'none' // 会自动加webkit前缀
    },
    styles2: {
      color: 'blue',
      border: '1px solid red'
    }
  },
  methods: {
    handleClick () {
      alert('clicked'); // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ');
    }
  },
  computed: {
    className () {
      return this.isActive ? 'activie' : 'noActive';
    }
  }
});

app.$mount('#root');
