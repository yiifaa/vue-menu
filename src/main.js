import Vue from 'vue'
import VueI18n from "vue-i18n"
import message_zh_CN from "./i18n/message_zh_CN"
import App from './App.vue'
import page from 'page'

/* eslint-disable no-new */
new Vue({

  el: 'body',

  data () {
    return {
      view : ""
    }
  },

  created () {
    Vue.use(VueI18n, {
      lang    : "zh_CN",
      locales : {
        "zh_CN" : message_zh_CN
      }
    })
    this.initPage()
  },

  components: {
    App
  },

  methods : {

    initPage () {
      page.base("/app")

      page("*", (context, next) => {
        next()
      })

      page("/:app", (context, next) => {
          this.view = context.params.app
      })

      page.start({
        dispatch : true
      })
    }
  }

})
