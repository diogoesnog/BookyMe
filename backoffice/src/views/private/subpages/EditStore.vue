<template>
  <div>
    <v-tabs>
      <v-tab>General</v-tab>
      <v-tab>Scheduling</v-tab>

      <v-tab-item>
        <h1 style="padding: 15px">Edit Store information</h1>
        <v-form>
          <v-text-field label="Phone Number" v-model="store.phone"></v-text-field>

          <v-text-field label="Place" v-model="store.address.place"></v-text-field>
          <v-text-field label="Zip Code" v-model="store.address.zipcode"></v-text-field>
          <v-text-field label="City" v-model="store.address.city"></v-text-field>
          <v-text-field label="Country" v-model="store.address.country"></v-text-field>

          <v-textarea phone="Description" outlined v-model="store.description" type="text"></v-textarea>

          <!-- TODO: Update Coordinates -->
          <v-btn block color="primary" @click="saveData">Save</v-btn>
        </v-form>
      </v-tab-item>

      <v-tab-item>
        <h1 style="padding: 15px">Edit Schedule</h1>
      </v-tab-item>
    </v-tabs>


  </div>
</template>

<script>
export default {
  name: "EditStore",
  props: {
    store: Object
  },
  data() {
    return {
      id: this.$route.params.id
      // store: Object,
    }
  },

  mounted() {
    // this.fetchStore();
  },

  methods: {
    /*fetchStore() {
      Services.getStoreById(this.id)
        .then(response => {
          this.store = response.data["data"][0];
          this.address = this.store.address;
        })
        .catch(err => console.log(err.data));*/
    // },

    saveData() {
      this.updateDescription();
      this.updateAddress();
      this.updatePhoneNumber();
    },

    updateAddress() {
      this.$emit('updateAddress', this.store.address);
    },
    updatePhoneNumber() {
      this.$emit('updatePhoneNumber', this.store.phone);
    },
    updateDescription() {
      this.$emit('updateDescription', this.store.description);
    }
  }
}
</script>

<style scoped>

</style>