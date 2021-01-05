<template>
    <div style="color: #434343;" class="centerDiv">
      <div class="row" style="margin: 20px;">
        <div class="col-10" style="display: flex; align-items: center;">
          <q-btn padding="6px 6px" class="gradientOne shadow" round icon="fas fa-angle-left"/>
        </div>
        <div class="col-2" style="text-align: right;">
          <q-avatar class="shadow">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>
      </div>
      <p style="font-weight: 670; font-size: 45px; padding-left: 20px; padding-top:5px;">{{$t('categoriesPage.title')}}</p>
      <div style="padding-top: 5px;">
        <div style="margin: 20px;" class="row" v-for="(category, index) in categories" :key="index" v-bind="category">
          <div class="col-10 roundedDiv shadow" style="display: flex; align-items: center;">
            <h7 style="font-weight: 600; font-size: 15px;">
              {{ category.title }}
            </h7>
            <span style="display:inline-block; width: 4px;"/>
            <h7 style="font-weight: 400; font-size: 15px;">
              {{ category.count }} Resultado(s)
            </h7>
          </div>
          <div class="col-2" style="text-align: right;">
              <q-btn v-bind:to="'stores/' + category.title" size='20px' padding="6px 6px" class="gradientOne shadow" round icon="fas fa-angle-right"/>
          </div>
        </div>
      </div>
      <Toolbar/>
    </div>
</template>

<script>

import Service from '../services/user.service';
// TODO: Não se está a utilizar a lista como componente.
import CategoriesList from '../components/Homepage/CategoriesList';
import Toolbar from '../components/Root/Toolbar';

export default {

  name: "Categories",
  components: { Toolbar },

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

  .centerDiv {
    padding: 15px;
    margin-top: 10px;
  }

  .gradientOne {
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
