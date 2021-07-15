<template>
  <div class="ass1-section__head">
    <router-link :to="getRouterLink" class="ass1-section__avatar ass1-avatar"
      ><img :src="getavatarUser" :alt="post.fullname"
    /></router-link>
    <div>
      <router-link
        v-if="querySearch"
        :to="getRouterLink"
        class="ass1-section__name"
        v-html="formatFullname"
      ></router-link>

      <router-link v-else :to="getRouterLink" class="ass1-section__name">{{
        formatFullname
      }}</router-link>
      <span class="ass1-section__passed">{{ formatTimeAdded }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { replaceAll } from "../helper";
export default {
  name: "app-postitem-head",
  props: {
    post: { type: Object, default: null }
  },
  data() {
    return {
      querySearch: this.$route.query.query
    };
  },
  watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    }
  },
  computed: {
    getavatarUser() {
      if (this.post.profilepicture) return this.post.profilepicture;
      return "/dist/images/avatar-02.png";
    },
    getRouterLink() {
      let id = this.post.USERID || 1;
      return { name: "user-page", params: { id: id } };
    },
    formatTimeAdded() {
      moment.locale("vi");
      return moment(this.post.time_added).fromNow();
    },
    formatFullname() {
      if (this.querySearch) {
        return replaceAll(
          this.post.fullname,
          this.querySearch,
          `<mark>${this.querySearch}</mark>`
        );
      } else {
        return this.post.fullname;
      }
    }
  }
};
</script>

<style>
.ass1-section__name {
  text-transform: capitalize;
}
</style>
