<template>
 <div>
  <div>
    <CategoriesList/>
  </div>
  <div>
     <Toolbar/>
  </div>
 </div> 
</template>

<script>

import CategoriesList from '../components/Homepage/CategoriesList';
import Toolbar from '../components/Root/Toolbar';

export default {
  name: "Homepage",

  data() {
    return {
    }
  },

  components: {
    CategoriesList,
    Toolbar
  },

  methods: {
  }
}


</script>

<style scoped>

</style>
