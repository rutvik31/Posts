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
          <v-form v-model="isValid">
            <v-text-field
              :rules="[(v) => !!v || 'Name is required']"
              v-model="title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="body"
              :rules="[(v) => !!v || 'Name is required']"
              label="Body"
              :rows="2"
              required
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!isValid" color="primary" @click="addNewPost()"
            >Save</v-btn
          >
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
    <v-snackbar v-model="snackbar" aria-multiline="true" timeout="5000" top>
      New Post Added Successfully.<br />
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      dialog: false,
      snackbar: false,
      isValid: false,
    };
  },
  methods: {
    addNewPost() {
      const userEmailId = localStorage.getItem("isAuthenticated");
      const post = {
        title: this.title,
        body: this.body,
        userId: userEmailId,
      };

      api.posts.createPostObject(post).then((res) => {
        this.snackbar = true;
        console.log(res.data);
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
