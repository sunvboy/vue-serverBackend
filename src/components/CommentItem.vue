<template>
   <!--comment-->
    <div class="ass1-comments__section">
      <a href="#" class="ass1-comments__avatar ass1-avatar"
        ><img :src="getavatarUser" :alt="comment.fullname"
      /></a>
      <div class="ass1-comments__content">
        <a href="#" class="ass1-comments__name"> {{comment.fullname}}</a>
        <span class="ass1-comments__passed">{{formatTimeAdded}}</span>
        <a href="#" class="ass1-comments__btn-reply ass1-btn-icon"
          ><i class="icon-Reply">Trả lời</i></a
        >
        <p>
          {{comment.comment}}
        </p>
        
      </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
  name: "app-comment-item" ,
  props:{
    comment:{type:Object, default: null}
  },
  computed:{
     getavatarUser() {
      if (this.comment) return this.comment.profilepicture;
      return "/dist/images/avatar-02.png";
    },formatTimeAdded() {
      moment.locale("vi");
      return moment(this.comment.time_added).fromNow();
    },
  }
};
</script>

<style></style>
