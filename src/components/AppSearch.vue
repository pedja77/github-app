<template>
  <v-ons-search-input :placeholder="placeholder" style="width: 100%;" :value="query" @input="$emit('update:query', $event.target.value)">
  </v-ons-search-input>
</template>

<script>
export default {
  props: {
    query: {
      type: String
    },
    placeholder: {
      type: String
    }
  }
}
</script>

