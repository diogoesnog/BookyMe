<template>
  <v-container fluid style="height: 100vh;" class="home">
    <div class="center-content text-center">
      <img src="../../assets/Logo.png" class="logo-header"/>
      <div class="content-margins">
        <StoreForm v-if="!storeRegistered" @storeCreated="storeCreated"/>
        <div v-else>
          <Schedule v-for="(workday, index) in workdays" :key="index" :workday="workday"></Schedule>
          <v-btn block color="primary" @click="createSchedule">Adicionar Horário</v-btn>
        </div>
      </div>

      <div class="content-margins" style="margin-bottom: 0;">
        <v-progress-linear :value="progress"></v-progress-linear>
      </div>
    </div>
  </v-container>
</template>
<script>
import StoreForm from '../../components/RegisterStore/General';
import Schedule from '../../components/RegisterStore/Schedule';
import ScheduleModal from '../../models/Store/schedule';
import Service from '../../service/user.service';

export default {
  name: "RegisterStore",
  components: {
    StoreForm, Schedule
  },
  data() {
    return {
      storeRegistered: false,
      store: Object,
      progress: 0,

      // Workdays
      workdays: [
        new ScheduleModal("Segunda-feira"),
        new ScheduleModal("Terça-feira"),
        new ScheduleModal("Quarta-feira"),
        new ScheduleModal("Quinta-feira"),
        new ScheduleModal("Sexta-feira"),
        new ScheduleModal("Sábado"),
        new ScheduleModal("Domingo")
      ]
    }
  },
  mounted() { },
  methods: {
    storeCreated(store) {
      this.store = store;
      this.storeRegistered = true;
      this.progress = 50;
    },

    createSchedule() {
      this.workdays.forEach(workday => {
        if(workday.openingHour && workday.closingHour) {
          Service.updateSchedule(this.store["_id"], workday)
            .then(result => {
              console.log(result);
              this.storeCreated = 100;
              this.$router.push("/home");
            }).catch(err => {
              console.log(err)
          })
        }
      });
    }
  }
}
</script> 

<style scoped>

.logo-header {
  width: 250px
}

.home {
  background-color: #434343;
}

.content-margins {
  padding: 50px;
}
.center-content {
  border-radius: 25px;
  background-color: #fff;
  position: absolute;
  height: 80%;
  width: 80%;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  overflow: auto;
}
</style>