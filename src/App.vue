<template>
  <v-app>
    <v-app-bar v-if="$route.path != '/login'" app color="primary" dark>
      <div class="d-flex align-center" style="cursor: pointer">
        <v-icon size="50" color="white"> mdi-note-check-outline </v-icon>
        <h2 class="px-2" style="font-weight: 500">Posts</h2>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="toLoginPage()">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    toLoginPage() {
      this.$router.push({
        name: "user-login"
      });
    },
  },
};
</script>

<style lang="scss">
@import "./style/global.scss";
</style>
