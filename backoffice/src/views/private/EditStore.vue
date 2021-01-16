<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
        <v-tabs>
          <v-tab>General</v-tab>
          <v-tab>Scheduling</v-tab>

          <v-tab-item>
            <h1 style="padding: 15px">Edit Store information</h1>
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
          </v-tab-item>

          <v-tab-item>
            <h1 style="padding: 15px">Edit Schedule</h1>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Services from '../../service/user.service'
export default {
  name: "EditStore",
  components: {
    Navbar: () => import('../../components/common/Navbar')
  },
  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      categories: Array
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
        })
        .catch(err => console.log(err.data));
    },

    getCategories() {
      Services.getCategories()
          .then(response => {
            this.categories = response.data["data"];
          })
          .catch(err => console.log(err.data));
    },

    saveData() {
      this.updateDescription();
      this.updateAddress();
      this.updatePhoneNumber();
    },

    updateAddress(data) {
      Services.updateAddress(this.id, data)
          .then( response => {
            console.log(response);
          })
          .catch( err => {
            console.log(err);
          });
    },
    updatePhoneNumber(data) {
      Services.updatePhone(this.id, data)
          .then( response => {
            console.log(response);
          })
          .catch( err => {
            console.log(err);
          });
    },
    updateDescription(data) {
      Services.updateDescription(this.id, data)
          .then( response => {
            // this.store.description = this.response.data[ "data" ];
            console.log(response);
          })
          .catch( err => {
            console.log(err);
          });
    },

  }
}
</script>

<style scoped>

</style>