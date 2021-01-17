<template>
  <div>
    <v-form>

      <v-text-field label="Produto" type="text" v-model="catalog.product"></v-text-field>

      <v-text-field label="Preço (€)" v-model="catalog.price"></v-text-field>

      <v-text-field label="Tipo" type="text" v-model="catalog.abstract"></v-text-field>

      <div v-if="submitButton">
        <v-btn block color="primary" @click="handleSubmit">Register</v-btn>
      </div>
    </v-form>
  </div>
</template>


<script>
import Services from '../../service/user.service'
export default {
  name: "Catalog",
  props: {
    catalog: Object,
    submitButton: Boolean
  },
  data() {
    return {
      id: this.$route.params.id
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
        }).catch(err => console.error(err));

    }
  }
}
</script>

<style scoped>

</style>