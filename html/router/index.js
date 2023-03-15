/**
 * history模式下，pushState | replaceState本身不会抛出相应的事件
 * vue-router会劫持（重写）原生的pushState ｜ replaceState方法，并在方法里面抛出相应的事件
 * 捕获pushState ｜ replaceState事件，用于调用预定义的钩子函数
 */


// 重写pushState方法
const orginalPushState = window.history.pushState
window.history.pushState = function(state, title, url) {
  orginalPushState(...arguments)

  const event = new CustomEvent('pushstate', { state, title, url })

  window.dispatchEvent(event)
}

// 重写replaceState方法
const orginalReplaceState = window.history.replaceState
window.history.replaceState = function(state, title, url) {
  orginalReplaceState(...arguments)

  const event = new CustomEvent('replacestate', { state, title, url })
  window.dispatchEvent(event)
}

window.addEventListener('popstate', e => {})
window.addEventListener('pushstate', e => {})
window.addEventListener('replacestate', e => {})
