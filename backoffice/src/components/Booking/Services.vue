<template>
  <div class="margin">

    <!-- Reschedule -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Editar Reserva
        </v-card-title>
        <v-card-text>
          <v-text-field :value="editing.bookingDate | moment('LLL')" disabled label="Reservado A"/>

          <v-text-field :value="editing.serviceDate | moment('LLL')" disabled label="Reservado Para"/>

          <v-select
              :items="slots"
              v-model="selectedSlot"
              item-text="date"
              filled
              label="Filled style"
              return-object
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="dismissDialog">Cancelar</v-btn>
          <v-btn color="primary" text @click="reschedule">Alterar</v-btn>
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
          <v-data-table
              :items-per-page="5"
              :headers="serviceHeaders"
              :items="previewItem"
              item-key="product"
              sort-by="product"
              group-by="abstract"
              show-group-by></v-data-table>
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
        <div v-if="item.canceled">
          <p>Cancelado</p>
        </div>
        <div v-else>
          {{ item.wasRescheduled ? 'Re-agendado' : 'Na Data Original' }}
        </div>
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
    bookings: Array,
    slots: Array
  },
  mounted() {
    this.getStoreSlots();
  },
  data() {
    return {
      editing: {},
      selectedSlot: {},
      search: '',
      preview: false,
      previewItem: [],
      dialog: false,
      serviceHeaders: [{
        text: "Produto",
        align: 'start',
        value: 'product',
        groupable: false
      }, {
        text: "Preço",
        align: 'center',
        value: 'price',
        groupable: false
      }],
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
      this.editing = Object;
    },

    cancelService(service) {
      console.log(service);
      this.$emit("cancel", service._id)
    },
    editService(service) {
      console.log(service);
      this.dialog = true;
      this.editing = service;
    },
    previewService(item) {
      this.preview = true;
      this.previewItem = item.service;
    },
    reschedule() {
      let reschedule = {
        oldSlotId: this.editing._id,
        slotId: this.selectedSlot._id
      }
      this.$emit("reschedule", reschedule);
      this.dismissDialog();
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 15px;
}
</style>