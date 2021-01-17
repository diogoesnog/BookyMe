<template>
  <div style="color: #434343; padding-top: 15px; padding-left: 25px; padding-bottom: 100px;">
    <p class="titles">{{$t('homePage.recommended')}}</p>
    <div class="wrapper">
        <div @click="redirect(store._id)" v-for="(store, index) in stores" :key="index" v-bind="store" class="item">
          <div class="row">
            <div class="col-12 divPhoto" v-bind:style='{ backgroundImage: `url("${getImageWidget(store.photos[0].url)}")` }'>
            </div>
          <div class="row" style="padding: 15px">
            <div class="col-7" style="text-align: left; margin-top: -5px; display: inline-grid;">
              <span style="font-weight: 670; display: inline-block; width: 120px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 17px;">
                {{ store.name }}
              </span>
              <span style="font-weight: 350; display: inline-block; width: 130px; white-space: nowrap; overflow: hidden !important; text-overflow: ellipsis; font-size: 16px;">
                {{ store.address.city }}
              </span>
            </div>
            <div class="col-5" style="padding-left: 10px; width: 80px;">
              <div class="divRating shadow">
                <p style="position: relative; top: 51%; left: 47%; transform: translate(-50%, -50%); text-indent: 3px;">
                  <span style="font-weight: 670; font-size: 16px; display: inline-block; vertical-align: middle;">
                    {{roundRating(store.rating)}}<span style="font-weight: 200; font-size: 16px;">/5</span>
                  </span>
                  <i class="fa fa-star" style="font-size:15px; padding-top: 5px;"></i>
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommendation",

  props: {
    baseRecomendation: String,
    stores: Object
  },

  methods: {
    getImageWidget(url) {
      console.log(url);
      return this.baseRecomendation + url;
    },
    roundRating: function(rating) {
      return Math.round(rating*10)/10;
    },
    redirect: function(id) {
      this.$router.push({name: 'Store', params:{id:id}})
    }
  }
}
</script>

<style scoped>

  .divRating {
    text-align: center;
    height: 30px;
    border-radius: 20px;
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .divPhoto {
    width: 100%;
    height: 130px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    background-size: cover;
    background-position: center top;
  }

  .titles {
    color: #434343;
    font-weight: 700;
    font-size: 30px;
  }

  .wrapper {
    margin-left: 0px;
    margin-top: -5px;
    position: sticky;
    overflow-x: scroll;
    overflow-y: hidden;
    top: 190px;
    display: grid;
    grid-template-columns: repeat(600, auto);
    grid-gap: 0 30px;
  }

  .item {
    margin: 5px;
    background-size: cover;
    height: 200px;
    width: 230px;
    border-radius: 30px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
