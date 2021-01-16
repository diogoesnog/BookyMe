<template>
  <div class="margin">
    <v-btn outlined block color="primary">Novo Slot</v-btn>
    <v-data-table :headers="headers" :items="slots" :items-per-page="15">
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Slots",
  props: {
    slots: Array
  },
  data() {
    return {
      headers: [{
        text: 'ID',
        align: 'start',
        sortable: false,
        value: '_id',
      }, {
        text: "Capacidade",
        sortable: true,
        value: "capacity"
      }, {
        text: "Data",
        sortable: true,
        value: "date"
      }]
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 15px;
}
</style>