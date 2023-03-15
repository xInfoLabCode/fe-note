async function t() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(2)
      resolve()
    }, 3000)
  }).then((val) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(3)
        resolve()
      }, 4000)
    })
  }).then(() => {
    console.log(4)
  })
}

// await会等待函数体中的promis.resolve执行完成
async function test() {
  console.log(1)
  await t()
  console.log(999)
}

test()
