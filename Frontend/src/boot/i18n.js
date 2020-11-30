import { Quasar } from 'quasar'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
const defaultLocale = Quasar.lang.isoName
export default async ({ app, Vue }) => {
  Vue.use(VueI18n)
// Set i18n instance on app
  app.i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages
  })
}
