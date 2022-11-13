<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div
        class="d-flex align-center"
        style="cursor: pointer"
        @click="toHomePage()"
      >
        <v-icon size="50" color="white"> mdi-note-check-outline </v-icon>
        <h2 class="px-2" style="font-weight: 500">Posts</h2>
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
    toHomePage() {
      this.$router.push("/post");
    },
  },
};
</script>

<style lang="scss">
@import "./style/global.scss";
</style>