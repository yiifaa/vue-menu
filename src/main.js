import Vue from 'vue'
import VueI18n from "vue-i18n"
import message_zh_CN from "./i18n/message_zh_CN"
import App from './App.vue'
import $   from 'jquery'

/* eslint-disable no-new */
new Vue({

  el: 'body',

  events : {

    /**
     * 监听查询参数信息
     * @param querys
     */
    "page.queryString" : function(querys) {
      this.queryString = querys
    }

  },

  /**
   * 用于处理查询参数
   */
  data  () {
    return {
      queryString : null
    }
  },

  created () {
    let _this = this

    /**
     * 添加国际化信息
     */
    Vue.use(VueI18n, {
      lang    : "zh_CN",
      locales : {
        "zh_CN" : message_zh_CN
      }
    })

    /**
     * 添加常用的路由实例方法
     */
    Vue.prototype.getQueryString = function() {
      return this.$root.getQueryString
    }

    $.getJSON("/static/menus.json")
     .done((datas) => {
          alert(datas)
        })

  },

  components: {
    App
  }

})
