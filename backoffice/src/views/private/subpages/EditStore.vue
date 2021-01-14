<template>
  <div>
    <v-tabs>
      <v-tab>General</v-tab>
      <v-tab>Scheduling</v-tab>
    </v-tabs>

    <h1>Edit Store information</h1>
    <v-form>
      <v-text-field label="Phone Number" v-model="store.phone"></v-text-field>

      <v-text-field label="Place" v-model="address.place"></v-text-field>
      <v-text-field label="Zip Code" v-model="address.zipcode"></v-text-field>
      <v-text-field label="City" v-model="address.city"></v-text-field>
      <v-text-field label="Country" v-model="address.country"></v-text-field>

      <v-textarea phone="Description" outlined v-model="store.description" type="text"></v-textarea>

      <!-- TODO: Update Coordinates -->
      <v-btn block color="primary" @click="saveData">Save</v-btn>
    </v-form>
  </div>
</template>

<script>
import Services from '../../../service/user.service';
export default {
  name: "EditStore",

  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      address: Object,
    }
  },

  mounted() {
    this.fetchStore();
  },

  methods: {
    fetchStore() {
      Services.getStoreById(this.id)
        .then(response => {
          this.store = response.data["data"][0];
          this.address = this.store.address;
        })
        .catch(err => console.log(err.data));
    },

    saveData() {
      this.updateDescription();
      this.updateAddress();
      this.updatePhoneNumber();
    },

    updateAddress() {
      Services.updateAddress(this.id, this.address)
          .then( response => {
            console.log(response);
          })
          .catch( err => {
            console.log(err);
          });
    },
    updatePhoneNumber() {
      Services.updatePhone(this.id, this.store.phone)
          .then( response => {
            console.log(response);
          })
          .catch( err => {
            console.log(err);
          });
    },
    updateDescription() {
      Services.updateDescription(this.id, this.store.description)
          .then( response => {
            console.log(response);
          })
          .catch( err => {
            console.log(err);
      });
    }
  }
}
</script>

<style scoped>

</style>