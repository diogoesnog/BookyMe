<template>
  <div class="margin">
    <v-btn outlined block color="primary" @click="dialog = !dialog">Novo Slot</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Novo Slot</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field label="Capacidade" v-model="slot.capacity" class="mt-0 pt-0" type="number"></v-text-field>
            <v-text-field label="Ano" v-model="slot.year" class="mt-0 pt-0" type="number"></v-text-field>
            <v-text-field label="Mês" v-model="slot.month" class="mt-0 pt-0" type="number"></v-text-field>
            <v-text-field label="Dia" v-model="slot.day" class="mt-0 pt-0" type="number"></v-text-field>
            <v-text-field label="Horas" v-model="slot.hour" class="mt-0 pt-0" type="number" ></v-text-field>
            <v-text-field label="Minutos" v-model="slot.minutes" class="mt-0 pt-0" type="number"></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="create">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-data-table :headers="headers" :items="slots" :items-per-page="15">
      <template v-slot:item.date="{item}">
        {{ item.date | moment("LLL")}}
      </template>
      <template v-slot:item.action="{ item }" >
        <v-icon small @click="deleteSlot(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Slot from '../../models/Store/slot'
export default {
  name: "Slots",
  props: {
    slots: Array,
  },
  data() {
    return {
      dialog: false,
      slot: new Slot(),
      headers: [{
        text: 'ID',
        align: 'start',
        sortable: false,
        value: '_id',
      }, {
        text: "Data",
        sortable: true,
        value: "date"
      }, {
        text: "Capacidade Máxima",
        sortable: true,
        value: "max_capacity"
      }, {
        text: "Lotação",
        sortable: true,
        value: "current_capacity"
      },  {
        text: 'Ação',
        align: 'center',
        value: 'action'
      }]
    }
  },
  /*watch: {
    slots: function (newSlots, oldSlots) {
      console.log('Prop changed: ', newSlots, ' | was: ', oldSlots)
    }
  },*/
  methods: {
    cancel() {
      this.slot = new Slot();
      this.dialog = false;
    },

    create() {
      this.$emit('newSlot', this.slot.override());
      this.slot = new Slot();
      this.dialog = false;
    },

    deleteSlot(item) {
      console.log("Child Requested Slot Removal");
      console.log(item);
      this.$emit('deleteSlot', item);
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 15px;
}
</style>