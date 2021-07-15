<template>
  <div class="ass1-comments">
    <div class="ass1-comments__head">
      <div class="ass1-comments__title">{{comments.length}} Bình luận</div>
      <div class="ass1-comments__options">
        <span>Sắp xếp theo:</span>
        <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
          ><i class="icon-Upvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-down ass1-btn-icon"
          ><i class="icon-Downvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"
          ><i class="icon-Expand_all"></i
        ></a>
      </div>
    </div>
   
    <!--comment-->
    <CommentItem v-for="v in comments" :key="v.CID" :comment="v"></CommentItem>


  </div>
</template>

<script>
import moment from "moment";
import CommentItem from "./CommentItem.vue"
export default {
  name: "app-comment-list",
  components:{
    CommentItem
  },
  props:{
    comments:{type:Array, default: []}
  },
  computed:{
     getavatarUser() {
      if (this.comments) return this.comments.profilepicture;
      return "/dist/images/avatar-02.png";
    },formatTimeAdded() {
      moment.locale("vi");
      return moment(this.comments.time_added).fromNow();
    },
  }
};
</script>

<style></style>
