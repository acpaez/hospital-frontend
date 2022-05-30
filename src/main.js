import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue) 
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(ElementUI,  { locale });

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';
let user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${user.token}`;
}


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
