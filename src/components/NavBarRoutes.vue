<template>
  <BaseLink
    v-for="route in routes"
    :key="route.name"
    :to="processRoute(route)"
    exact-active-class="text-black shadow-inner bg-gray-100 cursor-default leading-none"
    class="text-gray-600 flex-grow h-full no-underline"
  >
    <li class="flex h-full w-full items-center justify-center">
      <BaseIcon
        :name="route?.icon?.name"
        :source="route?.icon?.source"
        class="mr-3"
      />{{ route.title }}
    </li>
  </BaseLink>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getRouteAttr(route, attr) {
      return typeof route[attr] === 'function' ? route[attr]() : route[attr]
    },

    processRoute(route) {
      Object.keys(route).forEach(
        attr => (route[attr] = this.getRouteAttr(route, attr))
      )
      return route
    },
  },
}
</script>
