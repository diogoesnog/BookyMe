<template>
    <div style="color: #434343;" class="centerDiv">
      <div class="row" style="margin: 20px;">
        <div class="col-12" style="display: flex; align-items: center;">
          <q-btn to="../home" padding="6px 6px" class="gradientOne shadow" round icon="fas fa-angle-left"/>
        </div>
      </div>
      <p style="font-weight: 670; font-size: 45px; padding-left: 20px; padding-top:5px;">{{$t('categoriesPage.title')}}</p>
      <div style="padding-top: 5px;">
        <div style="margin: 20px;" class="row" v-for="(category, index) in categories" :key="index" v-bind="category">
          <div class="col-10 roundedDiv shadow" style="display: flex; align-items: center;">
            <div style="font-weight: 600; font-size: 18px;">
              {{ category.title }}
            </div>
            <span style="display:inline-block; width: 5px;"/>
            <div style="font-weight: 350; font-size: 17px;">
              {{ resultsText(category.count) }}
            </div>
          </div>
          <div class="col-2" style="text-align: right;">
            <q-avatar class="shadow gradientOne">
              <router-link v-bind:to="'../stores/' + category.title">
                <img style="height: 30px" :src="nameIcon(category.title)"/>
              </router-link>
          </q-avatar>
          </div>
        </div>
      </div>
      <Toolbar/>
    </div>
</template>

<script>

import Service from '../services/user.service';
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
          this.categories = response.data["data"];
        }).catch(err => console.log(err)
        ).finally(() => {
          this.$q.loading.hide();
        })
    },

    nameIcon(category) {
      return "../../../icons/categories/" + category + ".svg";
    },

    resultsText(numberResults) {
      if(numberResults == 1) return numberResults + " Resultado";
      else return numberResults + " Resultados";
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
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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
