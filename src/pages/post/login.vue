<template>
  <v-container class="d-flex justify-center align-center loginContainer">
    <v-card width="40vw">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Enter Email or User ID"
            outlined
            required
            :error-messages="this.error"
            @input="clearInput()"
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  data() {
    return {
      email: "",
      error: "",
    };
  },
  computed: {
    ...mapState(["emailList", "loggedIn"]),
  },
  methods: {
    login() {
      if (this.emailList.includes(this.email)) {
        store.commit("login");
        localStorage.setItem("isAuthenticated", this.email);
        this.$router.push({
          name: "post",
        });
      } else {
        this.error = "Invalid email. Please try again.";
      }
    },
    clearInput() {
      this.error = "";
    },
  },
};
</script>

<style scoped>
.loginContainer {
  height: calc(100vh - 70px);
}
</style>
