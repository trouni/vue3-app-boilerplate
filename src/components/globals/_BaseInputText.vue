<template>
  <base-label :class="labelClass" :for="name">
    {{ label }}
    <input
      :type="type"
      :name="name"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          this.type === 'number'
            ? parseInt($event.target.value)
            : $event.target.value
        )
      "
      v-bind="$attrs"
      :autocomplete="autocomplete ? 'on' : 'off'"
      class="block p-3 w-full bg-white border"
      :class="{ 'mt-2 sm:mt-4': label }"
    />
  </base-label>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    autocomplete: Boolean,
    modelValue: [String, Number],
    label: {
      type: String,
      required: false,
    },
    labelClass: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: 'text',
      // Only allow types that essentially just render text boxes.
      validator(value) {
        return [
          'date',
          'email',
          'number',
          'password',
          'search',
          'tel',
          'text',
          'url',
        ].includes(value)
      },
    },
  },

  computed: {
    name() {
      return this.label?.toLowerCase()
    },
  },
}
</script>
