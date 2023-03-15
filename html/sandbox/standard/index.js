class Sandbox {
  constructor(blackList) {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('style', 'display: none')
    document.querySelector('body').appendChild(iframe)

    const sandboxCtx = iframe.contentWindow

    return new Proxy(sandboxCtx, {
      has(target, prop) {
        // 禁止访问的属性，报错
        if (blackList.includes(prop)) {
          throw new Error(`!! Cannot use ${prop}`)
        }
        // 沙箱不存在的属性，报错
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`! Not find ${prop}`)
        }

        return true
      }
    })
  }
}

function withCode (code) {
  code = `with(sandbox) { ${code} }`

  return new Function('sandbox', code)
}

window.onload = () => {
  const blackList = ['window', 'document']
  const sandbox = new Sandbox(blackList)

  const code = `console.log(window)`

  const f = new Function('sandbox', `with(sandbox) { ${code} }`) // new Function，最后一个参数为函数体字符串，前面为传入函数体的参数名
  f.call(sandbox, sandbox)
}
