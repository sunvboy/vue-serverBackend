<template>
  <div class="ass1-login">
    <div class="ass1-login__logo">
      <a href="index.html" class="ass1-logo">ZendVn Meme</a>
    </div>
    <div class="ass1-login__content">
      <p>Đăng ký một tài khoản</p>
      <div class="ass1-login__form">
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          class="alert alert-danger"
          v-if="showDanger"
        >
          {{ this.textAlert }}
        </div>
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          class="alert alert-success"
          v-if="showSuccess"
        >
          Đăng ký thành công
        </div>
        <form action="#" @submit.prevent="handleRegister">
          <input
            type="text"
            v-model="fullname"
            class="form-control"
            placeholder="Tên hiển thị"
          />
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Email"
          />
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Mật khẩu"
          />
          <input
            type="password"
            v-model="repassword"
            class="form-control"
            placeholder="Nhập lại mật khẩu"
          
          />
          <div class="ass1-login__send">
            <router-link to="login">Đăng nhập</router-link>
            <button type="submit" class="ass1-btn">Đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app-register",
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
      repassword: "",
      showDanger: false,
      showSuccess: false
    };
  },
  methods: {
    ...mapActions({
      register: "moduleUser/register"
    }),
    handleRegister() {
      let data = {
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        repassword: this.repassword
      };
      if (this.fullname && this.email && this.password && this.repassword) {
        this.textAlert = "";
        this.showDanger = false;
        this.register(data).then(res => {
          if (res.ok === false) {
            if (typeof res.error === "string") {
              this.textAlert = res.error;
            } else {
              this.textAlert = res.error.join(" ");
            }
            this.showDanger = true;
          } else {
            this.showDanger = false;
            this.showSuccess = true;
            setTimeout(() => {
              this.$router.push("/");
            }, 3000);
          }
        });
      } else {
        alert('Vui lòng nhập đầy đủ thông tin')
      }
    }
  }
};
</script>

<style></style>
