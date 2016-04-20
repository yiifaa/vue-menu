import Vue from 'vue'
import VueI18n from "vue-i18n"
import message_zh_CN from "./i18n/message_zh_CN"
import App from './App.vue'

/* eslint-disable no-new */
new Vue({

  el: 'body',

  created () {
    Vue.use(VueI18n, {
      lang    : "zh_CN",
      locales : {
        "zh_CN" : message_zh_CN
      }
    })
  },

  components: {
    App
  }

})
