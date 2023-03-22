// ==UserScript==
// @name         TamperMonkeyPlugin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Brandom's tamper monkey plugin
// @author       Brandom
// @match        *://*
// @grant        window.onurlchange
// @run-at       document-body
// ==/UserScript==

(function () {
  // 工具函数
  const utils = {
    // 输出日志
    log(msg, type = 'log') {
      type = ['log', 'warn', 'error', 'info'].includes(type) ? type : 'log'

      console[type](`[TamperMonkey] ${msg}`)
    },
    // 直接将dom移除
    remove(target) {
      if (typeof target === 'string') {
        document.querySelectorAll(target).forEach(node => {
          utils.remove(node)
        })
      } else {
        target?.parentNode?.removeChild(target)
      }
    },
    // 通过css隐藏的方式屏蔽dom
    hide(target) {
      if (typeof target === 'string') {
        const style = document.createElement('style')
        style.innerText = `${target} { display: none !important }`

        document.querySelector('head').appendChild(style)
      } else {
        target?.style?.setProperty('display', 'none !important')
      }
    }
  }


  // 操作合集
  const actionMap = {}

  // 插件操作xxx
  actionMap.xxx = function () {
    // xxxx
  }


  // 主任务执行
  function main() {
    utils.log(`plugin starts`)

    Object.entries(actionMap).forEach(([, fn]) => fn())

    utils.log(`plugin over`)
  }

  main()
})()
