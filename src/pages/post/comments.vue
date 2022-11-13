<template>
  <div class="d-flex justify-center">
    <v-row class="ma-0" :class="{ 'main-div': $vuetify.breakpoint.smAndUp }">
      <v-col cols="12" class="pa-4">
        <span class="post-title-fonts"> User Comments </span>
      </v-col>
      <v-col cols="12">
        <v-textarea
          auto-grow
          hide-details="true"
          rows="2"
          v-model="comment"
          append-icon="mdi-comment-plus"
          label="Comments"
          placeholder="Add Comment..."
          @click:append="addCommentsToThePost()"
        >
        </v-textarea>
      </v-col>
      <v-col cols="12" class="px-0">
        <v-card v-for="(comment, index) in commentsList" :key="index" flat>
          <v-card-text class="py-0" style="font-weight: 700">
            {{ comment.email }}
          </v-card-text>
          <v-card-subtitle class="pt-0" style="font-weight: 400">
            -{{ comment.body }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PostComments",
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    commentsList() {
      return this.$store.state.postComments;
    },
  },
  methods: {
    getCommentsForPost() {
      this.$store.dispatch("getCommentsForPost", this.$route.params.id);
    },
    addCommentsToThePost() {
      let obj = {
        body: this.comment,
        email: "admin@email.com",
      };
      this.$store.commit("addComment", obj);
      this.comment = "";
    },
  },
  mounted() {
    this.getCommentsForPost();
  },
};
</script>

<style scoped>
.post-title-fonts {
  font-weight: 500;
  font-size: 22px;
  color: #0c1f36;
}
.main-div {
  max-width: 60%;
}
</style>