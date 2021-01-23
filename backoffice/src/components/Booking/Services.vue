<template>
  <div class="margin">

    <!-- Reschedule -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="dismissDialog">Cancelar</v-btn>
          <v-btn color="primary" text>Alterar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="preview" max-width="500px">
      <v-card>
        <v-card-title>
          Serviços Requisitados
          <!--https://codepen.io/pen/?&editors=101-->
        </v-card-title>
        <v-card-text>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="dismissDialog">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="bookings" :search="search" :items-per-page="10">
      <template v-slot:item.canceled="{ item }">
        {{ item.canceled ? 'Alterado' : 'Não Alterado' }}
      </template>
      <template v-slot:item.serviceDate="{ item }">
        {{ item.serviceDate | moment("LLL")}}
      </template>
      <template v-slot:item.action="{ item }" >

        <v-icon small color="primary" v-if="item.service.length > 0" @click="previewService(item)">
          mdi-eye-settings
        </v-icon>

        <v-icon small @click="editService(item)" color="orange">
          mdi-pencil
        </v-icon>

        <v-icon small @click="cancelService(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Services",
  props: {
    bookings: Array
  },
  data() {
    return {
      search: '',
      preview: false,
      previewItem: Object,
      dialog: false,
      headers: [{
        text: 'Utilizador',
        align: 'start',
        sortable: false,
        value: 'userId',
      }, {
        text: 'Data de Serviço',
        sortable: true,
        value: 'serviceDate'
      }, {
        text: "Estado",
        sortable: true,
        value: "canceled"
      }, {
          text: 'Produtos',
          sortable: true,
          value: 'service.length',
      }, {
        text: 'Ação',
        align: 'center',
        value: 'action'
      }]
    }
  },
  methods: {
    dismissDialog() {
      this.dialog = false;
      this.preview = false;
      this.previewItem = Object;
    },

    cancelService(service) {
      console.log(service);
    },
    editService(service) {
      console.log(service);
    },
    previewService(service) {
      this.preview = true;
      this.previewItem = service;
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 15px;
}
</style>