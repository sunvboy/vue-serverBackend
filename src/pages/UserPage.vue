<template>
  <div class="userDetail">
    <div class="ass1-head-user" v-if="userInfo">
      <div class="ass1-head-user__content">
        <div class="ass1-head-user__image">
          <router-link :to="{name: 'user-profile', params: { id : userInfo.USERID}}"><img :src="getAvatar" :alt="userInfo.fullname"/></router-link>
        </div>
        <div class="ass1-head-user__info">
          <div class="ass1-head-user__info-head">
            <div class="ass1-head-user__name">
              <span>{{ userInfo.fullname }}</span>
              <i><img src="/dist/fonts/emotion/svg/Verified.svg" :alt="userInfo.fullname"/></i>
            </div>
            <div class="w-100"></div>
            <div v-if="isCurrentUser">
            <router-link :to="{name: 'change-password', params: { id : userInfo.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</router-link>
            <router-link :to="{name: 'user-profile', params: { id : userInfo.USERID}}" class="ass1-head-user__btn-follow ass1-btn">Profile</router-link>
            </div>
            <a href="#" v-else class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>
            <!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
          </div>
          <div class="ass1-head-user__info-statistic">
            <div class="ass1-btn-icon">
              <i class="icon-Post"></i><span>Bài viết: {{getCountListPostsOffUser}}</span>
            </div>
            <div class="ass1-btn-icon">
              <i class="icon-Followers"></i><span>Theo dõi: 99999</span>
            </div>
            <div class="ass1-btn-icon">
              <i class="icon-Following"></i><span>Đang theo dõi: 999</span>
            </div>
            <!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
          </div>
          <p>{{ userInfo.description }}</p>
        </div>
      </div>
    </div>
    <!--sections-->
    <div
      v-if="listPostofUser && listPostofUser.length"
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
        v-for="item in listPostofUser"
        v-bind:key="item.PID"
        v-bind:post="item"
        class="col-lg-6"
      ></AppPostItem>
    </div>
  </div>
</template>

<script>
import AppPostItem from "../components/PostItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    AppPostItem
  },
  data() {
    return {
      userid: parseInt(this.$route.params.id),
      userInfo: null,
      listPostofUser: []
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "moduleUser/currentUser"
    }),
    isCurrentUser() {
      if (this.currentUser && this.userInfo) {
        if (this.userInfo.USERID === this.currentUser.USERID) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    getAvatar() {
      if (this.userInfo.profilepicture) return this.userInfo.profilepicture;
      return "/dist/images/avatar-01.png";
    },
    getCountListPostsOffUser() {
      if(this.listPostofUser && this.listPostofUser.length) return this.listPostofUser.length
      return 0;
    }
  },
  watch: {
    $route(to, from) {
      this.userid = parseInt(to.params.id);
      this.fetchAllData();
    }
  },
  created() {
    this.fetchAllData();
  },
  methods: {
    ...mapActions({
      getUserById: "moduleUser/getUserById",
      getListPostsByUserId: "moduleUser/getListPostsByUserId"
    }),
    async fetchAllData() {
      this.$store.dispatch("showLoading", true);
      let userid = this.userid;
      var promiseUser = this.getUserById(userid);
      var promisePost = this.getListPostsByUserId(userid);
      let [resultUser, resultPost] = await Promise.all([
        promiseUser,
        promisePost
      ]);
      this.$store.dispatch("showLoading", false);
      if (resultUser.ok && resultPost.ok) {
        this.userInfo = resultUser.data;
        this.listPostofUser = resultPost.posts;
        this.$redrawVueMasonry();
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>

  .ass1-head-user__btn-follow{
    float: left;
  }
</style>
