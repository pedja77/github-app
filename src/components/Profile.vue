<template>
  <div>
    Profile of {{ user.name}}
  </div>

</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
