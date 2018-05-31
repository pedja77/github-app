<template>
  <v-ons-card>
    <img src="https://pbs.twimg.com/media/Bt5MoW0CIAE9Fda.jpg" alt="Sad Elephant" width="100%" />
    <div class="content">
      <p>There are no {{type | pluralizeUser}} here</p>
    </div>
  </v-ons-card>
</template>

<script>
import pluralize from "pluralize"

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  filters: {
    pluralizeUser(user) {
      return pluralize(user)
    }
  }
}
</script>

<style>
</style>
