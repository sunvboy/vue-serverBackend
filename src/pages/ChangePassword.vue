<template>
  <div class="ass1-login">
    <div class="ass1-login__content">
      <p>Đổi mật khẩu</p>
      <div class="ass1-login__form">
        <form action="#" @submit.prevent="handleChangePassword">
          <input
            v-model="oldPassword"
            type="password"
            class="form-control"
            placeholder="Mật khẩu cũ"
            required=""
          />
          <input
            v-model="newPassword"
            class="form-control"
              type="password"
            placeholder="Mật khẩu mới"
            required=""
          />
          <input
            v-model="reNewPassword"
            class="form-control"
              type="password"
            placeholder="Xác nhận mật khẩu mới"
            required=""
          />
          <div class="ass1-login__send justify-content-center">
            <button type="submit" class="ass1-btn">Gửi</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Notifications from "vue-notification";
Vue.use(Notifications);

export default {
  name: "app-changepassword",
  data() {
    return {
      userid: this.$route.params.id,
      oldPassword: "",
      newPassword: "",
      reNewPassword: ""
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
    })
  },
  methods: {
    ...mapActions({
        'changePassword' : 'moduleUser/ChangePassword'
    }),
    checkIsCurrentUser() {
      if (this.userid && this.currentUser) {
        if (this.userid != this.currentUser.USERID) {
          this.$router.push("/");
        }
      }
    },
    handleChangePassword() {
      if (this.oldPassword && this.newPassword && this.reNewPassword) {
        if (this.oldPassword == this.newPassword) {
        //   this.$notify({
        //     group: "foo",
        //     type: "error",
        //     title: "Thông báo",
        //     text: "Mật khẩu cũ không được trùng với mật khẩu mới"
        //   });
        alert("Mật khẩu cũ không được trùng với mật khẩu mới")
        } else if (this.newPassword != this.reNewPassword) {
        //   this.$notify({
        //     group: "foo",
        //     type: "error",
        //     title: "Thông báo",
        //     text: "Mật khẩu nhập lại không khớp"
        //   });
          alert("Mật khẩu nhập lại không khớp");
        } else {
          let data = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            reNewPassword: this.reNewPassword
          };
          this.changePassword(data).then(res => {
              console.log(res)
            if (res.ok) {
               alert("Thay đổi mật khẩu thành công");
               this.$router.push('/')
            } else {
               alert(res.message);
            }
          });
        }
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Thông báo",
          text: "Bạn cần điền đầy thủ thông tin"
        });
      }
    }
  }
};
</script>

<style></style>
