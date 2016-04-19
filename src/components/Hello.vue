<template>
  <h1>Hello</h1>
  <input type="text" v-model="name"/>
  <button class="btn btn-default" @click="setValue">
    设置
  </button>
</template>

<script>
    import store from './ImmutableStore'
    export default {
        data () {
            return {
                name: ""
            }
        },

        methods : {
            setValue () {
                store.init(this.name)
            }
        }

    }
</script>

