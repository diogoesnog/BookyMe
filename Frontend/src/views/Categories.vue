<template>
    <div style="color: #434343">
      <div class="row">
        <div class="col-6">
          <q-btn padding="6px 6px" class="gradientOne shadow" round icon="fas fa-angle-left"/>
        </div>
        <div class="col-6">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>
      </div>
      <p style="font-weight: 670; font-size: 45px;">{{$t('categoriesPage.title')}}</p>
      <div>
        <div style="margin: 30px;" class="row" v-for="(category, index) in categories" :key="index" v-bind="category">
          <div class="col-10 roundedDiv shadow">
            <h7 style="font-weight: 600">
              {{ category.title }} 
              </h7>
            <h7 style="font-weight: 400;">
              {{ category.count }} Resultados(s)
            </h7>
          </div>
          <div class="col-2">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </div>
        </div>
      </div>	
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

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .roundedDiv {
    border-radius: 200px;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

</style>