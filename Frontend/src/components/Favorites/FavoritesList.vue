<template>
  <div style="padding-top: 25px; margin: 15px;">
    <q-img
      :src="getImage()"
      class="roundBorder"
    >
      <q-btn class="clearIcon" round @click="deleteFavorite" icon="clear" style="float: right" size="md"></q-btn>
      <div class="cardBackground absolute-bottom text-center" style="height:70px">
        <div class="row">
          <div class="col-9" style="text-align: left;">
            <p>
              <span style="font-weight: 670; font-size: 22px;">
                {{ this.name }}              
              </span>
              <br/>
              <span style="font-weight: 300; font-size: 18px;">
                {{ this.address.city }}
              </span>
            </p>
          </div>
          <div class="col-3" style="text-align: right;">
            {{this.rating}}
            <q-icon roudned class="fas fa-star" style="font-size: 1.4em; margin-left:5px" />
          </div>
        </div>
      </div>
      </q-img>
  </div>
</template>

<script>
import Service from '../../services/user.service'
export default {

  name: "FavoritesList",
  props: {
    _id: String,
    name: String,
    rating: Number,
    photos: Array,
    address: Object
  },

  data() {
    return {
      favorites: Array
    }
  },

  methods: {
    getImage() {
      let numberPhotos = this.photos.length;
      if(numberPhotos > 0) {
        let i = Math.floor(Math.random() * (numberPhotos + 1));
        return `http://localhost:5100${this.photos[0].url}`
      }
      return "";
    },

    deleteFavorite() {
      Service.deleteFavorite(this._id)
        .then(response => {
          let data = response.data[ "data" ];
          // TODO: emitir um evento para o parent (a tua view) com o ID do favorito eliminado
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>
  
  .cardBackground {
    background-color: rgba(40,151,227, 0.9);
  }

  .clearIcon {
    font-size: 0.85em!important;
    margin: 15px;
    background-color: white;
  }

  .roundBorder {
    border-radius: 25px;
  }

</style>
