<template>
  <!--sections-->
  <div class="row">
    <div class="col-lg-8">
      <AppPostList></AppPostList>
    </div>
     <Sidebar></Sidebar>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppPostList from "../components/PostList.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "app-homepage",
  components: {
    AppPostList,Sidebar
  },
  methods: {
    ...mapActions({
      getListPostHashPaging: "modulePost/getListPostHashPaging",
    }),
  },
  // watch route chỉ chạy khi có sự thay đổi router, Nếu như load lần đầu tiên -> không chạy
  watch: {
    $route(to, from) {
      
      var tagIndex = to.query.tag_index;
      this.getListPostHashPaging({tagIndex: tagIndex});

    },
  },
  created(){
    var tagIndex = this.$route.query.tag_index;
    this.getListPostHashPaging({tagIndex: tagIndex});
  }
};
</script>

<style>
</style>
