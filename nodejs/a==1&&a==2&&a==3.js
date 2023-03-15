// 方案1：利用==进行自动转换时调用toString或valueOf函数
class A {
  constructor(val) {
    this.val = val
  }

  // toString() {
  //   return this.val++
  // }

  valueOf() {
    return this.val++
  }
}

const a = new A(1)
console.log(111, a == 1 && a == 2)

// 方案2: 利用Object.defineProperty重置getter // 浏览器环境下
let _a = 0
Object.defineProperty(window, 'a', {
  get() {
    _a = _a + 1
    return _a
  }
})
console.log(222, a === 1 && a === 2 && a === 3, _a)