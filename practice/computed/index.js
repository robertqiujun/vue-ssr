import Vue from 'vue';

let app = new Vue({
  template: `
    <div>
        <p>Name: {{firstName + ' ' + lastName }}</p>
        <p>ComputedName={{fullName}}</p>
        <p>MetdhosGetName={{getName()}}</p>
        <p>Number: {{number}}</p>
        <p>watchName: {{watchName}}</p>
        <p>watchObj.a <input type="text" v-model="watchObj.a"></p>
        <p><input type="text" v-model="number"> </p>
        <p>FirstName: <input type="text" v-model="firstName"></p>
        <p>LastName: <input type="text" v-model="lastName"></p>
        <p>ComputedSetName: <input type="text" v-model="fullName">(不推荐用computed设置值)</p>
    </div>`,
  data: {
    firstName: 'Jacky',
    lastName: 'Long',
    number: 0,
    watchName: '',
    watchObj: {
      a: '123'
    }
  },
  // 不要在watch和computed中修改监听的值
  computed: {
    fullName: { //  computed的数据会做缓存，当页面变化重新渲染的时候不会重新计算，
      get () {
        console.log('computedFullName');
        return `${this.firstName} ${this.lastName}`;
      },
      set (name) {
        const names = name.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
  },
  watch: {
    firstName (newName, oldName) {
      this.watchName = newName + ' ' + this.lastName;
    },
    lastName: { // 这种写法是让声明的watch方法立即执行
      handler (newName, oldName) {
        this.watchName = this.firstName + ' ' + newName;
      },
      immediate: true
    },
    watchObj: {
      handler () {
        console.log('obj,a changed');
      },
      immediate: true,
      deep: true // 加了deep才能深入对象的某个属性，否则只有在watchObj={...}时才有效
    },
    // 或者直接使用这种方法
    'watchObj.a': {
      handler () {
        console.log('watchObj.a changed');
      },
      immediate: true
    }
  },
  methods: {
    getName () { // methods中的方法在页面重新渲染的时候会重新执行一遍，开销大
      console.log('getName invoked');
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

app.$mount('#root');
