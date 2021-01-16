<template>
  <div>
    <v-form>

      <v-text-field label="Name" type="text" v-model="store.name"></v-text-field>
      <!--<v-text-field label="Category" type="text" v-model="store.category"></v-text-field>-->
      <v-select v-model="store.category" :items="categories" label="Categoria"></v-select>

      <v-text-field label="Descrição" type="text" v-model="store.description"></v-text-field>

      <v-text-field label="Place" type="text" v-model="store.place"></v-text-field>
      <v-text-field label="Zip-Code" type="text" v-model="store.zipcode"></v-text-field>
      <v-text-field label="City" type="text" v-model="store.city"></v-text-field>
      <v-text-field label="Country" type="text" v-model="store.country"></v-text-field>

      <v-btn block color="primary" @click="handleSubmit">Register</v-btn>
    </v-form>
  </div>
</template>

<script>
import Store from '../../models/Store/store'
import Services from '../../service/user.service'
export default {
  name: "General",

  data() {
    return {
      store: new Store(),
      categories: ["Restaurante"]
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      Services.registerStore(this.store)
        .then(response => {
          // this.store = new Store(...response.data);
          let newStore = response.data[ "data" ];
          console.log("New Store", newStore);
          this.$emit("storeCreated", newStore);

        }).catch(err => {
          console.error(err);
          // TODO: emit error
        }).finally( () => {
          console.log("Finished");
        });

    }
  }
}
</script>

<style scoped>

</style>