<template>
  <div>
    <v-form>

      <v-text-field label="Product" type="text" v-model="catalog.product"></v-text-field>

      <v-text-field label="Price (€)" v-model="catalog.price"></v-text-field>

      <v-text-field label="Type" type="text" v-model="catalog.abstract"></v-text-field>

      <v-btn block color="primary" @click="handleSubmit">Register</v-btn>
    </v-form>
  </div>
</template>


<script>
import Catalog from '../../models/Store/catalog'
import Services from '../../service/user.service'
export default {
  name: "Catalog",

  data() {
    return {
      id: this.$route.params.id,
      catalog: new Catalog()
    }
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      

      Services.addCatalogItem(this.id, this.catalog)
        .then(response => {
          let newCatalog = response.data[ "data" ];
          console.log("New Catalog", newCatalog);
          this.$emit("catalogCreated", newCatalog);

        }).catch(err => {
          console.error(err);
          // TODO: emit error
        }).finally( () => {
          console.log("Finished");
          this.$router.go(-1)
        });

    }
  }
}
</script>

<style scoped>

</style>