<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="showSideBar"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-btn @click="logout">logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MenuBar',
  computed: {
    ...mapGetters({
      sideBar: 'getShowSideBar'
    })
  },
  methods: {
    showSideBar() {
      this.$store.commit('SET_SIDE_BAR', !this.sideBar)
    },
    logout() {
      this.$store.commit('SET_LOGIN_STATUS', false)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped></style>
