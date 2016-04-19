<template>
  <li :class="{'active' : selected}">
      <a v-text="title" href="#" @click="changeState"></a>
      <ul v-if="showChildren">
          <menu-item v-for="child in children" :menu-data="child">
          </menu-item>
      </ul>
  </li>
</template>

<script>
    import store from './ImmutableStore'
    export default {

        name   : "menu-item",

        props  : ["menuData", "includeChild"],

        events : {
            "menu.deactive" : function(id) {
                if(this.id === id) {
                    this.selected = false
                }
            }
        },

        data () {
            return {
                id        : "",
                selected  : false,
                opened    : false,
                title     : "",
                href      :  "#",
                parent    : "#",
                icon      : ""
            }
        },

        created  () {
            this.$data = this.menuData
        },

        computed : {

            showChildren () {
                if(this.includeChild === false) {
                    return false
                }
                return !this.isLeaf
            },

            children () {
                return store.findChildren(this.id)
            },

            /**
             * 判断是否是叶子节点
             */
            isLeaf    () {
                return this.children.length == 0
            },

            isTopMenu () {
                return this.parent == "#"
            }

        },

        methods : {

            changeState () {
                this.selected = true
                this.$dispatch("menu.active", this.id, this.isTopMenu)
            }
        }
    }
</script>

