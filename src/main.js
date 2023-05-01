import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import styles from "./assets/scss/style.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  styles,
}).$mount("#app");
