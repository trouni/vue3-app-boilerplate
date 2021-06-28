export function pluralize(qty, singularWord, pluralWord = singularWord + 's') {
  return `${qty} ${qty === 1 ? singularWord : pluralWord}`
}

export function saveState(key, state) {
  if (state) window.localStorage.setItem(key, JSON.stringify(state))
  else window.localStorage.removeItem(key)
}

export function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export function clearLocalStorage() {
  window.localStorage.clear()
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString(navigator.language || 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date) {
  return new Date(date).toLocaleTimeString(navigator.language || 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString(navigator.language || 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
