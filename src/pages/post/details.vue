<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" class="pa-4 border-bottom d-flex justify-space-between">
        <span class="post-title-fonts">User Post Details</span>
      </v-col>
      <v-col cols="12">
        <v-btn color="cyan" @click="$router.back()">Go Back</v-btn>
      </v-col>
      <v-col cols="12">
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
      </v-col>
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
    },
  },
  methods: {
    getPostObject(id) {
      const newPost = JSON.parse(localStorage.getItem("newPost"));
      if (newPost) {
        this.postOject = newPost;
      } else {
        this.$api.posts.getPostObject(id).then((res) => {
          this.postOject = res.data;
        });
      }
    },
    showCommentsDetails(id) {
      const commentList = [];
      const comments = JSON.parse(localStorage.getItem("comments"));
      if (comments && comments[id]) {
        commentList.push(...comments[id]);
      }
      this.$api.posts.getPostCommentObject(id).then((res) => {
        if (res && res.data) {
          commentList.push(...res.data);
        }
      });
      this.$store.commit("setComments", commentList);
    },
    addCommentsToThePost() {
      let obj = {
        name: this.addNewComment,
        email: "admin@email.com",
      };

      let comments = JSON.parse(localStorage.getItem("comments"));
      if (!comments) comments = {};

      let postId = this.$route.params.id;
      if (!comments[postId]) comments[postId] = [];

      comments[postId].push(obj);

      localStorage.setItem("comments", JSON.stringify(comments));
      this.$store.commit("addComment", obj);

      this.addNewComment = [];
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
