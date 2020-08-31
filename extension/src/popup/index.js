import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js";
import "/src/storage/index.js";

new Vue({
  el: "#app",
  components: {
    popup: window.httpVueLoader("Popup.vue"),
  },
  data: () => ({
    storageProvider: window.swaggerStorageProvider,
  }),
  template: `<popup :storageProvider="storageProvider"></popup>`,
});
