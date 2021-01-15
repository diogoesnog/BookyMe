<template>
  <div class="col-12" style="padding-left: 30px; padding-top: 18px;">
    <p class="titles">{{$t('storePage.photos')}}</p>
    <div class="wrapper">
      <div v-for="(photoUrl, index) in photos" :key="index" v-bind="photoUrl" class="item">
        <div @click="persistent = true" class="item" v-bind:style='{ backgroundImage: `url("${getImage(index)}")` }'/>
      </div>
      <div class="empty"></div>
    </div>
    <!--
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card style="color: #434343 !important; width: 100%; border-radius: 40px; text-align: center">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
    -->
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
      persistent: false
    }
  },

  methods: {
    getImage(index) {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[index].url}`;
    }
  }
}
</script>

<style scoped>

  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  .wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 0 30px;
  }

  .item {
    background-size: cover;
    height: 120px;
    width: 120px;
    border-radius: 200px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
