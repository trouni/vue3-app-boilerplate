export default function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}
