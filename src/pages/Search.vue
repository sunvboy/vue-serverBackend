<template>
  <div class="pageSearch">
      <div class="pageSearch_info">
          <p>Từ khóa tìm kiếm: <b>{{query}}</b> <span> Tìm kiếm được <b>{{listPostsSearch.length}}</b> kết quả</span></p>
   

      </div>
    <div
      v-if="listPostsSearch && listPostsSearch.length"
      v-masonry
      column-width=".grid-sizer"
      transition-duration="0.3s"
      item-selector=".ass1-section__item"
      class="ass1-section__wrap row ass1-section__isotope-init"
    >
      <!--section-->
      <div class="grid-sizer"></div>
      <AppPostItem
        v-masonry-tile
        v-for="item in listPostsSearch"
        v-bind:key="item.PID"
        v-bind:post="item"
        class="col-lg-6"
      ></AppPostItem>
    </div>
  </div>
</template>

<script>
import AppPostItem from "../components/PostItem.vue";
import { mapActions } from "vuex";

export default {
  name: "app-search",
  components: {
    AppPostItem
  },
  data() {
    return {
      query: this.$route.query.query,
      listPostsSearch: []
    };
  },
  watch: {
    $route(to, from) {
      this.query = to.query.query;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      getPostsSearch: "modulePost/getPostsSearch"
    }),

    fetchData() {
      if (!this.query) {
        this.$router.push("/");
      } else {
        this.getPostsSearch(this.query).then(res => {
          if (res.ok) {
            this.listPostsSearch = res.posts;
          }
        });
      }
    }
  }
};
</script>

<style>
.pageSearch_info{
 margin: 10px 0px;
}
mark,.mark{
    background: yellow;
    padding: 0px;
}
</style>
