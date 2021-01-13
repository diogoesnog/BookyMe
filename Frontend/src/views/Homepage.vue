<template>
  <div>
    <Popular :base="base" :profile="profileData" />
    <div class= "categoriesDiv">
      <CategoriesList/>
    </div>
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
  },

  methods: {
    fetchProfileData() {
      this.$q.loading.show({ delay: 400});
      Service.getProfileData()
        .then(response => {
          let data = response.data["data"];
          this.base=response.data["base"];
          this.profileData=data;
          console.log(this.profileData);
        }).catch(err => {

        }).finally(() => {
          this.$q.loading.hide();
        })   
    },
  }
}


</script>

<style scoped>

  .categoriesDiv {
    z-index: 1000;
    position: fixed;
    top: 300px;
    width: 100%;
    
  }

</style>
