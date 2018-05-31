<template>
  <v-ons-toolbar>
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center">{{ title }}</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </v-ons-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Github App"
    }
  }
}
</script>

<style>
</style>
