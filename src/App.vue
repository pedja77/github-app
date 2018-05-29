<template>
  <v-ons-page>
    <app-toolbar />
    <app-search :query.sync="query" placeholder="Search GitHub" /> {{ query }}
  </v-ons-page>

</template>
<script>
import AppToolbar from "./components/AppToolbar.vue"
import AppSearch from "./components/AppSearch.vue"

export default {
  components: {
    AppToolbar,
    AppSearch
  },
  data() {
    return {
      query: ""
    }
  },
  methods: {}
}
</script>
