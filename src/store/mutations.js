
export default {
  SET_LOGIN_STATUS(state, value) {
    window.localStorage.setItem('loggedIn', value)
    state.loggedIn = value
  },
  SET_SIDE_BAR(state, value) {
    state.showSideBar = value
  }
}

