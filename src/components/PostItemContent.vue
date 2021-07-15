<template>
  <div class="ass1-section__content">
    <p v-if="querySearch" v-html="formatContent">
      {{ formatContent }}
    </p>
    <p v-else>
      {{ formatContent }}
    </p>
    <div class="ass1-section__image">
      <router-link :to="{ name: 'post-detail', params: { id: post.PID } }"
        ><img :src="post.url_image" :alt="post.fullname"
      /></router-link>
    </div>
  </div>
</template>

<script>
import { replaceAll } from "../helper";

export default {
  name: "app-postitem-content",
  props: {
    post: { type: Object, default: null },
  },

  data() {
    return {
      querySearch: this.$route.query.query,
    };
  },
  watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    },
  },
  computed: {
    formatContent() {
      if (this.querySearch) {
        return replaceAll(
          this.post.post_content,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.post_content;
      }
    },
  },
};
</script>

<style>
</style>
