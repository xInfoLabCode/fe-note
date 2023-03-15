function* await(asyncFunc, resolve, reject, ...args) {
  const result = yield asyncFunc(args)
  if (result.value instanceof Promise) {
    result.value.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  } else {
    Promise.resolve(result.value)
  }
}

function* gen() {
  let a = 100
  console.log(100, a* 1000)
  yield 1
  console.log(200)
  yield 2
  console.log(300)
  return 3
}

const g = gen()
console.log(111, g.next())
console.log(222, g.next())
console.log(333, g.next())
console.log(444, g.next())
console.log(555, g.next())
