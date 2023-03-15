function lazyLoad() {
  const viewHeight = document.documentElement.clientHeight

  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
  const height = scrollHeight + viewHeight

  Array.from(document.querySelectorAll('img')).forEach(img => {
    console.log(111, img.offsetTop, height)
    if (img.offsetTop < height) {
      if (!img.getAttribute('src') && img.getAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'))
      }
    }
  })
}

function lazyLoad() {
  const viewHeight = document.documentElement.clientHeight

  Array.from(document.querySelectorAll('img')).forEach(img => {
    if (img.getBoundingClientRect().top < viewHeight) {
      if (!img.getAttribute('src') && img.getAttribute('data-src')) {
        img.setAttribute('src', img.getAttribute('data-src'))
      }
    }
  })
}

const throttledLazyLoad = throttle(lazyLoad)

window.addEventListener('scroll', throttledLazyLoad)
window.addEventListener('resize', throttledLazyLoad)