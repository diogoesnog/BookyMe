<template>
  <div style="color: #434343;" class="centerDiv">
    <div class="row" style="margin: 20px; padding-top:10px;">
      <div class="col-10" style="">
        <p>
          <span style="font-weight: 670; font-size: 45px;">
            {{$t('favoritesPage.title')}}
          </span>
          <br/>
          <span style="font-weight: 300; font-size: 20px;">
            {{$t('favoritesPage.description')}}
          </span>
        </p>
      </div>
      <div class="col-2" style="padding-left: 15px; display: flex; align-items: center; justify-content: center;">
        <q-btn
          round
          class="filterAvatar"
          size="md"
          icon="fas fa-filter"
        />
      </div>
    </div>
    <FavoritesList v-for="(favorite, index) in favorites" :key="index" v-bind="favorite" @deleteFavorite="deleteFavorite"/>
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
    filterButtonTaped() {
      window.alert("Filter Pressed");
    },
    deleteFavorite(id) {
      Service.deleteFavorite(id)
        .then(response => {
          console.log(response);
          console.log("Removing Favorite");
          this.favorites = this.favorites.filter(f => f._id !== id);

        }).catch(err => {
          console.log(err);
        })
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

  .filterAvatar {
    font-size: 1em!important;
    color: white;
    background-color: #434343;
  }

  .centerDiv {
    padding: 15px;
    margin-top: 40px;
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
