<template>
  <div class="col-12">
    <p class="titles" style="padding-left: 30px">{{$t('storePage.ratings')}}</p>
    <div class="row" style="margin: 15px; padding-top: 10px; padding-right: 20px;">
      <!-- Rating Total -->
      <div class="col-5" style="padding-right: 15px;">
        <div class="row">
          <div class="col-12 ratingTotal1">
            {{ roundRating(this.rating) }}
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

</template>

<script>

import Service from '../../services/user.service'

export default {
  name: "StoreRatings",

  data() {
    return {
      storeID: this.$route.params.id
    }
  },
  
  props: {
    rating: Number,
    reviews: Array
  },

  mounted() {
    this.fetchStoreReviews();
  },

  methods: {
    getWidthStars: function(string) {
      return string + "%";
    },
    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    }, 
    fetchStoreReviews() {
      Service.getReviewsStore(this.storeID)
        .then(response => {
          let data = response.data["data"];
          this.reviews = data;
          console.log(this.reviews);
        }).catch(err => console.log(err)

      ).finally(() => {
        this.$q.loading.hide();
      })
    },  
  }
}
</script>

<style scoped>

.titles {
  color: #434343;
  font-weight: 700;
  font-size: 30px;
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
  font-size: 50px;
  margin: auto;
}

.ratingTotal2 {
  color: #434343;
  font-weight: 300;
  font-size: 20px;
  text-align: center;
  padding-top: 10px;
  margin: -3px;
}

.allRatings {

}

.numberStars {
  color: #434343;
  font-weight: 300;
  font-size: 16px;
}

.countStarsBase {
  background: white;
  border-radius: 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.countStarsFill {
  background: linear-gradient(#13c1e0, #2897e3);
  border-radius: 100px;
  height: 100%;
}

</style>

