<template>
  <v-ons-page>
    <app-toolbar />
    <app-search :query.sync="query" placeholder="Search GitHub" />
    <v-ons-button @click="getRepos">Search</v-ons-button>
  </v-ons-page>

</template>
<script>
import AppToolbar from "./components/AppToolbar.vue"
import AppSearch from "./components/AppSearch.vue"
import { gitHub } from "./services/GitHub.js"

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
  methods: {
    getRepos() {
      gitHub.getRepos(this.query).then(response => {
        console.log(response)
      })
    }
  }
}
</script>
