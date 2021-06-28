<template>
  <div class="pt-8 flex flex-col justify-center items-center">
    <router-view />
  </div>
</template>

<style lang="scss">
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';
@import './assets/tailwind.css';

*,
*::before,
*::after {
  // Deactivate text selection on mobile
  @apply select-none md:select-auto;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -ms-user-drag: none;
  user-drag: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
input,
textarea {
  @apply select-text;
}

html {
  // Fix the page to avoid overscroll on mobile app
  @apply fixed md:static w-screen md:w-auto h-screen md:h-auto;
  overscroll-behavior: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// ===
// Vendor
// ===
#nprogress .bar {
  background: blue;
}
</style>
