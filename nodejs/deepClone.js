const deepClone = function() {
  const _weakMap = new WeakMap() // 防止引用循环

  return source => {
    if (_weakMap.get(source)) {
      return _weakMap.get(source)
    }

    if (source && typeof source === 'object') {
      let target = {}

      if (source instanceof Date) {
        target = new Date(source)
      } else if (Array.isArray(source)) {
        target = source.map(item => deepClone(item))
      } else {
        for(let i in source) {
          target[i] = deepClone(source[i])
        }
      }

      // 缓存对象拷贝
      _weakMap.set(source, target)

      return target
    }

    return source
  }
}()

const t1 = 1
const t2 = new Date('2000-01-01 00:00:00')
const t3 = () => {}
const t4 = { test: 111 }
const t5 = { t1, t2, t3, t4, t4c: t4, t5c: t5 }

const t4c = deepClone(t4)
const t5c = deepClone(t5)

console.log('result1', deepClone(t1))
console.log('result2', deepClone(t2))
console.log('result3', deepClone(t3))
console.log('result4', t4c, t4c === t4)
console.log('result5', t5c, t5c === t5c.t5c)
