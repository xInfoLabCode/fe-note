const { SyncHook } = require('tapable')

const syncHook = new SyncHook(['name', 'age']) // 参数为事件的传参

syncHook.tap('click', name => {
  console.log(name, 'click triggered')
})

// 重复定义的事件，仍会响应
syncHook.tap('click', name => {
  console.log(name, 'click triggered')
})

syncHook.tap('blur', (name, age) => {
  console.log(name, age, 'blur triggered')
})

setTimeout(() => {
  syncHook.call('leo', 32)
}, 1 * 1000)


// output
// leo click triggered
// leo click triggered
// leo 32 blur triggered