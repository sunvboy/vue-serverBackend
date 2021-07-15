<template>
  <div class="ass1-section__list">
    <AppPostItem v-for="item in getListPost" :key="item.PID" :post="item"></AppPostItem>

    <button class="load-more ass1-btn" v-if="getListPost && getListPost.length" @click="handleLoadMore"><span>Xem thêm</span></button>
    <h3 v-else>Loading....</h3>
  </div>
</template>

<script>
import {PAGE_SIZE ,CURRENT_PAGE} from "../constants"
import { mapGetters,mapActions } from "vuex";
import AppPostItem from "./PostItem.vue";
export default {
  name: "app-postlist",
  components: {
    AppPostItem,
  },
  data(){
      return {
        pagesize: PAGE_SIZE,currPage: CURRENT_PAGE,tagIndex: parseInt(this.$route.query.tag_index)
      }
  },
  computed: {
    ...mapGetters({
      getListPost: "modulePost/getListPost",
    }),
  },
  methods:{
   ...mapActions({
      getListPostHashPaging: "modulePost/getListPostHashPaging",
    }),
    handleLoadMore(){
      this.currPage = this.currPage+1
      this.getListPostHashPaging({pagesize: this.pagesize,currPage: this.currPage,tagIndex:this.tagIndex});

    }
  },
  watch: {
    $route(to, from) {
      this.tagIndex = to.query.tag_index;
       this.currPage = 1;

    },
  },
};
</script>

<style>
</style>
