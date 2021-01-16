<template>
  <div class="col-12" style="padding-left: 30px; padding-top: 18px;">
    <p class="titles">{{$t('storePage.photos')}}</p>
    <div class="wrapper" v-bind:style="getStyles()">
      <div v-for="(photoUrl, index) in photos" :key="index" v-bind="photoUrl" class="item">
        <div 
          @click="persistent = true; 
          indexPhoto = index" 
          v-bind:style='{ backgroundImage: `url("${getImage(index)}")` }'
          class="item"
        />
      </div>
      <div class="empty"></div>
    </div>
    <q-dialog 
      v-model="persistent"
      persistent
      >
      <q-card class="cardStyle" v-bind:style='{ backgroundImage: `url("${getImage(this.indexPhoto)}")` }'>
        <q-card-section style="float: right" class="row items-center">
          <q-btn icon="cancel" class="iconClose" flat round dense v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {

  name: "StorePhotos",

  props: {
    photos: Array
  },

  data() {
    return {
      persistent: false,
      indexPhoto: 0
    }
  },

  methods: {
    getImage(index) {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[index].url}`;
    },
    getStyles() {
      let numberPhotos = this.photos.length;
      return {
      'grid-template-columns': `repeat(${numberPhotos+1}, auto)`
      }
    }
  }
}
</script>

<style scoped>
  
  .iconClose {
    font-size: 25px;
    color: white;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  }

  .cardStyle {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 40%;
    border-radius: 40px;
  }

  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  .wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    display: grid;
    grid-gap: 0 30px;
    padding: 10px;
    margin-left: -10px;
    margin-top: -5px;
  }

  .item {
    background-size: cover;
    height: 120px;
    width: 120px;
    border-radius: 200px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.20);
  }

  .empty {
    width: 10px;
  }

  .wrapper::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

</style>
