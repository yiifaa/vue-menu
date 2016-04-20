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
                <component :is="view"></component>
            </div>
            <div class="col-md-4">
                <ul>
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
import menus from './menus'

export default {

    props: ["view"],

    components: {
        hello,
        world,
        menu
    },

    data () {
        return {
            menus,
            secMenus : null
        }
    },

    events : {
        "menu.refresh" : function(id, appMenu, random) {
            if(appMenu) {
                this.secMenus = store.findChildren(id)
            }
        }
    },

    created () {
        //初始化菜单
        store.init(this.menus);
    },

    computed : {
        /**
         * 获取所有的APP节点
         */
        appMenus () {
            return store.findRootChildren()
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

