function defineProxy(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log('Proxy.get', key)
      const val = Reflect.get(target, key, receiver)
      if (typeof val === 'object' && val) {
        return defineProxy(val)
      }
      return val
    },
    set(target, key, value, receiver) {
      console.log('Proxy.set', key, value)
      return Reflect.set(target, key, value, receiver)
    }
  })
}

const a = {
  b: {
    c: {
      d: 1111
    }
  }
}

const obj = {
  a,
  b: {
    a
  }
}

a.obj = obj

const p = defineProxy(obj)

console.log('$$$', p.a)