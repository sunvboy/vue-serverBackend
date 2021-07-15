<template>
  <!--sections-->
  <div class="row">
    <div class="col-lg-8">
      <!--section-->
      <div
        class="ass1-section__list"
        v-if="getDataPostDetail && getDataPostDetail.post"
      >
        <AppPostItem :post="getDataPostDetail.post"></AppPostItem>
        <!-- <post-feeling /> -->
        <div class="list-categories">
          <h5><strong>Danh mục: </strong></h5>
          <ul>
            <li
              v-for="item in getDataPostDetail.categories"
              v-bind:key="item.TAG_ID"
            >
              <router-link v-bind:to="getLinkCategories(item)">{{
                item.tag_value
              }}</router-link>
            </li>
          </ul>
        </div>
        <AppCommentAdd />
        <CommentList v-bind:comments="getDataPostDetail.comments"/>
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script>
import AppCommentAdd from "../components/CommentAdd.vue";
import CommentList from "../components/CommentList.vue";
import Sidebar from "../components/Sidebar.vue";
import AppPostItem from "../components/PostItem.vue";
import { removeVietnameseFromString } from "../helper/index";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app-postdetail",
  components: {
    CommentList,
    AppCommentAdd,
    Sidebar,
    AppPostItem,
  },
  computed: {
    ...mapGetters({
      getDataPostDetail: "modulePost/getDataPostDetail",
    }),
  },
  data() {
    return {
      postID: parseInt(this.$route.params.id),
    };
  },
  methods: {
    ...mapActions({
      getListPostDetailBYId: "modulePost/getListPostDetailBYId",
    }),
    fetchDataPostDetail(id) {
      this.getListPostDetailBYId(id).then((res) => {
        if (!res.ok) {
          this.$router.push("/");
        }
      });
    },
    getLinkCategories(v) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(v.tag_value),
          tag_index: v.tag_index,
        },
      };
    },
  },
  watch: {
    $route(to, from) {
      this.postID = to.params.id;
      this.fetchDataPostDetail(this.postID);
    },
  },
  created() {
    this.fetchDataPostDetail(this.postID);
  },
};
</script>

<style>
.ass1-section__post-detail {
  margin-top: 44px;
}
.ass1-section__post-detail .ass1-section .ass1-section {
  box-shadow: none;
  padding: 0;
  border-bottom: solid 1px #f3f3f3;
}
.list-categories {
  padding-bottom: 20px;
}
.list-categories ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
}
.list-categories ul li {
  margin: 5px;
}
.list-categories ul li a {
  color: #333;
  font-size: 14px;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 3px 10px;
  transition: all 0.3s ease;
}
.list-categories ul li a:hover {
  background-color: #333;
  border-color: #333;
  color: #fff;
}
/* .ass1-section__post-detail > .ass1-section {
        padding: 0;
    } */
</style>