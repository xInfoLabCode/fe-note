const observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
    if (change.isIntersecting) {
      const { target } = change
      target.src = target.getAttribute('data-src')

      observer.unobserve(target)
    }
  })
})

const imgs = document.querySelectorAll('img')
Array.from(imgs).forEach(img => observer.observe(img))
