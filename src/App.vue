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
        <li>
          <a href="/basic">{{$t('menu.basic')}}</a>
        </li>
        <li>
          <a href="/async/">{{$t('menu.async')}}</a>
        </li>
        <li class="active">
          <a href="/conn/">{{$t('menu.conn')}}</a>
        </li>
        <li>
          <a href="/basic/123">{{$t('menu.dynamic')}}</a>
        </li>
        <li>
          <a href="../customer/">{{$t('menu.customer')}}</a>
        </li>
        <li>
          <a href="../i18n/">{{$t('menu.i18n')}}</a>
        </li>
      </ul>
    </div>
  </header>
  <a href="/app/hello">Hello</a>
  <a href="/app/world">world</a>
  <component :is="view"></component>
</template>

<script>
import hello from './components/Hello.vue'
import world from './components/World.vue'

export default {

  props : ["view"],

  components: {
    hello,
    world
  }
}
</script>
<style src="../node_modules/bootstrap/dist/css/bootstrap.css"></style>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

