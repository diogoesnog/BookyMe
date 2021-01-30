<template>
  <div>
    <div class="col-10 roundedDiv shadow " style="display: flex; align-items: center; height:auto">
      <div class="col">
        <div class="row" style="font-weight: 600; font-size: 16px;">
          <div class="col-10">
            <p>{{ message }}</p>
          </div>
          <div class="col-2">
            <q-btn v-if="canBeMarked" class="checkIcon" round icon="check" @click="markAsRead" style="float: right; margin-top:50px"></q-btn>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="notification-wrapper">
      <div class="row">
        <div class="col-10">
          <p>{{ title }}</p>
          
        </div>
        <div class="col-2" v-if="canBeMarked">
          <q-btn @click="markAsRead">
            X
          </q-btn>
        </div>
      </div>
    </div>-->
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
    padding-left: 20px;
  }

  .checkIcon {
    font-size: 0.85em!important;
    margin: 15px;
    background-color: white;
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
