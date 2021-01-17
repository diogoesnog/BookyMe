<template>
  <div>
    <v-dialog v-model="addScheduleModal" max-width="500px">
      <v-card>
        <v-card-title>
          Adicionar Horário
        </v-card-title>
        <v-card-text>
          <AddSchedule v-for="(workday, index) in schedulesMissing" v-bind:workday="workday" :key="index"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text @click="addScheduleModal = !addScheduleModal">Cancelar</v-btn>
          <v-btn color="primary" text @click="changeSchedule">Alterar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
            <v-btn block outlined color="primary" v-if="schedulesMissing.length > 0" @click="addScheduleModal = !addScheduleModal">Adicionar</v-btn>
            <div :key="scheduleKey">
              <Schedule v-for="(schedule, index) in schedules" :key="index" v-bind="schedule" @deleteSchedule="deleteSchedule"/>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Services from '../../service/user.service';
import ScheduleModel from "@/models/Store/schedule";
import Service from "@/service/user.service";

export default {
  name: "EditStore",
  components: {
    Navbar: () => import('../../components/common/Navbar'),
    General: () => import('../../components/EditStore/General'),
    Schedule: () => import('../../components/EditStore/Schedule'),
    AddSchedule: () => import('../../components/RegisterStore/Schedule')
  },
  data() {
    return {
      id: this.$route.params.id,
      store: Object,
      categories: Array,
      schedules: Array,
      schedulesMissing: [],
      addScheduleModal: false,
      scheduleKey: 0
    }
  },

  mounted() {
    this.getStore();
    this.getCategories();
    this.getStoreSchedule();
  },

  methods: {
    getStore() {
      Services.getStoreById(this.id)
        .then(response => this.store = response.data["data"][0])
        .catch(err => console.log(err.data));
    },
    getStoreSchedule() {
      Services.getStoreSchedule(this.id)
          .then(response => {
            this.schedules = response.data["data"];
            this.scheduleKey++;
            this.findMissingSchedules();
          })
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

    // Schedule Actions
    deleteSchedule(id) {
      Services.deleteSchedule(id)
        .then(response => {
          console.log(response);
          this.getStoreSchedule();
        })
        .catch(err => console.log(err));
    },

    changeSchedule() {
      this.schedulesMissing.forEach(workday => {
        if(workday.openingHour && workday.closingHour) {
          Service.updateSchedule(this.store["_id"], workday)
              .then(( response ) => console.log(response) )
              .catch(err => console.log(err));
        }
      });
      this.addScheduleModal = false;
      this.getStoreSchedule();
    },

    findMissingSchedules() {
      this.schedulesMissing = [];
      let newsomething = new ScheduleModel();
      console.log(newsomething);
      let days = this.schedules.map( d => d.day );
      let keys = [ "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo" ];
      let missing = keys.filter(k => !days.includes(k));
      console.log(" ======== Missing =========");

      for(let i of missing) {
        this.schedulesMissing.push(new ScheduleModel(i));
      }
    }
  }
}
</script>

<style scoped>

</style>