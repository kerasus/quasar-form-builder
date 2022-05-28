<template>
  <div>
    hi {{ name }} from CustomComponent
  </div>
</template>

<script>
export default {
  name: "CustomComponent",
  props: ['name'],
  // props: {
  //   name: {
  //     type: String,
  //     default: 'ali'
  //   }
  // }
}
</script>

<style scoped>

</style>
