<template>
  <div class="ass1-section__item" v-if="post">
    <div class="ass1-section">
      <AppPostItemHead :post="post"></AppPostItemHead>
      <AppPostItemContent :post="post"></AppPostItemContent>
      <AppPostItemFooter :post="post"></AppPostItemFooter>
    </div>
  </div>
</template>
<script>
import AppPostItemHead from "./PostItemHead.vue";
import AppPostItemContent from "./PostItemContent.vue";
import AppPostItemFooter from "./PostItemFooter.vue";

export default {
  name: "app-postitem",
  components: {
    AppPostItemHead,
    AppPostItemContent,
    AppPostItemFooter,
  },
  props: {
    post: { type: Object, default: null },
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
