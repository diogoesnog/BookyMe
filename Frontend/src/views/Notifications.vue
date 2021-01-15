<template>
  <div>
    <h1 style="font-weight: 670; font-size: 45px;"> {{$t('notificationsPage.title')}}</h1>
    <Notification v-for="(notification, index) in notifications" :key="index" v-bind="notification" style="padding: 15px;" @markAsRead="markAsRead"></Notification>
    <Toolbar/>
  </div>
</template>

<script>
import Service from '../services/user.service';
import Toolbar from '../components/Root/Toolbar';
import Notification from '../components/Notifications/Notification';

export default {
  name: "Notifications",
  components: {
    Toolbar,
    Notification
  },
  data() {
    return {
      // notifications: Array
      notifications: [
        {
          _id: "1234",
          sentBy: "teste",
          title: "Título",
          message: "Message"
        }
      ]
    }
  },

  mounted() {
    this.getNotifications();
  },
  methods: {
    getNotifications() {
      Service.getNotifications()
        .then(response => {
          this.notifications = response.data["data"];
        }).catch(err => {
          console.error(err);
        });
    },

    markAsRead(id) {
      Service.markAsRead(id)
        .then(response => {
          console.log(response);
          // this.notifications.splice(this.notifications.findIndex(item => item._id === "cStatus"), 1)
          this.notifications = this.notifications.filter(item => item._id !== id);

        }).catch(err => {
          console.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
