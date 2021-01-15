<template>
  <div>
    <div class="notification-wrapper">
      <div class="row">
        <div class="col-10">
          <p>{{ title }}</p>
          <p>{{ message }}</p>
        </div>
        <div class="col-2">
          X
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
    message: String
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
</style>
