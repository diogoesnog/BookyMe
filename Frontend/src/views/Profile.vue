<template>
    
</template>

<script>

import Service from '../services/user.service';
import FavoritesList from '../components/Favorites/FavoritesList';
import Toolbar from '../components/Root/Toolbar';

export default {

  name: "Favorites",
  components: { FavoritesList },

  data() {
    return {
      favorites: Array
    }
  },

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchFavorites();
  },
  methods: {

    fetchFavorites() {
      console.log("Fetch Favorites");
      Service.getFavorites()
        .then(response => {
          console.log("Got Response");
          let data = response.data["data"];

          this.favorites = data;

          console.log(data);
        }).catch(err => {
            console.log(err)
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
