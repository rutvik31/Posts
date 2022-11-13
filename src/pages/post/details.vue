<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" class="pa-4 border-bottom d-flex justify-space-between">
        <span class="post-title-fonts">User Post Details</span>
      </v-col>
      <v-card flat>
        <v-card-title>{{ postOject.title }}</v-card-title>
        <v-card-text>{{ postOject.body }}</v-card-text>
        <v-btn
          class="go-to-comments float-right"
          text
          color="blue"
          @click="showCommentsDetails(postOject.id)"
        >
          go to comments
        </v-btn>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PostDetails",
  data() {
    return {};
  },
  computed: {
    postOject() {
      return this.$store.state.postDetails;
    },
  },
  methods: {
    getPostObject() {
      this.$store.dispatch("getPostObject", this.$route.params.id);
    },
    showCommentsDetails(id) {
      this.$router.push(`/post/${id}/comments`);
    },
  },
  mounted() {
    if (this.$route && this.$route.params && this.$route.params.id) {
      this.getPostObject();
    }
  },
};
</script>

<style scoped>
.post-title-fonts {
  font-weight: 500;
  font-size: 22px;
  color: #0c1f36;
}
.border-bottom {
  border-bottom: 1px solid lightgrey;
}
.go-to-comments {
  text-transform: capitalize;
}
</style>