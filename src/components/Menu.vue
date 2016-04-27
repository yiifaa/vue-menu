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
                //直接通知刷新，取消当前焦点缓存
                this.$broadcast("menu.deactive", id, isTopMenu)
                //刷新页面，动态刷新组件
                this.$dispatch("menu.refresh", id, isTopMenu, Date.now().valueOf())
            },


        },

        /**
        data () {
            return {
                currentApp : null,
                currentMenu : null
            }
        },
         **/

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
<style lang="less">
    .nav {
        &.nav-pills {
            width : 100%;
            >li {
                width : 100%;
                float : none;
             }
         }
    }
    .yii-menu {
        .yii-menu {
            .yii-menu-link {
                padding-left : 30px;
            }
        }
    }
</style>

