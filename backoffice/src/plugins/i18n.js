import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: "en-us",
    messages
});

export default i18n;

// en-us
// pt
// fr