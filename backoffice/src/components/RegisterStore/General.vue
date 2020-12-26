<template>
  <div>
    <v-form>
      <v-text-field label="Name" type="text" v-model="store.name"></v-text-field>
      <v-text-field label="Category" type="text" v-model="store.category"></v-text-field>
      <v-text-field label="Descrição" type="text" v-model="store.description"></v-text-field>
      <v-text-field label="Endereço" type="text" v-model="store.address"></v-text-field>

      <v-btn @click="handleSubmit">Register</v-btn>
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
      store: new Store()
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