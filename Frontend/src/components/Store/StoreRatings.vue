<template>
  <div class="col-12">
    <p class="titles" style="padding-top: 30px; padding-left: 30px">{{$t('storePage.ratings')}}</p>
    <div class="row" style="margin: 15px; padding-top: 10px; padding-right: 20px;">
      <!-- Rating Total -->
      <div class="col-5" style="padding-right: 15px;">
        <div class="row">
          <div class="col-12 ratingTotal1">
            {{ roundRating() }}
          </div>
          <div class="col-12 ratingTotal2">
            <span style="font-weight: 700">Total</span><br/>{{ this.reviews.length }}
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
            <div class="countStarsFill" v-bind:style="{ width: `${returnPercStar(5)}`}"/>
          </div>
        </div>
        <!-- 4 Stars -->
        <div class="row" style="padding-bottom: 5px;">
          <div class="col-2 numberStars">
            4
          </div>
          <div class="col-10 countStarsBase">
            <div class="countStarsFill" v-bind:style="{ width: `${returnPercStar(4)}`}"/>
          </div>
        </div>
        <!-- 3 Stars -->
        <div class="row" style="padding-bottom: 5px;">
          <div class="col-2 numberStars">
            3
          </div>
          <div class="col-10 countStarsBase">
            <div class="countStarsFill" v-bind:style="{ width: `${returnPercStar(3)}`}"/>
          </div>
        </div>
        <!-- 2 Stars -->
        <div class="row" style="padding-bottom: 5px;">
          <div class="col-2 numberStars">
            2
          </div>
          <div class="col-10 countStarsBase">
            <div class="countStarsFill" v-bind:style="{ width: `${returnPercStar(2)}`}"/>
          </div>
        </div>
        <!-- 1 Star -->
        <div class="row">
          <div class="col-2 numberStars">
            1
          </div>
          <div class="col-10 countStarsBase">
            <div class="countStarsFill" v-bind:style="{ width: `${returnPercStar(1)}`}"/>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <div style="margin-right: 30px; margin-left: 30px; margin-top: 20px;" class="row allReviews" v-for="(review, index) in this.reviews" :key="index" v-bind="review">
      <div class="col-2">
        <q-avatar class="shadow">
          <img :src="getAvatar(review.user.avatar)">
        </q-avatar>
      </div>
      <div style="width: 10px" class="col-1"/>
      <div class="col-9">
        <span style="font-size: 14px; font-weight: 600;">
          {{review.user.name}}
        </span>
        <p class="commentText">
          {{review.comment}}
        </p>
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
      storeID: this.$route.params.id,
      reviews: Array,
      fiveStars: "",
      fourStars: "",
      threeStars: "",
      twoStars: "",
      oneStars: "",
      totalRating: 0,
      base: String
    }
  },

  props: {
    _id: String,
    rating: Number,
  },

  mounted() {
    this.fetchStoreReviews();
  },

  methods: {
    roundRating() {
      return Math.round(this.rating*10)/10;
    },
    fetchStoreReviews() {
      Service.getReviewsStore(this.storeID)
        .then(response => {
          this.reviews = response.data["data"];
          this.base = response.data["base"];
          // Percorrer Array e Contar Stars
          var i;
          let five = 0 ;
          let four = 0;
          let three = 0;
          let two = 0;
          let one = 0;
          let length = this.reviews.length;

          for (i = 0; i < length; i++) {
            if(Math.round(this.reviews[i].rating) == 5) five++;
            if(Math.round(this.reviews[i].rating) == 4) four++;
            if(Math.round(this.reviews[i].rating) == 3) three++;
            if(Math.round(this.reviews[i].rating) == 2) two++;
            if(Math.round(this.reviews[i].rating) == 1) one++;
          }

          this.fiveStars = Math.round((five/length) * 100) + "%";
          this.fourStars = Math.round((four/length) * 100) + "%";
          this.threeStars = Math.round((three/length) * 100) + "%";
          this.twoStars = Math.round((two/length) * 100) + "%";
          this.oneStars = Math.round((one/length) * 100) + "%";
        }).catch(err => console.log(err)

      ).finally(() => {
        this.$q.loading.hide();
      })
    },
    returnPercStar: function(star) {
      if(star == 5) return this.fiveStars;
      else if(star == 4) return this.fourStars;
      else if(star == 3) return this.threeStars;
      else if(star == 2) return this.twoStars;
      else return this.oneStars;
    },
    getAvatar(avatarURL) {
      return "http://localhost:5200" + avatarURL;
    }
  }
}
</script>

<style scoped>

  .commentText {
    font-size: 15px; 
    font-weight: 300; 
  }
  .divRating {
    text-align: center;
    height: 30px;
    width: 50px;
    border-radius: 25px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .shadow {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 28px;
  }

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

  .allReviews {
    padding: 10px;
    background: white;
    border-radius: 40px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
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

