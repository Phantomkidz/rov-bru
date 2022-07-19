<template>
  <div v-if="showPage">
    <side-bar></side-bar>
    <MenuBar></MenuBar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SideBar from '@/components/menu/SideBar.vue'
import MenuBar from '@/components/menu/MenuBar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  data() {
    return {
      showPage: false
    }
  },
  components: { SideBar, MenuBar },
  async created() {
    if (!this.loggedIn) await this.$router.push('/login')
    this.showPage = true
  },
  computed: {
    ...mapGetters({
      // key : 'value'
      loggedIn: 'getLoggedIn'
    })
  }
}
</script>
