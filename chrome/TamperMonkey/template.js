// ==UserScript==
// @name         TamperMonkeyPlugin
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Brandom's tamper monkey plugin
// @author       Brandom
// @match        *://*
// @grant        window.onurlchange
// @run-at       document-body
// ==/UserScript==

(function () {
  // 工具函数
  const utils = {
    // 写cookie
    addCookie(key, value, { domain, path, expires } = {}) {
      const cookie = `
        ${key}=${value};
        ${domain ? `domain=${domain};` : ''}
        ${path ? `path=${path};` : ''}
        ${expires ? `domain=${expires};` : ''}
      `

      document.cookie = cookie
    },
    // 输出日志
    log(msg, type = 'log') {
      type = ['log', 'warn', 'error', 'info'].includes(type) ? type : 'log'

      console[type](`[TamperMonkey] ${msg}`)
    },
    // 插入css
    addStyle(styleStr) {
      const style = document.createElement('style')
      style.innerText = styleStr

      document.querySelector('head').appendChild(style)
    },
    // 直接将dom移除
    remove(target) {
      const targets = Array.isArray(target) ? target : [target]

      targets.forEach(item => {
        if (typeof item === 'string') {
          document.querySelectorAll(item).forEach(node => {
            utils.remove(node)
          })
        } else {
          target?.parentNode?.removeChild(item)
        }
      })
    },
    // 通过css隐藏的方式屏蔽dom
    hide(target) {
      const targets = Array.isArray(target) ? target : [target]

      targets.forEach(item => {
        if (typeof item === 'string') {
          utils.addStyle(`${item} { display: none !important }`)
        } else {
          item?.style?.setProperty('display', 'none !important')
        }
      })
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
