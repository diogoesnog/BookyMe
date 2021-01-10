<template>
  <div class="col-12" style="padding-top: 25px;">
    <p class="titles">{{$t('storePage.ratings')}}</p>
    <div class="row">
      <!-- Rating Total -->
      <div class="col-5">
        <div class="row">
          <div class="col-12 ratingTotal1">
            {{ this.rating }}
          </div>
          <div class="col-12 ratingTotal2">
            Baseado em <br/> 50 Avaliações
          </div>
        </div>
      </div>
      <!-- Rating Distributions -->
      <div class="col-7 allRatings">
        <!-- 5 Stars -->
        <div class="row">
          <div class="col-4 numberStars">
            5 Estrelas
          </div>
          <div class="col-8 countStars">
          </div>
        </div>
        <!-- 4 Stars -->
        <div class="row">
          <div class="col-4 numberStars">
            4 Estrelas
          </div>
          <div class="col-8 countStars">
          </div>
        </div>
        <!-- 3 Stars -->
        <div class="row">
          <div class="col-4 numberStars">
            3 Estrelas
          </div>
          <div class="col-8 countStars">
          </div>
        </div>
        <!-- 2 Stars -->
        <div class="row">
          <div class="col-4 numberStars">
            2 Estrelas
          </div>
          <div class="col-8 countStars">
          </div>
        </div>
        <!-- 1 Star -->
        <div class="row">
          <div class="col-4 numberStars">
            1 Estrela
          </div>
          <div class="col-8 countStars">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreRatings",

  props: {
    rating: Number
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
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
}

.allRatings {

}

.numberStars {
  color: #434343;
  font-weight: 300;
  font-size: 16px;
}

.countStars {
  background: linear-gradient(#13c1e0, #2897e3);
  border-radius: 100px;
}

</style>

