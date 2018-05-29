<template>
  <v-ons-page>
    <app-toolbar />
  </v-ons-page>

</template>
<script>
import AppToolbar from "./components/AppToolbar.vue"

export default {
  components: {
    AppToolbar
  },
  data() {
    return {
      title: "Github app"
    }
  },
  methods: {}
}
</script>
