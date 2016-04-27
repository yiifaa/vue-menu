<template>
  <li :class="{'active' : selected}">
      <a v-text="title" class="yii-menu-link" href="#" @click="changeState"></a>
      <ul class="nav nav-pills nav-stacked yii-menu" v-if="showChildren">
          <menu-item v-for="child in children" :menu-data.sync="child">
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
            "menu.deactive" : function(id, topMenu) {
                if(topMenu) {
                    if(this.isTopMenu && this.id !== id) {
                        this.selected = false
                    }
                } else {
                    if(!this.isTopMenu && this.id !== id) {
                        this.selected = false
                    }
                }
                if(this.id === id) {
                    this.selected = true
                }
                this.$broadcast("menu.deactive", id, topMenu)
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
                return !this.isLeaf && this.opened
            },

            children () {
                return store.cloneChildren(this.id)
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
                if(!this.isLeaf) {
                    this.opened = !this.opened
                }
                this.$dispatch("menu.active", this.id, this.isTopMenu)
            }
        }
    }
</script>

