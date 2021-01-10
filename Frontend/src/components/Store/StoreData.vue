<template>
  <div>
    <!-- Div Cima (Photo + Info Base) -->
    <div class="divTop1" v-bind:style='{ backgroundImage: `url("${getImage()}")` }'>
      <div class="divTop2">
        <div class="infoName">
          <span style="font-weight: 670; font-size: 40px;">
            {{ getCutName(this.name) }}
          </span>
          <br/>
          <span style="font-weight: 300; font-size: 20px;">
            X Reservas
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
                    {{roundRating(this.rating)}}<span style="font-weight: 200; font-size: 19px;">/5</span>
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
  name: "StoreData",

  props: {
    _id: String,
    name: String,
    category: String,
    description: String,
    address: Object,
    phone: Number,
    rating: Number,
    photos: Array,
    schedule: Array,
    urlMainPhoto: String
  },

  methods: {
    getImage() {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[0].url}`;
    },
    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },
    getCutName: function(string) {
      if(string.substring(0,15) == string) return string;
      else return string.substring(0, 15) + "...";
    }
  }
}
</script>

<style scoped>

  .divTop1{
    position: fixed;
    width: 100%;
    height: 35%;
    top: 0;
    border-bottom-left-radius: 60%;
    border-bottom-right-radius: 60%;
    background-size: cover;
    background-position: center top;
  }

  .divTop2{
    position: fixed;
    width: 100%;
    height: 35%;
    top: 0;
    border-bottom-left-radius: 60%;
    border-bottom-right-radius: 60%;
    background-image: linear-gradient(#1ba0d4, #1b9fd4ab, #168ab80e);
  }

  .infoName {
    color: white;
    text-align: center;
    padding-top: 70px;
  }

  .infoExtra {
    color: #434343;
    background-color: white;
    height: 35%;
    width: 73%;
    border-radius: 100px;
    position: absolute;
    left: 50%;
    top: 85%;
    box-shadow: 0 0px 15px rgba(0, 0, 0, 0.3);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translate(-50%,-50%);
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
    flex-wrap: nowrap !important;
    padding: 23px;
    position: absolute;
    top: 53%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

</style>
