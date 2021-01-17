<template>
  <div>
    <v-row no-gutters>
      <v-col cols="2">
        <Navbar/>
      </v-col>
      <v-col cols="10">
        <v-tabs>
          <v-tab>Geral</v-tab>
          <v-tab>Horário</v-tab>

          <v-tab-item>
            <h1 style="padding: 15px">Editar Informações Gerais</h1>

            <General v-bind:store="store" @updateDescription="updateDescription" @updateAddress="updateAddress" @updatePhone="updatePhone"/>
          </v-tab-item>

          <v-tab-item>
            <h1 style="padding: 15px">Editar Horário</h1>

            <Schedule v-for="(schedule, index) in store.schedule" :key="index" v-bind="schedule"/>

            
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
    Navbar: () => import('../../components/common/Navbar'),
    General: () => import('../../components/EditStore/General'),
    Schedule: () => import('../../components/EditStore/Schedule')
  },
  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      categories: Array
    }
  },

  mounted() {
    this.getStore();
    this.getCategories
  },

  methods: {
    getStore() {
      Services.getStoreById(this.id)
        .then(response => this.store = response.data["data"][0])
        .catch(err => console.log(err.data));
    },

    getCategories() {
      Services.getCategories()
          .then(response => this.categories = response.data["data"])
          .catch(err => console.log(err.data));
    },

    updateAddress(data) {
      Services.updateAddress(this.id, data)
          .then( response => this.store.phone = response.data[ "data" ].address)
          .catch( err => console.log(err));
    },
    updatePhone(data) {
      Services.updatePhone(this.id, data)
          .then( response =>  this.store.phone = response.data[ "data" ].phone)
          .catch( err => console.log(err));
    },
    updateDescription(data) {
      Services.updateDescription(this.id, data)
          .then( response => this.store.description = response.data[ "data" ].description)
          .catch( err => console.log(err));
    },

  }
}
</script>

<style scoped>

</style>