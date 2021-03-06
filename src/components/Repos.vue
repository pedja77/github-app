<template>
  <v-ons-page>
    <app-toolbar>
    </app-toolbar>
    <div class="content">
      <app-search :query.sync="query" placeholder="Search GitHub" @update:query="debouncedGetRepos" />
      <v-ons-button modifier="large" @click="onClick">Show Profile</v-ons-button>
      <div>
        <div v-if="isStatus404">
          <user-not-found />
        </div>
        <div v-else>
          <v-ons-list v-if="showList">
            <v-ons-list-header>Repositories of {{ query }}</v-ons-list-header>
            <v-ons-list-item v-for="(repo, index) in repos" :key="index">
              <div class="left">
                <img :src="repo.owner.avatar_url" width="50px" />
              </div>
              <div>
                <h4>{{ repo.name }}</h4>
                <p>{{ repo.description }}</p>
              </div>
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
import AppToolbar from "./AppToolbar.vue"
import AppSearch from "./AppSearch.vue"
import EmptyState from "./EmptyState.vue"
import UserNotFound from "./UserNotFound.vue"
import Profile from "./Profile.vue"

import { gitHub } from "../services/GitHub.js"
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
  computed: {
    showList() {
      return this.repos.length > 0 && this.query.length > 0
    },
    isStatus404() {
      return this.requestStatus === 404
    }
  },
  created() {
    this.debouncedGetRepos = debounce(this.getRepos, 500)
  },
  methods: {
    getRepos() {
      this.fetching = true
      if (!this.query) {
        this.repos = []
        this.fetching = false
        return
      }
      gitHub
        .getRepos(this.query)
        .then(({ data }) => {
          this.requestStatus = null
          this.repos = data
        })
        .catch(err => {
          if (err.response) {
            this.requestStatus = err.response.status
          }
        })
        .finally(() => {
          this.fetching = false
        })
    },
    onClick() {
      this.$emit("push-page", {
        extends: Profile,
        onsNavigatorProps: {
          username: this.query
        }
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

