<template>
  <div>
    <v-navigation-drawer dark v-model="sideBarStatus" app>
      <!--  -->
      <v-img src="https://www.techoffside.com/wp-content/uploads/2019/07/RoV-New-Era-9_Logo-1200x675.jpg" @click="toHome"></v-img>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="([icon, text, link], i) in items" :key="i" :to="{ name: link }" links>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  data: () => ({
    sideBarStatus: true,
    items: [
      ['fas fa-school', 'School', 'school'],
      ['fas fa-users', 'Team', 'team'],
      ['fas fa-user', 'Player', 'player'],
      ['fas fa-crown', 'Hero', 'hero'],
      ['fas fa-poll', 'Match Result', 'match-results']
    ]
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
  },
  methods: {
    toHome() {
      this.$router.push('/').catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
