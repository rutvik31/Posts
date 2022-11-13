<template>
  <div>
    <v-row class="ma-0">
      <v-col
        :cols="$vuetify.breakpoint.smAndDown ? 12 : 9"
        class="d-flex align-center"
      >
        <span class="post-title-fonts px-2"> All User Posts </span>
      </v-col>
      <v-col
        :cols="$vuetify.breakpoint.smAndDown ? 12 : 3"
        :class="{
          'px-4': $vuetify.breakpoint.smAndDown,
          'pt-6 pr-7 pl-0 d-flex align-center': $vuetify.breakpoint.mdmAndUp,
        }"
      >
        <v-text-field
          v-model.trim="search"
          outlined
          dense
          hide-details="auto"
          append-icon="mdi-magnify"
          label="Search posts"
          clearable
          @click:clear="clearSearch()"
        />
      </v-col>
    </v-row>
    <v-row class="ma-0 scroll-for-postcards">
      <v-col
        cols="12"
        xl="4"
        lg="3"
        md="3"
        sm="6"
        xs="12"
        :class="{ 'px-3 pb-3 pt-6': $vuetify.breakpoint.smAndUp }"
        v-for="(post, index) in searchPosts"
        :key="index"
      >
        <v-card outlined @click="showDetails(post.id)">
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
export default {
  name: "PostList",
  data() {
    return {
      // postList: [],
      search: "",
    };
  },
  computed: {
    postList() {
      return this.$store.state.postList;
    },
    searchPosts() {
      return this.postList.filter((post) => {
        if (!this.search) return true;
        return (
          post.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          post.body.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    getPostList() {
      this.$store.dispatch("getPostList");
    },
    showDetails(id) {
      this.$router.push(`/post/${id}`);
    },
    clearSearch() {
      this.search = "";
      this.getPostList();
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