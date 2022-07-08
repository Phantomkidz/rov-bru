<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="showSideBar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn @click="logout" color="warning">logout</v-btn>
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
