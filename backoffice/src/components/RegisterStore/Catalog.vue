<template>
  <div>
    <v-form>

      <v-text-field label="Product" type="text" v-model="catalog.name"></v-text-field>

      <v-text-field label="Price" type="text" v-model="catalog.description"></v-text-field>

      <v-text-field label="Type" type="text" v-model="catalog.place"></v-text-field>

      <v-btn block color="primary" @click="handleSubmit">Register</v-btn>
    </v-form>
  </div>
</template>


<script>
import Catalog from '../../models/Store/catalog'
import Services from '../../service/user.service'
export default {
  name: "General",

  data() {
    return {
      catalog: new Catalog()
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      Services.addCatalogItem(this.catalog)
        .then(response => {
          // this.store = new Store(...response.data);
          let newCatalog = response.data[ "data" ];
          console.log("New Catalog", newCatalog);
          this.$emit("catalogCreated", newCatalog);

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