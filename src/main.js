import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import '@/assets/scss/main.scss'

Vue.config.productionTip = false

import axios from './axios'

Vue.prototype.$axios = axios


new Vue({
  icons: {
    iconfont: 'fa',
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
