<template>
  <div>
    <div class="divTop1" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'>
    </div>
    <div>
      <div class="divTop2">
        <div class="row" style="margin: 20px;">
          <div class="col-5" style="display: flex; align-items: center;">
            <q-btn to="../reservations" padding="6px 6px" class="button shadow" round icon="fas fa-angle-left"/>
          </div>
          <div class="col-5" style="margin-left: auto; display: flex; justify-content: flex-end;">
          </div>
        </div>
        <div class="infoName">
            <span style="font-weight: 670; font-size: 40px;">
              {{ getCutName(this.name) }}
            </span>
          <br/>
          <span style="font-weight: 300; font-size: 20px;">
            {{ $t('bookingPage.confirmBooking')}}
          </span>
        </div>
        <div class="infoExtra">
          <div class="row rowStyle">
            <div class="col-8" style="text-align: left; margin-top: -8px; display: inline-grid; line-height: 25px;">
                <span style="text-overflow: ellipsis; font-size: 20px; font-weight: 350; display: inline-block; width: 200px; white-space: nowrap; overflow: hidden !important;">
                  {{ this.category }}
                </span>
              <span style="font-size: 19px; font-weight: 650; display: inline-block; width:160px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis;">
                  {{ this.address.city }}
                </span>
            </div>
            <div class="col-4">
              <div class="divRating shadow">
                <p style="position: relative; top: 51%; left: 47%; transform: translate(-50%, -50%); text-indent: 3px;">
                    <span style="font-weight: 670; font-size: 19px; display: inline-block; vertical-align: middle;">
                      {{ roundRating() }}<span style="font-weight: 200; font-size: 19px;">/5</span>
                    </span>
                  <i class="fa fa-star" style="font-size:15px; padding-top: 5px;"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ReservationBanner",

  data() {
    return {
      storeID: this.$route.params.id
    }
  },

  props: {
    name: String,
    category: String,
    address: Object,
    rating: Number,
    photos: Array,
  },

  mounted() {
    console.log("Mounted: View has been rendered");
  },

  methods: {
    getImage(index) {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[index].url}`;
    },
    roundRating() {
      return Math.round(this.rating*10)/10;
    },
    getCutName: function(string) {
      if(string.substring(0,15) === string) return string;
      else return string.substring(0, 15) + "...";
    }
  }
}
</script>

<style scoped>

  .divTop1{
    position: absolute;
    width: 100%;
    padding: 125px;
    background-size: cover;
    background-position: center top;
  }

  .divTop2{
    padding-top: 25px;
    height: 250px;
    position: relative;
    background-image: linear-gradient(#1ba0d4, #1b9fd4c2, #168ab80e);
  }

  .infoName {
    position: relative;
    bottom: 15px;
    color: white;
    text-align: center;
  }

  .infoExtra {
    position: absolute;
    left: 50%;
    padding-top: 15%;
  }

  .divRating {
    text-align: center;
    height: 35px;
    border-radius: 20px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .shadow {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 28px;
  }

  .rowStyle {
    position: absolute;
    background-color: white;
    border-radius: 100px;
    width: 295px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    flex-wrap: nowrap !important;
    padding: 25px;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

  .button {
    background-color: white;
    color: #1b9fd4;
  }

  .buttonFavFalse {
    background-color: white;
    color: #1b9fd4;
  }

  .buttonFavTrue {
    background-color: white;
    color: #e9695c;
  }

</style>
