<template>
  <div>
    <v-form>
      <v-text-field label="Name" v-model="store.name"></v-text-field>
      <v-text-field label="Phone Number" v-model="store.phone"></v-text-field>

      <v-text-field label="Place" v-model="store.address.place"></v-text-field>
      <v-text-field label="Zip Code" v-model="store.address.zipcode"></v-text-field>
      <v-text-field label="City" v-model="store.address.city"></v-text-field>
      <v-text-field label="Country" v-model="store.address.country"></v-text-field>

      <v-textarea phone="Description" outlined v-model="store.description" type="text"></v-textarea>

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
      this.$emit("updatePhoneNumber", this.store.phone)
    }
  }
}
</script>

<style scoped>

</style>