<template>
  <div class="ass1-header__search">
    <form action="#" @submit.prevent="handleSearch">
      <label>
        <input
          v-model="searchStr"
          type="search"
          name="search-text"
          class="form-control"
          placeholder="Nhập từ khóa ..."
        />
     
        <i class="icon-Search"></i>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: "app-header-search",
  data(){
    return {
      searchStr: '',
    }
  },
  methods:{
    handleSearch(){
      if(this.searchStr){
        this.$router.push({
          name: 'search',
          query: {
            query: this.searchStr
          }
        })
      }else{
        alert("Vui lòng nhập nội dung vào ô tìm kiếm")
      }
    }
  }
};
</script>
<style>
</style>
