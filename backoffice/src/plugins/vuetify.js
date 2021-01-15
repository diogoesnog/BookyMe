import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2897e3',
                secondary: '#2897e3',
                accent: '#13c1e0',
                error: '#e03459',
                success: '#97E328',
                anchor: '#434343'
            },
        },
    },
});
