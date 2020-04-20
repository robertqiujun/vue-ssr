export default {
  // getters可以理解为computed
  fullName (state) {
    return `${state.firstName}-${state.lastName}`;
  }
}
