<template>
  <h1 v-text="name"></h1>
</template>

<script>
    import store from './ImmutableStore'
    export default {
        data () {
            return {
                name : ""
            }
        },

        created () {
            this.name = store.value
        }

    }
</script>

