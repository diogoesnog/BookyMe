<template>
  <div class="col-12">
    <p class="titles" style="padding-top: 35px; padding-left: 30px">{{$t('bookingPage.bookingDetails')}}</p>
    {{serviceDate}}

  </div>
</template>

<script>
export default {
name: "ReservationInfo",
  props: {
    slotId: String,
    serviceId: String,
    serviceDate: String
  }
}
</script>

<style scoped>

.titles {
  color: #434343;
  font-weight: 700;
  font-size: 30px;
}

</style>
