<template>
  <div>
       <div>
        <Popular/>
      </div>
      
      
      <div class= "divBottom">
        <CategoriesList/>
        
      </div>
      
      <div>
        <Toolbar/>
      </div>
      
      <div>
        <ProfileData :profile="profileData"/>
      </div> 
      
     
  </div> 

</template>

<script>

import CategoriesList from '../components/Homepage/CategoriesList';
import Toolbar from '../components/Root/Toolbar';
import Popular from '../components/Homepage/Popular';
import ProfileData from '../components/Profile/ProfileData';

export default {
  name: "Homepage",

  data() {
    return {
    }
  },

  components: {
    Popular,
    CategoriesList,
    ProfileData,
    Toolbar
  },

  methods: {
  }
}


</script>

<style scoped>

.divTop1{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: center top;
    background-image: url('../assets/Other/ProfileFrame.svg');
  }

  .divTop2{
    position: fixed;
    left: 0;
    top: 30px;
    width: 100%;
    color: white;
  }

  .divBottom {
    z-index: 1000;
    position: fixed;
    top: 300px;
    width: 100%;
    
  }

</style>
