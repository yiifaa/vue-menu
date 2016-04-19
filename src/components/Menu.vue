<template>
    <menu-item v-for="app in initMenus" :menu-data="app" :include-child="parseChild">
    </menu-item>
</template>

<script>
    import menuItem from './MenuItem.vue'
    export default {

        props  : ["initMenus", "includeChild"],

        components : {
            menuItem
        },

        events    : {
            "menu.active" : function(id, isTopMenu) {
                if(isTopMenu) {
                    if(this.currentApp != id) {
                        this.$broadcast("menu.deactive", this.currentApp)
                        this.currentApp = id
                    }
                } else {
                    if(this.currentMenu != id) {
                        this.$broadcast("menu.deactive", this.currentMenu)
                        this.currentMenu = id
                    }
                }
                //刷新页面，动态刷新组件
                this.$dispatch("menu.refresh", id, isTopMenu, Date.now().valueOf())
            }
        },

        data () {
            return {
                currentApp : null,
                currentMenu : null
            }
        },

        computed : {

            /**
             * 是否解析子节点
             */
            parseChild () {
                if(this.includeChild === false) {
                    return false
                }
                //默认为包含，当不填写此属性时
                return true
            }
        }
    }
</script>

