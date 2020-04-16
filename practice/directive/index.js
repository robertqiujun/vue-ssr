import Vue from 'vue';

let app = new Vue({
  template: `
    <div v-bind:id="id">
        <div v-text="text"></div>
        <!--使用v-pre则不会解析表达式-->
        <div v-pre>Text: {{text}}</div>
        <!--不使用webpack的情况下写vue页面，使用v-cloak在页面加载初期可以隐藏表达式代码-->
        <div v-cloak>Text: {{text}}</div>
        
        <div v-once>Text:{{text}}     v-once只加载一遍</div>
        <div v-show="active">Text: {{text}}</div>
        <div v-if="active">使用IF来显示</div>
        <div v-else-if="parseInt(text, 10) === 1">进入了V-ELSE-IF</div>
        <div v-else>使用IF来显示和隐藏比较消耗性能</div>
        <input type="checkbox" v-model="active">显示/隐藏</input>
        <button @click="addText"> v-else-if </button>
        <div v-html="html"></div>
        <input type="text" v-model.number.trim.lazy="text">
        
        <div>
            <!--使用v-bind的方式可以使value变成数值而不是字符串-->
            <span>checkbox与arr绑定</span>
            <input type="checkbox" :value="1" v-model="arr">1
            <input type="checkbox" :value="2" v-model="arr">2
            <input type="checkbox" :value="3" v-model="arr">3
        </div>
        <div>
            <span></span>
            <input type="radio" value="one" v-model="picked">one
            <input type="radio" value="two" v-model="picked">two
            <input type="radio" value="three" v-model="picked">three
            Picked: {{picked}}
        </div>
        <ul>
           <li v-for="(item, index) in arr" :key="item">{{item + ' INDEX=' + index}}</li>
        </ul>
        <ul>
           <li v-for="(val, key, index) in obj" :key="key">{{key}}: {{val}}: {{index}}</li>
        </ul>
    </div>
  `,
  data: {
    id: 'container',
    text: 0,
    active: false,
    html: `<span style="color: red">this is html</span>`,
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: ''
  },
  methods: {
    changeActive () {
      this.active = !this.active;
    },
    addText () {
      this.text += 1;
    }
  }
});

app.$mount('#root');
