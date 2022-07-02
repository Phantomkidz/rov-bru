<template>
  <div>
    <v-navigation-drawer v-model="sideBarStatus" app>
      <!--  -->
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  data: () => ({
    sideBarStatus: true
  }),
  computed: {
    ...mapGetters({
      sideBar: 'getShowSideBar'
    })
  },
  watch: {
    sideBar(sideBar) {
      this.sideBarStatus = sideBar
    }
  }
}
</script>

<style lang="scss" scoped></style>
