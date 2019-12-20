import Vue from 'vue'
import App from './App.vue'//Root application
Vue.config.productionTip = false
//vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import "material-design-icons-iconfont/dist/material-design-icons.css";
const color ={
// primary: '#3497db',
  // error: '#c0392b',
  success: '#27ae60',
  warning: '#f39c26',
  info: '#8e44ad',

  primary: "#6221ea",
  primaryVariant: "#3716b0",
  secondary: '#25d9c6',
  secondaryVariant: "#138785",
  background: "#ffffff",
  error: "#ae0725",
  accent: '#3497db',
};
Vue.use(Vuetify);//register applicaton with vuetify module /package
const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: color,
      dark: color,
    }
  },
  icons: {
    iconfont: "md"
  }
});

new Vue({
  vuetify, ...App
}).$mount('#app') //disaply vue component to html
