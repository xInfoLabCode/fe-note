function genPromise(timeout) {
  return new Promise((resolve) => {
    console.log('genPromise', timeout)
    setTimeout(() => {
      resolve(timeout)
    }, timeout)
  })
}

async function fn() {
  console.log(111)

  await genPromise(100)

  console.log(222)

  await genPromise(101)

  console.log(333)
}

// 不实用await调用async函数时，会对函数内第一个promise正常之后，
// 第一个promise之后的内容采用异步的方式执行
function test() {
  fn()

  console.log('test')
}

test()