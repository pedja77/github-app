<template>
  <v-ons-page>
    <app-toolbar>
      <div slot="left">
        <v-ons-back-button></v-ons-back-button>
      </div>
    </app-toolbar>

    <div class="content">
      <v-ons-card>
        <div class="title">{{ user.name ? user.name : 'Unknown user'}}</div>
        <img :src="user.avatar_url" alt="Users github avatar" width="100%" />
        <div class="content">
          <p>Location: {{ user.location }}</p>
          <p>Followers: {{ user.followers }}</p>
          <p>Following: {{ user.following }}</p>
        </div>
      </v-ons-card>
    </div>

  </v-ons-page>
</template>

<script>
import { gitHub } from "../services/GitHub.js"
import AppToolbar from "./AppToolbar.vue"

export default {
  components: {
    AppToolbar
  },
  data() {
    return {
      user: {}
    }
  },
  props: {
    username: {
      type: String
    }
  },
  created() {
    gitHub.getUserData(this.username).then(({ data }) => {
      this.user = data
      console.log(this.user)
    })
  },
  mounted() {}
}
</script>

<style>
</style>
