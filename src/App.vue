<template>
  <header class="navbar navbar-static-top navbar-inverse" role="banner">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#bs-navbar"
                aria-controls="bs-navbar"
                aria-expanded="false">
          <span class="sr-only">{{$t('app.collapse')}}</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a href="/" class="navbar-brand">Vue-Menu</a>
      </div>
      <ul class="nav navbar-nav">
          <menu :init-menus="appMenus" :include-child="false"></menu>
      </ul>
    </div>
  </header>

    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <a href="/app/hello">hello</a>
                <input type="text" v-model="viewModel"/>
                <button class="btn btn-default" @click="changeView">切换视图</button>
                <component :is="view"></component>
            </div>
            <div class="col-md-4">
                <ul class="nav nav-pills nav-stacked yii-menu">
                    <menu :init-menus.sync="secMenus" :include-child="true"></menu>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import hello from './components/Hello.vue'
import world from './components/World.vue'
import store from './components/ImmutableStore'
import menu from './components/Menu.vue'
import MenuServ from './MenuServ'
import querystring from './utils/querystring'
import page from 'page'

let menus = MenuServ.get()
export default {

    props: ["view"],

    components: {
        hello,
        world,
        menu
    },

    data () {
        return {
            view      : null,
            menus,
            secMenus : null,
            viewModel : ""
        }
    },

    events : {
        "menu.refresh" : function(id, appMenu, random) {
            if(appMenu) {
                this.secMenus = store.cloneChildren(id)
            }
        }
    },

    created () {
        //初始化菜单
        store.init(this.menus)
        this.initPage()
    },

    computed : {

        /**
         * 获取所有的APP节点
         */
        appMenus () {
            return store.findRootChildren()
        }
    },

    methods : {

        /**
         * 初始化路由
         */
        initPage () {
            page.base("/app")

            page("*", (context, next) => {
                this.$dispatch("page.queryString", querystring.parse(context.querystring))
                next()
            })

            /**
             * 注册所有的访问路径
             */
            page("/:app", (context, next) => {
                this.view = context.params.app
            })

            page.start({
                dispatch : true
            })
        },

        changeView () {
            this.$broadcast("menu.selected", this.viewModel)
        }

    }

}
</script>
<style src="../node_modules/bootstrap/dist/css/bootstrap.css"></style>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

