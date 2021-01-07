<template>
  <div style="color: #434343;" class="centerDiv">
    <div class="row" style="margin: 20px;">
      <div class="col-2" style="display: flex; align-items: center;">
        <q-btn to="../categories" padding="6px 6px" class="gradientOne shadow" round icon="fas fa-angle-left"/>
      </div>

      <div class="col-10">
        <q-input rounded outlined label='Search'>
          <template v-slot:append>
            <q-avatar size='xl' icon="search" />
          </template>
        </q-input>
      </div>
    </div>

    <p style="font-weight: 670; font-size: 45px; padding-left: 20px; padding-top:5px;">{{this.category}}</p>

    <Store v-for="(store, index) in stores" :key="index" v-bind="store"/>


    <div class="q-pt-xl">
      <q-banner v-if="error" rounded class="bg-primary text-white">

        {{ $t('storesPage.error') }}

        <template v-slot:action>
          <q-btn push to="../home" color="primary" round icon="home" />
        </template>

        <template v-slot:avatar>
          <q-icon name="error"/>
        </template>
      </q-banner>
    </div>
    <Toolbar/>
  </div>
</template>

<script>

import Service from '../services/user.service';
import Toolbar from '../components/Root/Toolbar';
import Store from "../components/common/Store";

export default {

  name: "Stores",
  components: { Toolbar, Store },

  data() {
    return {
      category: this.$route.params.category,
      stores: Array,
      error: 0
    }
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    console.log(this.category)
    this.fetchStoresByCat(this.category);
  },
  methods: {

    fetchStoresByCat(category){

      this.$q.loading.show({ delay: 400});

      Service.getStoresByCategory(category)
        .then(response => {
          this.stores = response.data["data"];
          console.log(this.stores)
          if (this.stores.length === 0) {
            this.error = 1
          }
        }).catch(err => console.log(err))
        .finally(() => {this.$q.loading.hide();
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
