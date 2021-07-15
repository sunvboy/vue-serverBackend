<template>
  <div class="ass1-login">
    <div class="ass1-login__logo">
      <router-link to="/" class="ass1-logo">SUNVBOY SOCIAL</router-link>
    </div>
    <div class="ass1-login__content">
      <p>Đăng nhập</p>
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
          Đăng nhập thành công
        </div>

        <form action="#" @submit.prevent="handleLogin">
          <input
            v-model="email"
            type="text"
            class="form-control"
            placeholder="Email"
            required=""
          />
          <div class="ass1-input-copy">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Mật khẩu"
              required=""
            />
            <a href="#">Copy</a>
          </div>
          <div class="ass1-login__send">
            <router-link to="register">Đăng ký một tài khoản</router-link>
            <button type="submit" class="ass1-btn">Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app-login",
  data() {
    return {
      email: "",
      password: "",
      showDanger: false,
      showSuccess: false,
      textAlert: "",
    };
  },
  methods: {
    ...mapActions({
      login: "moduleUser/login",
    }),
    handleLogin(e) {
      let data = {
        email: this.email,
        password: this.password,
      };
      this.login(data).then((res) => {
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
    },
  }
};
</script>

<style>
</style>
