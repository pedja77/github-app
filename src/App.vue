<template>
  <v-ons-page>
    <app-toolbar />
    <app-search :query.sync="query" placeholder="Search GitHub" @update:query="updateList" />
    <v-ons-list>
      <v-ons-list-item v-for="(repo, index) in repos" :key="index">
        <v-ons-row>
          <v-ons-col width="30%">
            <img :src="makeAvatarUrl(query)" width="50px" />
          </v-ons-col>
          <v-ons-col>
            <h4>{{ repo.name }}</h4>
            <p>{{ repo.description }}</p>
          </v-ons-col>
        </v-ons-row>
      </v-ons-list-item>
    </v-ons-list>
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
    },
    makeAvatarUrl(query) {
      return `https://github.com/${query}.png`
    }
  }
}
</script>
