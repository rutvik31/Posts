<template>
  <div>
    <v-row class="ma-0">
      <v-col
        :cols="$vuetify.breakpoint.smAndDown ? 12 : 9"
        class="d-flex align-center"
      >
        <v-btn color="light-blue" class="px-2" @click="dialog = true">
          Add New Post
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog width="40vw" v-model="dialog">
      <v-card>
        <v-card-title> Add Post </v-card-title>
        <v-card-text>
          <v-text-field v-model="title" label="Title"></v-text-field>
          <v-textarea v-model="body" label="Body" :rows="2"></v-textarea>
          <v-text-field
            v-model.number="userId"
            type="number"
            label="User ID"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addNewPost()">Save</v-btn>
          <v-btn color="secondary" @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="ma-0 scroll-for-postcards">
      <v-col
        cols="12"
        xl="4"
        lg="3"
        md="3"
        sm="6"
        xs="12"
        :class="{ 'px-3 pb-3 pt-6': $vuetify.breakpoint.smAndUp }"
        v-for="(post, index) in postList"
        :key="index"
      >
        <v-card outlined @click="getPostId(post.id)">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="v-list-item-title">
                {{ post.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="card-body pt-4 v-list-item-subtitle">
                {{ post.body }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "@/plugins/api";

export default {
  name: "PostList",
  data() {
    return {
      postList: [],
      comments: [],
      search: "",
      title: "",
      body: "",
      userId: "",
      dialog: false,
    };
  },
  methods: {
    addNewPost() {
      const post = {
        title: this.title,
        body: this.body,
        userId: this.userId,
      };
      api.posts.createPostObject(post).then((res) => {
        console.log(res.data.data);
      });
      this.dialog = false;
    },
    getPostList() {
      api.posts.getList().then((res) => {
        this.postList = res.data;
      });
    },
    showCommentsDetails(id) {
      api.posts.getPostCommentObject(id).then((res) => {
        this.comments = res.data;
      });
    },
    getPostId(id) {
      this.$router.push({
        name: "post-details",
        params: {
          id: id,
        },
      });
    },
  },
  mounted() {
    this.getPostList();
  },
};
</script>

<style scoped>
.post-title-fonts {
  font-weight: 500;
  font-size: 22px;
  color: #0c1f36;
}
.card-body {
  font-weight: 500;
  color: #0c1f36;
  line-height: 22px;
}
.scroll-for-postcards {
  height: calc(100vh - 140px);
  overflow: auto;
}
.v-list-item-title {
  font-weight: 500;
  font-size: 18px;
}
.v-list-item-subtitle {
  font-weight: 400;
}
</style>
