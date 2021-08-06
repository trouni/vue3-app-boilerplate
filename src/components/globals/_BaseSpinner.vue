<template>
  <div class="flex flex-col items-center justify-center">
    <BaseIcon
      name="globe-americas"
      class="fa-2x sm:fa-3x text-gray-700 text-opacity-50 animate-spin"
    ></BaseIcon>
    <p class="mt-3">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
}
</script>

<style lang="scss">
.animate-bounce-opacity {
  animation: bounce-shadow 1s infinite;
}
@keyframes bounce-shadow {
  0%,
  100% {
    opacity: 0.5;
    transform: scaleX(0.8);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
