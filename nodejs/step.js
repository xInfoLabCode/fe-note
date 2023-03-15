/**
 * 按顺序依次执行函数队列
 * @param {*} queue 
 * @param {*} fn 
 * @param {*} cb 
 */

function runQueue(queue, fn, cb) {
  const step = index => {
    if (index >= queue.length) {
      cb()
    } else {
      if (queue[index]) {
        fn(queue[index], step(++index))
      } else {
        step(++index)
      }
    }
  }

  step(0)
}
