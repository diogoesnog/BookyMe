<template>
  <div style="padding-top: 25px; margin: 15px;">
    <div class="cityDiv" v-bind:style='{ width:`${getWidthNameStore()}`}'>
      {{this._id}}
    </div>
    <div v-for="(reservation, index) in this.booking" :key="index" v-bind="reservation">
      <div class="widgetReservation">
        <!-- Photo (Lado Esquerdo) e Info (Lado Direito) -->
        <div class="row">
          <!-- Photo -->
          <div class="col-4">
          </div>
          <div class="col-8">
              <span class="titleStore">
              </span>
          </div>
        </div>
        asas
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ReservationsList",

  props: {
    _id: String,
    booking: Array
  },

  data() {
    return {
    }
  },

  methods: {
    getWidthNameStore() {
      if(this._id.length > 0 & this._id.length <= 3) return "15%";
      else if(this._id.length >= 4 & this._id.length <= 6) return "30%";
      else if(this._id.length >= 7 & this._id.length <= 9) return "35%";
      else if(this._id.length >= 10 & this._id.length <= 12) return "45%";
      else if(this._id.length >= 13 & this._id.length <= 15) return "55%";
      else if(this._id.length >= 16 & this._id.length <= 18) return "65%";
      else if(this._id.length >= 19 & this._id.length <= 21) return "75%";
      else return "80%"    
    }
  }
}
</script>

<style scoped>

  .cityDiv {
    background: linear-gradient(#13c1e0, #2897e3);
    color: white;
    height: 40px;
    border-radius: 100px;
    font-size: 20px;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .widgetReservation {
    height: 120px;
    background-color: white;
    margin-top: 25px;
    border-radius: 40px;
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
  }

  .shadow {
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    border-radius: 28px;
  }

  .titleStore {
    text-overflow: ellipsis; 
    font-size: 20px; 
    font-weight: 350; 
    display: inline-block; 
    width: 200px; 
    white-space: nowrap; 
    overflow: hidden !important;
  }

</style>
