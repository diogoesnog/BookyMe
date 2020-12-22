<template>
    <div>
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