<template>
  <!-- Scrolling Div Photos -->
  <div class="col-12">
    <p class="titles">{{$t('storePage.photos')}}</p>
    <div class="wrapper">
      <div v-for="(photoUrl, index) in photos" :key="index" v-bind="photoUrl" class="item">
        <div class="item" v-bind:style='{ backgroundImage: `url("${getImage(index)}")` }'/>
      </div>
      <div class="empty"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: "StorePhotos",

  props: {
    photos: Array
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
