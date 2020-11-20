import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './bus/index'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import $http from './lib/http'

Vue.config.productionTip = false
Vue.prototype.$bus = Bus

Vue.use(ViewUI)
Vue.use($http)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
