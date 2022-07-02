
export default {
  getLoggedIn: state => {
    // return เรียกไฟล์ state จากนั้นเรียกใช้ตัว loggedIn
    // จากนั้นจะถูกส่งออกไปใช้ในหน้าที่ต้องการ
    return state.loggedIn
  },
  getShowSideBar: state => {
    return state.showSideBar
  }
}
