<template>
  <div class="flex flex-col justify-center items-center">
    <BaseIcon name="futbol" class="animate-bounce fa-3x"></BaseIcon>
    <div
      class="
        animate-bounce-opacity
        bg-black
        w-6
        h-1
        rounded-full
        filter
        blur-sm
      "
    ></div>
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
