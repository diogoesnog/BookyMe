<template>
  <div>
    <v-form>
      <v-text-field label="Nome" v-model="store.name"></v-text-field>
      <v-text-field label="Contacto Telefónico" v-model="store.phone"></v-text-field>

      <v-text-field label="Morada" v-model="store.address.place"></v-text-field>
      <v-text-field label="Código Postal" v-model="store.address.zipcode"></v-text-field>
      <v-text-field label="Cidade" v-model="store.address.city"></v-text-field>
      <v-text-field label="País" v-model="store.address.country"></v-text-field>

      <v-textarea label="Descrição" outlined v-model="store.description" type="text"></v-textarea>

      <!-- TODO: Update Coordinates -->
      <v-btn block color="primary" @click="saveData">Save</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "General",
  props: {
    store: Object,
    categories: Array
  },
  methods: {
    saveData() {
      console.log("Update!");
      this.updateDescription();
      this.updateAddress();
      this.updatePhoneNumber();
    },

    updateDescription() {
      console.log("Calling Parent");
      this.$emit("updateDescription", this.store.description)
    },

    updateAddress() {
      this.$emit("updateAddress", this.store.address)
    },

    updatePhoneNumber() {
      this.$emit("updatePhone", this.store.phone)
    }
  }
}
</script>

<style scoped>

</style>