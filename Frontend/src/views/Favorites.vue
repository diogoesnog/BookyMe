<template>
  <div>
    <div style="color: #434343">
      <div class="row">
        <div class="col-6">
          <q-btn padding="6px 6px" class="gradientOne shadow" round icon="fas fa-angle-left"/>
        </div>
        <div class="col-6">
        </div>
      </div>
      <p style="font-weight: 670; font-size: 45px; margin-top:10px; margin-bottom:0px; padding:15px">{{$t('favoritesPage.title')}}</p>
      <h6 style="padding:15px; margin-top:0px; margin-bottom:0px">{{$t('favoritesPage.description')}}</h6>
      <FavoritesList v-for="(favorite, index) in favorites" :key="index" v-bind="favorite"/>

    </div>
    <div>
     <Toolbar/>
    </div>
  </div>  
</template>

<script>

import Service from '../services/user.service';
import FavoritesList from '../components/Favorites/FavoritesList';
import Toolbar from '../components/Root/Toolbar';

export default {

  name: "Favorites",

   data() {
    return {
      favorites: Array
    }
  },

  components: {
    FavoritesList,
    Toolbar
  },

 

  mounted() {
    console.log("Mounted: View has been rendered");
    this.fetchFavorites();
  },
  methods: {
    
    // TODO: criar uma função de remoção de um favorito do teu favorites na função data()
    // tip, este método vai passar para o componente como uma espécie de prop.
    favoriteRemoved(id) {
      this.favorites = this.favorites.filter((item) => item !== id);
    },

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
