<template>
  <div>
    <p style="display:none">{{this.catalogs[0].product}}</p>
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="catalogs" class="elevation-1" :search="search" :items-per-page="10">
      <template v-slot:item.action="{ item }" >
        <v-icon small @click="deleteCatalog(item)">
          mdi-delete
        </v-icon>
        <!--<v-btn @click="deleteCatalog(item)">Delete</v-btn>-->
      </template>
    </v-data-table >

  </div>

</template>

<script>
export default {
  name: "Items",
  props: {
    catalogs: Array
  },
  data() {
    return {
      search: '',
      refresh: 0,
      headers:[
        {text: 'Produto', align: 'left', value: 'product'},
        {text: 'Preço (€)', align: 'left',  value: 'price'},
        {text: 'Tipo', align: 'left',  value: 'abstract'},
        {text: 'Ação', align: 'center',  value: 'action'},
      ]
    }
  },
  methods: {
    deleteCatalog(item) {
      this.$emit('deleteCatalog', item);
    }
  }
}
</script>

<style scoped>

</style>