<template>
  <v-ons-page>
    <app-toolbar />
    <app-search :query.sync="query" placeholder="Search GitHub" @update:query="debouncedGetRepos" />
    <div>
      <v-ons-list v-if="showList">
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
      <empty-state v-else :type="query" />
    </div>
    <div v-if="fetching" class="progress">
      <v-ons-progress-circular indeterminate></v-ons-progress-circular>
    </div>
  </v-ons-page>

</template>
<script>
import AppToolbar from "./components/AppToolbar.vue"
import AppSearch from "./components/AppSearch.vue"
import EmptyState from "./components/EmptyState.vue"

import { gitHub } from "./services/GitHub.js"
import _ from "lodash"

export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState
  },
  data() {
    return {
      query: "",
      repos: [],
      fetching: false
    }
  },
  watch: {
    query: function() {
      this.debouncedGetRepos()
    }
  },
  computed: {
    showList() {
      return this.repos.length > 0
    }
  },
  created() {
    this.debouncedGetRepos = _.debounce(this.getRepos, 500)
  },
  methods: {
    getRepos() {
      this.fetching = true
      console.log("getReposIn", this.fetching)
      gitHub
        .getRepos(this.query)
        .then(({ data }) => {
          this.repos = data
          this.fetching = false
          console.log(this.repos)
        })
        .catch(err => {
          console.log(err.data)
        })

      console.log("getReposOut", this.fetching)
    },
    makeAvatarUrl(query) {
      return this.repos.length ? `https://github.com/${query}.png` : "#"
    }
  }
}
</script>

<style>
.progress {
  vertical-align: middle;
  margin: 0 auto;
}
</style>

