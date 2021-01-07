<template>
  <div style="padding-top: 25px; margin: 15px;">
    <q-img
      style="height: 200px"
      :src="getImage()"
      class="roundBorder shadow"
    >
      <q-btn class="clearIcon" round @click="deleteFavorite" icon="clear" style="float: right" size="md"></q-btn>
      <div class="cardBackground absolute-bottom text-center" style="height:70px">
        <div class="row">
          <div class="col-9" style="text-align: left; padding-top: 8px;">
            <p style="font-weight: 670;
    font-size: 22px;
    /* line-height: 0%; */
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;">
              {{ this.name }}     
              <br/>         
              {{ this.address.city }}
            </p>
          </div>
          <div class="col-3" style="text-align: right;">
            <div class="divRating">
              <p>
                <span style="font-weight: 670; font-size: 18px;">
                  {{this.rating}}
                </span>
                <span style="font-weight: 300; font-size: 18px;">
                /5
                </span>
              </p>  
            </div>
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
  
  .divRating {
    text-align: center;
    height: 30px;
    border-radius: 20px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

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

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

</style>
