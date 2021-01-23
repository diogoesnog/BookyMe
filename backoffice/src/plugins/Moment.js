import Vue from 'vue'
import Moment from 'vue-moment';
import "moment/locale/pt"

Vue.use(Moment);
Vue.moment().locale();

export default Vue;