<template>
  <div class="row">
    <div class="col-lg-8">
      <!--section-->
      <div class="ass1-section ass1-section__edit-post">
        <div class="ass1-section__content">
          <form action="#">
            <div class="form-group">
              <input
                type="text"
                v-model="url_image"
                class="form-control ttg-border-none"
                placeholder="https://"
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="post_content"
                type="text"
                class="form-control ttg-border-none"
                placeholder="Mô tả ..."
              ></textarea>
            </div>
          </form>
          <div class="ass1-section__image" @click.prevent="uploadImage()">
            <a href="#"><img :src="renderImage" alt="default" /></a>
          </div>
          <a
            href="https://memeful.com/"
            target="_blank"
            class="ass1-btn ass1-btn-meme"
            >Chế ảnh từ meme</a
          >

          <button class="ass1-btn ass1-btn-meme" @click.prevent="uploadImage()">
            Đăng ảnh từ máy tính
          </button>
          <input
            ref="imageUpload"
            v-on:change="handleUploadImage"
            type="file"
            name="avatar"
            placeholder="Ảnh đại diện"
            class="form-control"
            style="display: none"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <aside class="ass1-aside ass1-aside__edit-post">
        <div>
          <button @click.prevent="handleUploadPost" class="ass1-btn">
            Đăng bài
          </button>
        </div>
        <div class="ass1-aside__edit-post-head">
          <span style="display: block; width: 100%; margin-bottom: 10px"
            >Chọn danh mục</span
          >
          <label class="ass1-checkbox" v-for="v in allCategories" :key="v.id">
            <input
              type="checkbox"
              name="state-post"
              v-model="category"
              :value="v.id"
            />
            <span></span>
            <p>{{ v.text }}</p>
          </label>
        </div>
        <div class="ass1-aside__get-code">
          <p>Share Link</p>
        </div>
        <div class="ass1-aside__social">
          <a href="" class="ass1-btn-social__facebook ass1-btn-social"
            ><i class="fa fa-facebook" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__twitter ass1-btn-social"
            ><i class="fa fa-twitter" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__google ass1-btn-social"
            ><i class="fa fa-google-plus" aria-hidden="true"></i
          ></a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { checkImageURL, checkImageFile } from "../helper";
export default {
  name: "app-postupload",

  data() {
    return {
      post_content: "",
      url_image: "",
      obj_image: {
        objFile: null,
        base64URL: "",
      },
      category: [],
    };
  },
  computed: {
    allCategories() {
      return this.$store.state.modulePost.categories;
    },
    renderImage() {
      if (this.obj_image.base64URL) {
        return this.obj_image.base64URL;
      } else if (this.url_image) {
        return this.url_image;
      } else {
        return "/dist/images/no_image_available.jpg";
      }
    },
  },
  methods: {
    ...mapActions({
      createNewPost: "modulePost/createNewPost",
    }),
    uploadImage() {
      this.$refs.imageUpload.click();
    },
    handleUploadImage(e) {
      if (e.target.files && e.target.files.length) {
        const imageUpload = e.target.files[0];
        // console.log(imageUpload);
        //check ảnh png,gif,jpg,jpeg
        let check = checkImageFile(imageUpload);
        // console.log(imageUpload);
        if (check) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            () => {
              let previewSrc = reader.result;
              this.obj_image.base64URL = previewSrc;
              this.obj_image.objFile = imageUpload;
            },
            false
          );

          if (imageUpload) {
            reader.readAsDataURL(imageUpload);
          }
        } else {
          alert("File tải lên không hợp lệ");
        }
      }
    },
    resetData() {
      this.category = [];
      this.post_content = "";
      this.url_image = "";
      this.obj_image = {
        base64URL: "",
        objFile: null,
      };
    },
    handleUploadPost() {
      let { post_content, url_image, category, obj_image } = this;
      if (post_content && category.length) {
        if (url_image || obj_image.objFile) {
          let data = { post_content, url_image, category, obj_image };
          if (obj_image.objFile) {
            data.obj_image = obj_image.objFile;
          }
          this.createNewPost(data).then((res) => {
            if (res.ok) {
              //reset lại toàn bộ data
              this.resetData();
              alert("Đăng bài viết thành công!");
            } else {
              alert(res.error);
            }
          });
        } else {
          alert("Vui lòng upload hình ảnh");
        }
      } else {
        alert("VUi lòng nhập đầy đủ nội dung");
      }
    },
  },
};
</script>

<style></style>
