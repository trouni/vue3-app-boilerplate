import { onBeforeUnmount, onMounted } from 'vue'

export default function useKeyboardInput(keyboardInput, event = 'keyup') {
  onMounted(() => {
    window.addEventListener(event, keyboardInput)
  })

  onBeforeUnmount(() => {
    window.removeEventListener(event, keyboardInput)
  })
}
