export default {
  updateCountAsync (store, data) {
    // mutation必须同步操作，不能有异步，所以异步操作放在action里面
    setTimeout(() => {
      store.commit('updateCount', {num: data.num, num2: data.num2});
    }, data.time);
  }
}
