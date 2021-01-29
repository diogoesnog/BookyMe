import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'mdi',
    theme: {
        themes: {
            light: {
                primary: '#2897e3',
                secondary: '#2897e3',
                accent: '#13c1e0',
                error: '#e03459',
                success: '#97E328',
                anchor: '#13c1e0'
                // anchor: '#434343'
            },
        },
    },
});
