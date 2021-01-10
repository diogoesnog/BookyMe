<template>
  <div>
    <!-- Div Cima (Photo + Info Base) -->
    <div class="divTop1" v-bind:style='{ backgroundImage: `url("${getImage(0)}")` }'>
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
    <!-- Div Restante -->
    <div class="divBottom">
      <div class="row">
        <!-- Scrolling Div Photos -->
        <div class="col-12" style="padding-left: 30px">
          <p class="titles">{{$t('storePage.photos')}}</p>
          <div class="wrapper">
            <div v-for="(photoUrl, index) in photos" :key="index" v-bind="photoUrl" class="item">
              <div class="item" v-bind:style='{ backgroundImage: `url("${getImage(index)}")` }'/>
            </div>
            <div class="empty"></div>
          </div>
        </div>
        <!-- Description -->
        <div class="col-12" style="padding-top: 40px; padding-left: 30px">
          <p class="titles">{{$t('storePage.description')}}</p>
          <p class="text"> {{ this.description }} </p>
        </div>
        <!-- Mapa -->
        <div class="col-12" style="padding-top: 25px; padding-left: 30px">
          <p class="titles">{{$t('storePage.utilInfo')}}</p>
        </div>
        <!-- Ratings -->
        <div class="col-12">
          <p class="titles" style="padding-left: 30px">{{$t('storePage.ratings')}}</p>
          <div class="row" style="margin: 15px; padding-top: 10px; padding-right: 20px;">
            <!-- Rating Total -->
            <div class="col-5" style="padding-right: 15px;">
              <div class="row">
                <div class="col-12 ratingTotal1">
                  {{ this.rating }}
                </div>
                <div class="col-12 ratingTotal2">
                  <span style="font-weight: 700">Total</span><br/>50
                </div>
              </div>
            </div>
            <!-- Rating Distributions -->
            <div class="col-7 allRatings" style="line-height: 190%;">
              <!-- 5 Stars -->
              <div class="row" style="padding-bottom: 5px;">
                <div class="col-2 numberStars">
                  5
                </div>
                <div class="col-10 countStarsBase">
                  <div class="countStarsFill" v-bind:style='{ width: `${getWidthStars(85)}` }'/>
                </div>
              </div>
              <!-- 4 Stars -->
              <div class="row" style="padding-bottom: 5px;">
                <div class="col-2 numberStars">
                  4
                </div>
                <div class="col-10 countStarsBase">
                  <div class="countStarsFill" v-bind:style='{ width: `${getWidthStars(80)}` }'/>
                </div>
              </div>
              <!-- 3 Stars -->
              <div class="row" style="padding-bottom: 5px;">
                <div class="col-2 numberStars">
                  3
                </div>
                <div class="col-10 countStarsBase">
                  <div class="countStarsFill" v-bind:style='{ width: `${getWidthStars(45)}` }'/>
                </div>
              </div>
              <!-- 2 Stars -->
              <div class="row" style="padding-bottom: 5px;">
                <div class="col-2 numberStars">
                  2
                </div>
                <div class="col-10 countStarsBase">
                  <div class="countStarsFill" v-bind:style='{ width: `${getWidthStars(20)}` }'/>
                </div>
              </div>
              <!-- 1 Star -->
              <div class="row">
                <div class="col-2 numberStars">
                  1
                </div>
                <div class="col-10 countStarsBase">
                  <div class="countStarsFill" v-bind:style='{ width: `${getWidthStars(0)}` }'/>
                </div>
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

    data () {
    return {
      slide: 1
    }
  },

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
  },

  methods: {
    getImage(index) {
      return this.urlMainPhoto = `http://localhost:5100${this.photos[index].url}`;
    },
    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },
    getCutName: function(string) {
      if(string.substring(0,15) == string) return string;
      else return string.substring(0, 15) + "...";
    },
    getWidthStars: function(string) {
      return string + "%";
    }
  }
}
</script>

<style scoped>

  .divTop1{
    position: absolute;
    width: 100%;
    height: 30%;
    top: 0;
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;
    background-size: cover;
    background-position: center top;
  }

  .divTop2{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;
    background-image: linear-gradient(#1ba0d4, #1b9fd4c2, #168ab80e);
  }

  .divBottom {
    position: relative;
    padding-top: 290px;
  }

  .infoName {
    color: white;
    text-align: center;
    padding-top: 80px;
  }

  .infoExtra {
    color: #434343;
    background-color: white;
    height: 30%;
    width: 75%;
    border-radius: 100px;
    position: absolute;
    left: 50%;
    top: 100%;
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

  .titles {
    color: #434343;
    font-weight: 700; 
    font-size: 30px;
  }

  .text {
    color: #434343;
    font-weight: 300; 
    font-size: 18px;
    text-align: justify;
    width: 93%;
  }

  .ratingTotal1 {
    background: linear-gradient(#e9695c, #e03459);
    height: 95px;
    width: 95px;
    border-radius: 150px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 800;
    font-size: 48px;
    margin: auto;
  }

  .ratingTotal2 {
    color: #434343;
    font-weight: 300;
    font-size: 20px;
    text-align: center;
    padding-right: 10px;
    padding-top: 10px;
  }

  .allRatings {
    
  }

  .numberStars {
    color: #434343;
    font-weight: 300;
    font-size: 18px; 
  }

  .countStarsBase {
    background: white;
    border-radius: 100px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2);
  }

  .countStarsFill {
    background: linear-gradient(#13c1e0, #2897e3);
    border-radius: 100px;
    height: 100%;
  }

  .wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-gap: 0 30px;
  }

  .item {
    background-size: cover;
    height: 120px;
    width: 120px;
    border-radius: 200px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.5);
  }

  .empty {
    width: 10px;
  }

  .wrapper::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

</style>
