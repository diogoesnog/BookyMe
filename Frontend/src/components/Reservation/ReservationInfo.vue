<template>
  <div>
    <p class="titles" style="padding-top: 35px; padding-left: 30px">{{$t('bookingPage.bookingDetails')}}</p>
    <div class="row" style="margin: 20px;" v-if="services.length !== 0">
      <div class="col-12 infoDivService shadow">
        <q-icon name="book" style="padding-right: 10px"/>
        <div style="font-weight: bold; margin-right: 2px; font-size: 17px; padding-right: 2px">{{$t('confirmBooking.serviceType')}}</div>
        {{services}}
      </div>
    </div>
    <div class="grid" style="margin: 20px;">
      <div class="col-6 infoDiv shadow">
        <q-icon name="today" style="padding-right: 5px"/>
        <span style="font-weight: bold; font-size: 17px; padding-right: 5px">{{$t('confirmBooking.date')}}</span>
        {{date}}
      </div>
      <div class="col-6 infoDiv shadow">
        <q-icon name="schedule" style="padding-right: 5px"/>
        <span style="font-weight: bold; font-size: 17px; padding-right: 5px">{{$t('confirmBooking.time')}}</span>
        {{hour}}
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "ReservationInfo",

  props: {
    date: String,
    hour: String,
    services: String
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
  height: 35px;
  border-radius: 100px;
  font-size: 18px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
}

.infoDivService {
  background: white;
  padding: 10px;
  color: black;
  border-radius: 150px;
  font-size: 18px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shadow {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  column-gap: 10px;
}

</style>
