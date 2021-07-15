<template>
  <div class="ass1-login">
    <div class="ass1-login__content">
      <p>Profile</p>

      <div class="ass1-login__form">
        <div class="avatar">
          <img :src="getAvatar" alt="" />
        </div>
        <form action="#" v-if="currentUser" @submit.prevent="handleSubmit">
          <input
            :value="currentUser.fullname"
            @input="fullname = $event.target.value"
            type="text"
            class="form-control"
            placeholder="Tên ..."
            required=""
          />

          <select
            class="form-control"
            :value="currentUser.gender"
            @change="gender = $event.target.value"
          >
            <option value="">Giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
          <input
            v-on:change="uploadAvatar"
            type="file"
            name="avatar"
            placeholder="Ảnh đại diện"
            class="form-control"
          />
          <textarea
            @input="description = $event.target.value"
            :value="currentUser.description"
            class="form-control"
            cols="30"
            rows="5"
            placeholder="Mô tả ngắn ..."
          ></textarea>
          <div class="ass1-login__send justify-content-center">
            <button type="submit" class="ass1-btn">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
    <notifications group="foo" />
  </div>
</template>

<script>
import Vue from "vue";

import { mapGetters, mapActions } from "vuex";
import Notifications from "vue-notification";
Vue.use(Notifications);
export default {
  name: "app-user-profile",
  data() {
    return {
      userid: this.$route.params.id,
      fullname: "",
      description: "",
      gender: "",
      avatar: {
        objFile: null,
        base64URL: ""
      }
    };
  },
  watch: {
    $route(to, from) {
      this.userid = to.params.id;
      this.checkIsCurrentUser();
    }
  },
  created() {
    this.checkIsCurrentUser();
  },
  computed: {
    ...mapGetters({
      currentUser: "moduleUser/currentUser"
    }),
    getAvatar() {
      if (this.avatar.base64URL === "" && this.currentUser) {
        if (this.currentUser.profilepicture != "") {
          return this.currentUser.profilepicture;
        } else {
          return "/dist/images/avatar-04.png";
        }
      } else {
        return this.avatar.base64URL;
      }
    }
  },
  methods: {
    ...mapActions({
      handleProfile: "moduleUser/handleProfile"
    }),
    checkIsCurrentUser() {
      // console.log(this.$route.params.id)
      // console.log(this.currentUser)
      if (this.userid && this.currentUser) {
        if (this.userid != this.currentUser.USERID) {
          this.$router.push("/");
        }
      }
    },
    handleSubmit() {

      if (!this.fullname) this.fullname = this.currentUser.fullname;
      if (!this.gender) this.gender = this.currentUser.gender;
      if (!this.description) this.description = this.currentUser.description;
      if (this.fullname && this.description && this.gender) {
        let data = {
          fullname: this.fullname,
          gender: this.gender,
          description: this.description
        };
        if (this.avatar.objFile) {
          data.objFile = this.avatar.objFile;
        }
        this.handleProfile(data).then(res => {
          if (res.ok) {
            this.$notify({
              group: "foo",
              type: "success",
              title: "Thông báo",
              text: "Cập nhập profile thành công"
            });
          } else {
            this.$notify({
              group: "foo",
              type: "error",
              title: "Thông báo",
              text: res.error
            });
          }
        });
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Thông báo",
          text: "Bạn cần điền đầy thủ thông tin"
        });
      }
    },

    uploadAvatar(e) {
      if (e.target.files && e.target.files.length) {
        const fileAvatar = e.target.files[0];
        // console.log(fileAvatar);
        let reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            let previewSrc = reader.result;
            this.avatar.base64URL = previewSrc;
            this.avatar.objFile = fileAvatar;
          },
          false
        );

        if (fileAvatar) {
          reader.readAsDataURL(fileAvatar);
        }
      }
    }
  }
};
</script>

<style></style>
