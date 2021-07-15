<template>
  <div id="app">
    <main>
      <div class="container">
        <AppHeader v-if="isRenderHeader"></AppHeader>
        <router-view></router-view>
      </div>
    </main>
    <AppLoading v-if="isLoading" :class="{ show: isLoading }" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./components/Header.vue";
import AppLoading from "./components/Loading.vue";

export default {
  name: "app",
  components: {
    AppHeader,
    AppLoading,
  },
  computed: {
    ...mapState(["isLoading"]),

    isRenderHeader() {
      var arrHeader = ["login", "register"];
      var routerName = this.$route.name;
      if (arrHeader.indexOf(routerName) !== -1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    ...mapActions({
      checklogin: "moduleUser/checklogin",
    }),
  },
  created() {
    this.checklogin();
  }
};
</script>

<style>
</style>
