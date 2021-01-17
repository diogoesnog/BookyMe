<template>
  <div class="col-12">
    <p class="titles" style="padding-top: 35px; padding-left: 30px">{{$t('bookingPage.bookingDetails')}}</p>
    <div class="row" :key="key">
      <div class="col-10 infoDiv shadow" v-if="service" style="margin-left: 25px; margin-right: 25px; margin-bottom: 20px">
        <q-icon name="book" left/>
        <div style="font-weight: bold; margin-right: 2px; font-size: 17px; padding-right: 2px">Tipo de Serviço</div>
        {{service["product"]}}
      </div>

      <div class="col-5 infoDiv shadow" style="margin-left: 25px; margin-right: 20px">
        <q-icon name="today" left/>
        <div style="font-weight: bold; margin-right: 2px; font-size: 17px; padding-right: 2px">Data</div>
        {{date}}
      </div>

      <div class="col-5 infoDiv shadow">
        <q-icon name="schedule" left/>
        <div style="font-weight: bold; margin-right: 2px; font-size: 17px; padding-right: 2px">Hora</div>
        {{hour}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "ReservationInfo",

  data() {
    return {
      key: 0,
      date: '',
      hour: ''
    }
  },

  props: {
    slotId: String,
    serviceId: String,
    serviceDate: String,
    service: Object
  },

  mounted() {
    // TODO: Um possível erro de reatividade e props.
    console.log(this.$props.serviceDate);
    let dateTemp = new Date(this.serviceDate);
    console.log(dateTemp);
    this.date = dateTemp.toLocaleDateString('pt-pt', {year: '2-digit', day: '2-digit', month: '2-digit'})
    this.hour = dateTemp.toLocaleTimeString('pt-pt',{hour: '2-digit', minute: '2-digit'})
  },

  methods: {
  }
}
</script>

<style scoped>

.titles {
  color: #434343;
  font-weight: 700;
  font-size: 30px;
}

.infoDiv {
  background: white;
  color: black;
  height: 30px;
  border-radius: 100px;
  font-size: 18px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shadow {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 28px;
}

</style>
