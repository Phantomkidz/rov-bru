
export default {
  // get ค่าจาก localstorage "KeyItems" ? ไม่มี ให้เป็น false
  loggedIn: window.localStorage.getItem("loggedIn") ? JSON.parse(window.localStorage.getItem("loggedIn")) : false,
  showSideBar: true
}

// กำหนดค่าตัวแปรครั้งแรก