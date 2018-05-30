<template>
  <v-ons-page>
    <app-toolbar />
    <app-search :query.sync="query" placeholder="Search GitHub" @update:query="updateList" />
  </v-ons-page>

</template>
<script>
import AppToolbar from "./components/AppToolbar.vue"
import AppSearch from "./components/AppSearch.vue"
import { gitHub } from "./services/GitHub.js"
import _ from "lodash"

export default {
  components: {
    AppToolbar,
    AppSearch
  },
  data() {
    return {
      query: "",
      repos: []
    }
  },
  watch: {
    query: function() {
      this.debouncedGetRepos()
    }
  },
  created() {
    this.debouncedGetRepos = _.debounce(this.getRepos, 500)
  },
  methods: {
    getRepos() {
      gitHub.getRepos(this.query).then(({ data }) => {
        this.repos = data
        console.log(this.repos)
      })
    },
    updateList() {
      _.debounce(this.getRepos, 500)
    }
  }
}
</script>
