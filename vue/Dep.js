class Dep {
  constructor() {
    this.subs = [] // 收集的watchers
  }

  addSub(sub) {
    if (!this.subs.includes(sub)) {
      this.subs.push(sub)
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this
    this.obj = obj
    this.key = key
    this.cb = cb

    this.value = obj[key] // 触发obj.key的getter方法，判断存在Dep.target时，将Dep.target收集
    Dep.target = null
  }

  update() {
    this.value = this.obj[this.key] // 获取最新的值

    this.cb(this.value) // cb一般是view更新函数
  }
}

function observe(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(item => observe(item))
    return
  }

  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive(obj, key, value) {
  observe(value)

  const dep = new Dep()

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set(val) {
      if (val !== value) {
        obj[key] = val
        dep.notify()
      }
    }
  })
}

class Vue {
  constructor(options) {
    this._data = options.data()

    observe(this._data)

    //// compile
    // 编译模板，生成watcher
    new Watcher(this._data, 'pageName', value => { document.querySelector('#pageName').innerHTML = value })
  }
}
