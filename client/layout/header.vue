<template>
    <header :class="$style.mainHeader"><!--因为在vue-loader.config中打开了cssModule。此处必须使用这样的方式-->
        <h1>JTODO</h1>
    </header>
</template>

<script>
  export default {
    name: 'header.vue'
  }
</script>

<style scoped lang="stylus" module>
    .main-header {
        text-align center;
        h1 {
            font-size 100px;
            color rgba(175, 47, 47, 0.4);
            font-weight 100;
            margin 20px;
        }
    }
</style>
<docs><!--自定义模块, 见vue-loader.config.js的自定义loader-->
    #123=456
</docs>
