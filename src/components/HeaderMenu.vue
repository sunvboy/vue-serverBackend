<template>
  <nav>
    <ul class="ass1-header__menu">
      <li>
        <a href="#" @click.prevent="handleShowMenu()">Danh mục</a>
        <div
          class="ass1-header__nav"
          style="display: none"
          v-bind:class="{ show: isShow }"
        >
          <div class="container">
            <ul>
              <li v-for="v in categories" :key="v.id">
                <router-link :to="getLinkCategories(v)" @click.native="handleShowMenu()">{{
                  v.text
                }}</router-link>
              </li>
            </ul>
          </div>
          <div class="ass1-header__menu-transition"></div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import { removeVietnameseFromString } from  '../helper/index'
export default {
  name: "app-header-menu",
  computed: {
    isShow() {
      return this.$store.state.moduleExample.isShowMenu;
    },
    categories() {
      return this.$store.state.modulePost.categories;
    },
   
  },
  methods: {
    ...mapActions({
      isShowMenu: "moduleExample/handleShowMenu",
    }),
    handleShowMenu() {
      this.isShowMenu(!this.$store.state.moduleExample.isShowMenu);
    },
    getLinkCategories(v) {
      return {
        name: "home-page",
        query: {
          text: removeVietnameseFromString(v.text),
          tag_index: v.id,
        }
      };
    },
  },
};
</script>

<style scoped>
.ass1-header__nav.show {
  display: inline-block !important;
}
.ass1-header__nav > .container ul li {
  width: 25%;
}
.ass1-header__nav > .container ul {
  flex-direction: row;
  width: 100%;
  flex-flow: wrap;
}
</style>>


