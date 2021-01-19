import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue2Filters from 'vue2-filters'
import VueBarcode from 'vue-barcode'
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(Vue2Filters);
Vue.component('barcode', VueBarcode);
Vue.use(VueHtmlToPaper, options);



Vue.filter('ChangeName', function(value) {
  if (value == 'admin') {
    return 'แอดมิน'
  }else if (value == 'librarian'){
    return 'บรรณารักษ์'
  }else if (value == 'personnel'){
    return 'บุคลากร'
  }else if (value == 'student'){
    return 'นักเรียน'
  }
});

