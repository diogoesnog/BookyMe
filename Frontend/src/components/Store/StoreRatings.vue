<template>
  <div class="col-12">
    <div class="row" style="padding-top: 40px; padding-left: 30px">
      <div class="col-9">
        <p class="titles">{{$t('storePage.ratings')}}</p>
      </div>
      <div @click="fixed = true;" class="col-3" style="display: flex; justify-content: center; align-items: center;">
        {{$t('storePage.seeAllRatings')}}
      </div>
    </div>
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
    <div style="margin-right: 30px; margin-left: 30px; margin-top: 20px;" class="row allReviews" v-for="(review, index) in this.baseReviews" :key="index" v-bind="review">
      <div class="col-2">
        <q-avatar class="shadow">
          <img :src="getAvatar(review.user.avatar)">
        </q-avatar>
      </div>
      <div style="width: 10px" class="col-1"/>
      <div class="col-9">
        <span style="font-size: 18px; font-weight: 600;">
          {{ review.user.name }}<span class="textRating">{{ review.rating }}<span style="font-weight: 300">/5</span><i class="fa fa-star" style="font-size:16px; padding: 2px;"/></span>
        </span>
        <div @click="showMoreText" v-show="!moreText" class="commentText">
          {{ getReduceComment(review.comment) }}
        </div>
        <div @click="showLessText" v-show="moreText" class="commentText">
          {{ review.comment }}
        </div>
      </div>
    </div>
    <q-dialog v-model="fixed">
      <q-card class="cardStyle">
        <q-card-section style="" class="items-center">
          <div class="row" style="margin-right: 20px; margin-left: 20px; margin-bottom: -15px">
            <div class="col-10 titles">
              {{$t('storePage.allRating')}}
            </div>
            <div class="col-2" style="text-align: right;">
              <q-btn icon="close" class="iconClose" size="15px" round dense v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-card-section style="max-height: 60vh;" class="scroll">
          <div v-for="(review, index) in this.reviews" :key="index" v-bind="review" class="row allReviews" style="margin-top: 20px;">
            <div class="col-2">
              <q-avatar class="shadow">
                <img :src="getAvatar(review.user.avatar)">
              </q-avatar>
            </div>
            <div style="width: 10px" class="col-1"/>
            <div class="col-9">
              <span style="font-size: 18px; font-weight: 600;">
                {{ review.user.name }}<span class="textRating">{{ review.rating }}<span style="font-weight: 300">/5</span><i class="fa fa-star" style="font-size:16px; padding: 2px;"/></span>
              </span>
              <div @click="showMoreText" v-show="!moreText" class="commentText">
                {{ getReduceComment(review.comment) }}
              </div>
              <div @click="showLessText" v-show="moreText" class="commentText">
                {{ review.comment }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>

import Service from '../../services/user.service'

export default {
  name: "StoreRatings",

  data() {
    return {
      fixed: false,  
      moreText: false,
      storeID: this.$route.params.id,
      reviews: Array,
      baseReviews: Array,
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
    getReduceComment(comment) {
      let commentLess = comment.substring(0, 40);
      if(comment.length <= 40) return commentLess;
      else return commentLess + "...";
    },
    showMoreText() {
      this.moreText = true;
    },
    showLessText() {
      this.moreText = false;
    },
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

          // Get Only 3 Elements Array
          this.baseReviews = this.reviews.slice(0,3);
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

  .iconClose {
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .cardStyle {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    border-radius: 30px;
  }
  
  .commentText {
    font-size: 16px; 
    font-weight: 300; 
  }

  .textRating {
    padding: 10px;
    font-weight: 600;
    color: #e03459;
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
    background-color: white !important;
    color: #434343;
    border-radius: 40px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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

  a:link {
    color: #434343;
    text-decoration: none;
  }

  a:visited {
    color: #434343;
    text-decoration: none;
  }

  a:hover {
    color: #434343;
    text-decoration: none;
  }

  a:active {
    color: #434343;
    text-decoration: none;
  }

</style>

