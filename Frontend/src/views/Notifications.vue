<template>
  <div  style="color: #434343;" class="centerDiv">
    <div class="row" style="margin: 20px;">
      <div class="col-12" style="display: flex; align-items: center;">
        
      </div>
    </div>
    <p style="font-weight: 670; font-size: 45px; padding-left: 20px; padding-top:5px;"> {{$t('notificationsPage.title')}}</p>

    <div class="title">
<!--      TODO: Meter internacionalização. -->
      Unread
    </div>
    <Notification v-for="(notification, index1) in unread" :key="index1" v-bind="notification" style="padding: 15px;" @markAsRead="markAsRead" :canBeMarked="true"></Notification>
    <div class="title">
      Read
    </div>
     <Notification v-for="(notification, index2) in read" :key="index2" v-bind="notification" style="padding: 15px;" @markAsRead="markAsRead" :canBeMarked="false"></Notification>

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
      read: Array,
      unread: Array
    }
  },

  mounted() {
    this.getNotifications();
    this.getReadNotifications();
  },
  methods: {
    getNotifications() {
      Service.getNotifications(false)
        .then(response => {
          this.unread = response.data["data"];
          console.group("Notificações não lidas:")
          console.log(this.unread);
          console.groupEnd();
        }).catch(err => {
          console.error(err);
        });
    },

    getReadNotifications() {
      Service.getNotifications(true)
        .then(response => {
          this.read = response.data["data"];
          console.group("Notificações lidas:")
          console.log(this.read);
          console.groupEnd();
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
