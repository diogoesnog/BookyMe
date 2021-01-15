<template>
  <div>
    <h1 style="font-weight: 670; font-size: 45px;"> {{$t('notificationsPage.title')}}</h1>

    <q-tabs v-model="tab" narrow-indicator dense align="justify">
      <q-tab class="text-purple" name="unread" icon="mail" label="Unread" />
      <q-tab class="text-orange" name="read" icon="alarm" label="Read" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="unread">
        <Notification v-for="(notification, index) in unread" :key="index" v-bind="notification" style="padding: 15px;" @markAsRead="markAsRead" :canBeMarked="true"></Notification>
      </q-tab-panel>

      <q-tab-panel name="read">
        <Notification v-for="(notification, index) in read" :key="index" v-bind="notification" style="padding: 15px;" @markAsRead="markAsRead" :canBeMarked="false"></Notification>
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
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
      read: Array,
      unread: Array,
      tab: "unread"
    }
  },

  mounted() {
    this.getNotifications();
    this.getUnreadNotifications();
  },
  methods: {
    getNotifications() {
      Service.getNotifications(false)
        .then(response => {
          this.unread = response.data["data"];
        }).catch(err => {
          console.error(err);
        });
    },

    getUnreadNotifications() {
      Service.getNotifications(true)
        .then(response => {
          this.read = response.data["data"];

        }).catch(err => {
          console.error(err);

        })
    },

    markAsRead(id) {
      Service.markAsRead(id)
        .then(response => {
          console.log(response);
          // this.notifications.splice(this.notifications.findIndex(item => item._id === "cStatus"), 1)
          this.unread = this.unread.filter(item => item._id !== id);

        }).catch(err => {
          console.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
