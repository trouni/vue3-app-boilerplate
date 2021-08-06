<template>
  <div class="home text-center">
    <img alt="Vue logo" class="mx-auto" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" class="mx-auto" />
  </div>
  <Nav class="mt-8" />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Nav from '@/components/Nav'

export default {
  name: 'Home',

  components: {
    HelloWorld,
    Nav,
  },
}
</script>
