<template>
  <div>
    <v-row no-gutters>
        <v-col cols="2">
          <Navbar/>
        </v-col>

        <v-col cols="10">
          <h1>Adicionar Fotos</h1>
          <div style="padding: 15px">
            <v-file-input v-model="file" prepend-icon="mdi-camera" outlined show-size accept="image/png, image/jpeg, image/jpg" label="New Photo"></v-file-input>
            <v-btn color="primary" outlined block @click="uploadPhoto">Upload</v-btn>
            <div v-if="store.photos.length > 0">
              <PhotoGrid v-bind:photos="store.photos" :base="base" @deletePhoto="deletePhoto"/>
            </div>
            <div v-else>
              <p>Não Carregou Fotos da Loja <b>{{ this.store.name }}</b></p>
            </div>
          </div>

        </v-col>
    </v-row>
  </div>
</template>

<script>
import Service from "@/service/user.service";

export default {
  name: "Photos",
  components: {
    Navbar: () => import('../../components/common/Navbar'),
    PhotoGrid: () => import('@/components/PhotoGrid')
  },

  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      base: String,
      file: null,
      update: 0
    }
  },
  mounted() {
    this.getStore();
  },
  methods: {
    getStore() {
      Service.getStoreById(this.id)
          .then(response => {
            this.store = response.data[ "data" ][0];
            this.base = response.data.base;
          }).catch(err => {
            console.log(err);
          })
    },

    uploadPhoto(e) {
      e.preventDefault();
      Service.uploadPhoto(this.id, this.file)
          .then(response => this.store.photos = response.data[ "data" ].data.photos)
          .catch(err => console.log(err));
    },

    deletePhoto(file) {
      Service.deletePhoto(this.id, file)
          .then(response => this.store.photos = response.data[ "data" ].data.photos)
          .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>

</style>