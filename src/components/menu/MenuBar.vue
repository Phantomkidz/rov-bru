<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  data: () => ({ drawer: null })
}
</script>

<style lang="scss" scoped></style>
