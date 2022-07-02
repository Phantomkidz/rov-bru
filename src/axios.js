import axios from 'axios'


const baseURL = process.env.VUE_APP_URL_API
const instance = axios.create({
  baseURL,
  timeout: 3000,
})
instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`

export default instance

