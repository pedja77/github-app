<template>
  <v-ons-navigator :page-stack="pageStack" @push-page="pushPage" :options="getOptions()" />
</template>

<script>
import Repos from "./components/Repos.vue"
import Profile from "./components/Profile.vue"

export default {
  data() {
    return {
      pageStack: [Repos]
    }
  },
  methods: {
    pushPage(event) {
      console.log("event", event)
      this.pageStack.push(event)
    },
    getOptions() {
      return {
        animation: "slide"
      }
    },
    showProfile() {
      gitHub.getUserData(this.query).then(response => {
        console.log(response)
      })
    }
  }
}
</script>
