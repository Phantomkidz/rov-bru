
export default {
  loggedIn: window.localStorage.getItem("loggedIn") ? JSON.parse(window.localStorage.getItem("loggedIn")) : false,
  showSideBar: true
}
