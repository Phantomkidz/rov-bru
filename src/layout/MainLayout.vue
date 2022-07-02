<template>
  <div>
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
  components: { SideBar, MenuBar },
  created() {
    if (!this.loggedIn) this.$router.push('/login')
  },
  computed: {
    ...mapGetters({
      loggedIn: 'getLoggedIn'
    })
  }
}
</script>
