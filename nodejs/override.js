/**
 * 重载：定义多个同名、参数个数不同的函数。函数执行时，通过参数个数确定实际执行的函数
 */

function override(fn, context = window) {
  const name = fn.name
  const old = context[name]

  context[name] = function() {
    if (arguments.length === fn.length) { // 
      return fn.apply(this, arguments)
    } else if (typeof old === 'function') {
      return old.apply(this, arguments)
    }
  }
}

override(function f() { console.log(0) })
override(function f(p) { console.log(1, p) })
override(function f(p1, p2) { console.log(2, p1, p2) })

f() // 0
f(1)  // 1, 1
f(1, 2) // 2, 1, 2


/**
 * js函数的实用说明: const f = function fn(p1, p2) { console.log(p1, p2) }
 * 1.函数名：f.name === fn
 * 2.字符串：f.toString() === "function fn(p1, p2) { console.log(p1, p2) }"
 * 3.长度：f.length === 2，即函数参数的个数
 * 4.用new Function定义: new Function("p1", "p2", `console.log(p1, p2)`)
 */