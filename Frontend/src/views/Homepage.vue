<template>
  <div>
    <Popular :base="base" :stores ="storesData" :profile="profileData" />
    <CategoriesList/>
    <Toolbar/>
  </div>
</template>

<script>

import Service from '../services/user.service';
import CategoriesList from '../components/Homepage/CategoriesList';
import Popular from '../components/Homepage/Popular';
import Toolbar from '../components/Root/Toolbar';

export default {
  name: "Homepage",

  data() {
    return {
      profileData: {},
      storesData: {},
      base: ''
    }
  },

  components: {
    Popular,
    CategoriesList,
    Toolbar
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchProfileData();
    this.fetchStoresList();
  },

  methods: {
    fetchProfileData() {
      Service.getProfileData()
        .then(response => {
          this.base = response.data["base"];
          this.profileData = response.data["data"];;
        }).catch(err => {
        }).finally(() => {
          this.$q.loading.hide();
        })   
    },
    fetchStoresList() {
      Service.getStoresData()
        .then(response => {
          this.storesData = response.data["data"];;
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
