<template>
  <div>
    <Popular :baseProfile="baseProfile" :basePopular="basePopular" :stores ="storesDataPopular" :profile="profileData" />
    <CategoriesList/>
    <Recommendation :baseRecomendation="baseRecomendation" :stores ="storesData" :profile="profileData" />
    <Toolbar/>
  </div>
</template>

<script>

import Service from '../services/user.service';
import CategoriesList from '../components/Homepage/CategoriesList';
import Popular from '../components/Homepage/Popular';
import Recommendation from '../components/Homepage/Recommendation';
import Toolbar from '../components/Root/Toolbar';

export default {
  name: "Homepage",

  data() {
    return {
      profileData: {},
      storesData: {},
      storesDataPopular: {},
      basePopular: '',
      baseRecomendation: '',
      baseProfile: ''
    }
  },

  components: {
    Popular,
    CategoriesList,
    Recommendation,
    Toolbar
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchProfileData();
    this.fetchStoresList();
    this.fetchStoresListPopular();
  },

  methods: {
    fetchProfileData() {
      Service.getProfileData()
        .then(response => {
          this.baseProfile = response.data["base"];
          this.profileData = response.data["data"];
        }).catch(err => {
        }).finally(() => {
          this.$q.loading.hide();
        })   
    },
    fetchStoresList() {
      Service.getStoresData()
        .then(response => {
          this.baseRecomendation = response.data["base"];
          this.storesData = response.data["data"];
        }).catch(err => {
        }).finally(() => {
          this.$q.loading.hide();
        })  
    },
    fetchStoresListPopular() {
      Service.getStoresDataPopular()
        .then(response => {
          this.basePopular = response.data["base"];
          this.storesDataPopular = response.data["data"];
          console.log("Get POPULAR");
          console.log(this.storesDataPopular);
        }).catch(err => {
        }).finally(() => {
          this.$q.loading.hide();
        })  
    }
  }
}


</script>

<style scoped>

</style>
