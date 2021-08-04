export default function saveState(key, state) {
  if (state) window.localStorage.setItem(key, JSON.stringify(state))
  else window.localStorage.removeItem(key)
}
