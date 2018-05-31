<template>
  <v-ons-page>
    <app-toolbar>
    </app-toolbar>
    <div class="content">
      <app-search :query.sync="query" placeholder="Search GitHub" @update:query="debouncedGetRepos" />
      <div>
        <div v-if="requestStatus == 404">
          <user-not-found />
        </div>
        <div v-else>
          <v-ons-list v-if="showList">
            <v-ons-list-header>Repositories of {{ query }}</v-ons-list-header>
            <v-ons-list-item v-for="(repo, index) in repos" :key="index">
              <v-ons-row>
                <v-ons-col width="30%">
                  <img :src="repo.owner.avatar_url" width="50px" />
                </v-ons-col>
                <v-ons-col>
                  <h4>{{ repo.name }}</h4>
                  <p>{{ repo.description }}</p>
                </v-ons-col>
              </v-ons-row>
            </v-ons-list-item>
          </v-ons-list>
          <empty-state v-else type="repo" />
        </div>

      </div>
      <div v-if="fetching" id="progress">
        <v-ons-progress-circular indeterminate></v-ons-progress-circular>
      </div>
    </div>
  </v-ons-page>

</template>
<script>
import AppToolbar from "./components/AppToolbar.vue"
import AppSearch from "./components/AppSearch.vue"
import EmptyState from "./components/EmptyState.vue"
import UserNotFound from "./components/UserNotFound.vue"

import { gitHub } from "./services/GitHub.js"
import debounce from "lodash/debounce"

export default {
  components: {
    AppToolbar,
    AppSearch,
    EmptyState,
    UserNotFound
  },
  data() {
    return {
      query: "",
      repos: [],
      fetching: false,
      requestStatus: null
    }
  },
  watch: {
    query: function() {
      this.debouncedGetRepos()
    },
    fetching: function(val) {
      console.log(val)
    }
  },
  computed: {
    showList() {
      return this.repos.length > 0 && this.query.length > 0
    }
  },
  created() {
    this.debouncedGetRepos = debounce(this.getRepos, 500)
  },
  methods: {
    getRepos() {
      this.fetching = true
      gitHub
        .getRepos(this.query)
        .then(({ data }) => {
          this.requestStatus = null
          this.repos = data
        })
        .catch(err => {
          this.requestStatus = err.response.status
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
}
</script>

<style>
#progress {
  position: fixed;
  width: 20%; /* Set your desired with */
  z-index: 2; /* Make sure its above other items. */
  top: 50%;
  left: 50%;
  margin-top: -10%; /* Changes with height. */
  margin-left: -10%; /* Your width divided by 2. */
  /* You will not need the below, its only
           for styling   purposes.*/
  padding: 10px;
  border: none;
  text-align: center;
}
</style>

