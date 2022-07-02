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
import MenuBar from '../components/menu/MenuBar.vue'
export default {
  components: { SideBar, MenuBar },
  data: () => ({ drawer: null })
}
</script>
