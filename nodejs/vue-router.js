/// hash模式
window.addEventListener('hashchange', () => {
  // ...
})


/// history模式 - html
window.addEventListener('popstate')

window.history.pushState(stateObj, title, url)
window.history.replaceState(stateObj, title, url)
