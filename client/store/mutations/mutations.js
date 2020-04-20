export default {
  updateCount (state, {num, num2}) {
    state.count = num;
    state.count2 = num2;
  },
  updateUserName (state) {
    let rand = Math.random().toString(32).substr(2, 5);

    state.firstName = state.firstName.split('_')[0] + '_' + rand;
    state.lastName = state.lastName.split('_')[0] + '_' + rand;
  }
}
