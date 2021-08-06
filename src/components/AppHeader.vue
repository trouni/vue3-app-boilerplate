<template>
  <div class="flex items-center justify-between w-full p-5">
    <img
      src="@/assets/logo.png"
      alt="Logo"
      class="h-10 cursor-pointer"
      @click="$router.push({ name: 'Home' })"
    />
  </div>
</template>
