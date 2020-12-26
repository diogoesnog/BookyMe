<template>
    <div>
      <div class="row">
        <div class="col-6">
          <q-btn padding="6px 6px" class="gradientOne" round icon="fas fa-angle-left"/>
        </div>
        <div class="col-6">
        </div>
      </div>
      <CategoriesList v-for="(category, index) in categories" :key="index" v-bind="category"/>
    </div>
</template>

<script>

import Service from '../services/user.service';
import CategoriesList from '../components/Homepage/CategoriesList';

export default {

  name: "Categories",

  data() {
    return {
      categories: Array
    }
  },

  components: {
    CategoriesList
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
    }
  }
}

</script>

<style scoped>

  .gradientOne {
    margin-left: 10px;
    margin-top: 0px; 
    position: relative; 
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  } 

</style>