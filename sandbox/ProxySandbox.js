class ProxySandBox {
  constructor() {
    this.isRunning = false

    this.context = new Proxy(Object.create(null), {
      set: (target, key, val, receiver) => { // 注意：此处需使用箭头函数，否则this异常
        if (this.isRunning) {
          Reflect.set(target, key, val, receiver)
        }
      },
      get: (target, key, receiver) => {
        if (key in target) {
          return Reflect.get(target, key, receiver)
        }
        return window[key]
      }
    })
  }

  active() {
    this.isRunning = true
  }
  inactive() {
    this.isRunning = false
  }
}

let proxySandBox1 = new ProxySandBox();
let proxySandBox2 = new ProxySandBox();
proxySandBox1.active();
proxySandBox2.active();
proxySandBox1.context.city = 'Beijing';
proxySandBox2.context.city = 'Shanghai';
console.log('active:proxySandBox1:window.city:', proxySandBox1.context.city);
console.log('active:proxySandBox2:window.city:', proxySandBox2.context.city);
console.log('window:window.city:', window.city);
proxySandBox1.inactive();
proxySandBox2.inactive();
console.log('inactive:proxySandBox1:window.city:', proxySandBox1.context.city);
console.log('inactive:proxySandBox2:window.city:', proxySandBox2.context.city);
console.log('window:window.city:', window.city);
