<template>
  <div class="col-lg-4">
    <aside class="ass1-aside">
      <div class="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      <div v-if="!isLogin">
        Vui lòng đăng nhập để xem nội dung này
        <router-link to="login">Đăng nhập</router-link>
      </div>
      <div v-else-if="isLogin && getListPostsByUserId &&  getListPostsByUserId.length">
        <AppPostItem
          v-for="item in getListPostsByUserId"
          :key="item.PID"
          :post="item"
        ></AppPostItem>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppPostItem from "./PostItem.vue";

export default {
  name: "app-sidebar",
  components: {
    AppPostItem
  },
  computed: {
    ...mapGetters({
      isLogin: "moduleUser/isLogin",
      getListPostsByUserId: "moduleUser/getListPostsByUserId"
    }),
    getAvatar() {
      if (this.currentUser.profilepicture)
        return this.currentUser.profilepicture;
      return "/dist/images/avatar-01.png";
    }
  }
};
</script>

<style></style>
