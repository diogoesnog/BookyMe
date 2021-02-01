<template>
  <div>
    <div class="roundedDiv shadow">
      <div class="row divContent">
        <div class="col-10" style="display: flex; align-items: center;">
          {{ message }}
        </div>
        <div class="col-2" style="display: flex; align-items: center;">
          <q-btn v-if="canBeMarked" class="checkIcon" round icon="check" @click="markAsRead"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Notification",
  props: {
    _id: String,
    sentBy: String,
    title: String,
    message: String,
    canBeMarked: Boolean
  },

  methods: {
    markAsRead() {
      this.$emit('markAsRead', this._id)
    }
  }
}
</script>

<style scoped>

  .divContent {
    margin-left: 25px; 
    margin-right: 25px; 
    margin-top: 10px; 
    margin-bottom: 10px; 
    font-weight: 300; 
    font-size: 18px;
  }

  .notification-wrapper {
    padding: 20px;
    min-height: 100px;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.8) 0px 0 10px;
  }

  .centerDiv {
    padding: 15px;
    margin-top: 40px;
  }

  .gradientOne {
    background: linear-gradient(#e9695c, #e03459);
    color: white;
  }

  .shadow {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 28px;
  }

  .roundedDiv {
    border-radius: 200px;
    background: white;
    display: flex;
    align-items: center;
  }

  .checkIcon {
    font-size: 0.80em!important;
    margin: 15px;
    color: white;
    background: linear-gradient(#13c1e0, #2897e3);
  }

  .title {
  background: linear-gradient(#e9695c, #e03459);
  color: white;
  height: 40px;
  width: 130px;
  border-radius: 100px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
}
</style>
