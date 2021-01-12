<template>
  <div class="col-12" style="padding-left: 30px; padding-top: 18px;">
    <p class="titles">{{$t('homePage.categories')}}</p>
    <div class="wrapper">
      <div v-for="(category, index) in categories" :key="index" v-bind="category">
        <div class="item">
          <img class="imgCategory" :src="getImage(category.title)"/>
          <p class="titleCategory">{{category.title}}</p>
        </div>
      </div>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>

import Service from '../../services/user.service';

export default {
  name: "CategoriesList",

  data() {
    return {
      categories: Array
    }
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchCategories();
  },

  methods: {
    fetchCategories() {
      this.$q.loading.show({ delay: 400});

      Service.getCategories()
        .then(response => {
          let data = response.data["data"];

          this.categories = data;

          console.log(this.categories);
        }).catch(err => {

        }).finally(() => {
          this.$q.loading.hide();
        })
    },
    getImage(category) {
      return "../../../icons/categories/" + category + ".svg";
    },
  }
}
</script>

<style scoped>

  .imgCategory {
    width: 100%;
    padding: 20px;
  }

  .titleCategory {
    color: #434343;
    text-align: center;
    font-size: 15px;
    font-weight: 300;
  }
  
  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  .wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    display: grid;
    grid-template-columns: repeat(100, auto);
    grid-gap: 0 20px;
    height: 120px;
  }

  .item {
    background-size: cover;
    height: 90px;
    width: 90px;
    margin-top: 10px;
    margin-left: 5px;
    border-radius: 200px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  }

  .empty {
    width: 10px;
  }

  .wrapper::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

</style>
