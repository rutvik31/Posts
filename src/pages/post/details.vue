<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" class="pa-4 border-bottom d-flex justify-space-between">
        <span class="post-title-fonts">User Post Details</span>
      </v-col>
      <v-col cols="12"
        ><v-btn color="cyan" @click="$router.back()">Go Back</v-btn></v-col
      >
      <v-card flat>
        <v-card-title>{{ postOject.title }}</v-card-title>
        <v-card-text>{{ postOject.body }}</v-card-text>
        <v-divider></v-divider>
        <v-col cols="12" class="pa-4 d-flex justify-space-between">
          <span class="post-title-fonts">Comments</span>
        </v-col>
        <v-card-text
          class="pt-0"
          v-for="(comment, index) in comments"
          :key="index"
        >
          {{ comment.name }}
        </v-card-text>
        <v-col cols="12">
          <v-textarea
            auto-grow
            hide-details="true"
            rows="2"
            v-model="addNewComment"
            append-icon="mdi-comment-plus"
            label="Comments"
            placeholder="Add Comment..."
            @click:append="addCommentsToThePost()"
          >
          </v-textarea>
        </v-col>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PostDetails",
  data() {
    return {
      postOject: {},
      addNewComment: "",
    };
  },
  computed: {
    comments() {
      return this.$store.state.postComments;
    }
  },
  methods: {
    getPostObject(id) {
      this.$api.posts.getPostObject(id).then((res) => {
        this.postOject = res.data;
      });
    },
    showCommentsDetails(id) {
      this.$api.posts.getPostCommentObject(id).then((res) => {
        this.$store.commit("setComments", res.data);
      });
    },
    addCommentsToThePost() {
      let obj = {
        name: this.addNewComment,
        email: "admin@email.com",
      };
      this.$store.commit("addComment", obj);
      this.addNewComment = "";
    },
  },
  mounted() {
    if (this.$route && this.$route.params && this.$route.params.id) {
      this.getPostObject(this.$route.params.id);
      this.showCommentsDetails(this.$route.params.id);
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
