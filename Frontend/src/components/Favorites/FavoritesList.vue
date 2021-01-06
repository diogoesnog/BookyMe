<template>
  <div style="padding-top: 25px; margin: 15px;">
    <q-img
      :src="getImage()"
      class="roundBorder"
    >
     <q-btn @click="deleteFavorite" icon="fas fa-trash" style="margin-left:230px" color="red"></q-btn>
      <div class="absolute-bottom text-subtitle1 text-center backgroundColor" style="height:95px">
        <div class="row">
          <div class="col-9">
            <p style="font-size:1.4em">{{ this.name }}</p>
            <p>{{ this.address.city }}</p>
          </div>
          <div class="col-3" style="margin-top:20px;font-size:1.2em">
            {{this.rating}}
            <q-icon class="fas fa-star" style="font-size: 1.4em; margin-left:5px" />
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

  .roundBorder {
    border-radius: 25px;
  }

</style>
