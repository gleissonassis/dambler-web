// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Simplert from 'vue2-simplert'
import VueCurrencyFilter from 'vue-currency-filter'
import DateHelper from '@/lib/helpers/DateHelper'// Global
import VueTheMask from 'vue-the-mask'

var dateHelper = new DateHelper()
dateHelper.registerFilters(Vue)

Vue.config.productionTip = false

Vue.component('simplert', Simplert)
Vue.use(VueResource)
Vue.use(VueTheMask)

Vue.use(VueCurrencyFilter, {
  symbol: 'R$',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('currentUserToken')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
