<template>
  <div>
    <v-card class="mx-auto">
      <v-img height="300" width="500" :src="getRandomPhoto()"></v-img>
      <v-card-title>
        {{ this.name }}
      </v-card-title>
      <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >
          <v-rating
              :value="this.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
          ></v-rating>

          <div class="grey--text ml-4">
            {{ this.rating}} / 5
          </div>
        </v-row>

        <div class="my-4 subtitle-1">
          {{  this.category }}
        </div>

        <div class="break-text">{{ this.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="teal accent-4" text @click="open">
          Open
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Store",
  props: {
    _id: String,
    name: String,
    category: String,
    description: String,
    rating: Number,
    base: String,
    photos: Array
  },
  methods: {
    open() {
      this.$router.push({
        name: "Store",
        params: {
          id: this._id
        }
      })
    },

    getRandomPhoto() {
      let numberOfPhotos = this.photos.length;
      if(numberOfPhotos > 0) {
        let index = Math.floor(Math.random() * numberOfPhotos);
        return `${this.base}${this.photos[index].url}`;
      }
    }
  }
}
</script>

<style scoped>
.break-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>