<template>
  <div style="padding-top: 25px; margin: 15px;">
    <div class="oval">
      <p> Felgueiras </p>
    </div>
    <br>
    <div class="information">
      <div class="row">
        <div class="col-4">
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            style="width: 100%; height:100%"
          />
        </div>
        <div class="col-8" style="margin-top:35px; padding:10px">
          <p style="font-weight: 670; font-size: 22px; line-height:0%;"> Ginásio Go Fitness </p>
          <p style="font-weight: 300; font-size: 18px; line-height:50%;"> Sessão CrossFit </p>
          <p style="font-weight: 670; font-size: 22px; line-height:0%; margin-top:50px"> 13 Nov - 17:00 </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationsList",

  props: {
    title: String,
    count: Number
  }
}
</script>

<style scoped>
.oval {
  height: 50px;
  width: 120px;
  background: linear-gradient(#13c1e0, #2897e3);
  margin-left: 15px;
  border-radius: 28px;
}

.information {
  height: 160px;
  width: 330px;
  background-color:white;
  margin-left: 5px;
  border-radius: 28px;
}
</style>
