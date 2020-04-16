<template>
  <div class="login-container">
    <div class="login">
      <p>THIS IS LOGIN PAGE!</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login.vue'
  }
</script>

<style scoped lang="stylus">
  .login-container {
    position absolute;
    width 100%;
    overflow hidden;

    .login {
      position relative;
      margin 0 auto;

      p {
        color: orangered;
        text-align: center;
      }
    }
  }

  div {
    position absolute;
    overflow: hidden;
  }
</style>
