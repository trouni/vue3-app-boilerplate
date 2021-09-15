<template>
  <div
    v-if="alert || hasSlot"
    class="
      fixed
      left-1/2
      top-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      z-50
      flex flex-col
      gap-y-3
      items-center
      px-6
      py-8
      w-11/12
      bg-white
      rounded-lg
      sm:gap-y-8 sm:p-12 sm:max-w-2xl
      lg:max-w-2xl
    "
    :class="alert.classes"
    v-bind="$attrs"
  >
    <div @click="closeAlert" class="absolute right-2 top-2 text-3xl">╳</div>
    <p
      v-if="title"
      :class="[
        'text-lg sm:text-2xl lg:text-3xl text-left font-medium',
        { 'text-center': singleMessage },
      ]"
      v-html="title"
    ></p>
    <ul v-if="messages.length > 0" class="flex flex-col gap-y-3 sm:gap-y-5">
      <li
        v-for="(message, index) in messages"
        :key="index"
        class="sm:gap-x-6 md:gap-x-8 text-base sm:text-lg lg:text-xl m-0 w-full"
        :class="{ 'text-center': singleMessage }"
        v-html="message"
      />
    </ul>
    <base-button v-if="buttonText" @click="onButtonClick">
      {{ buttonText }}
    </base-button>
    <slot />
  </div>
  <overlay v-if="alert || hasSlot" class="z-20" @click="closeAlert" />
</template>

<script>
import Overlay from '@/components/Overlay'
import useKeyboardInput from '@/use/use-keyboard-input'
import { Comment, computed } from 'vue'
import { useStore } from 'vuex'
// import { useI18n } from 'vue-i18n'

export default {
  inheritAttrs: false,

  components: { Overlay },

  props: {
    alert: {
      type: Object,
      default: null,
    },
  },

  setup(props, { emit, slots }) {
    const store = useStore()
    // const { t } = useI18n()
    const computedProps = {
      singleMessage: computed(() => {
        return !props.alert?.messages || props.alert?.messages.length === 1
      }),
      title: computed(() => {
        return props.alert?.title
      }),
      messages: computed(() => {
        return props.alert?.messages || []
      }),
      buttonText: computed(() => {
        return props.alert?.buttonText === undefined
          ? 'Close'
          : props.alert?.buttonText
      }),
      hasSlot: computed(() => {
        return (
          slots.default &&
          slots.default().findIndex(o => o.type !== Comment) !== -1
        )
      }),
    }

    const closeAlert = () => {
      emit('close')
      store.dispatch('resetAlert')
    }

    const onButtonClick = () => {
      if (props.alert.buttonAction) props.alert.buttonAction()
      closeAlert()
    }

    const keyboardInput = e => {
      if (e.key === 'Escape') {
        closeAlert()
      }
    }

    useKeyboardInput(keyboardInput)

    return { ...computedProps, closeAlert, onButtonClick }
  },
}
</script>
