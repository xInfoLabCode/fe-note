# iframe跨页面通信

## iframe跨页面通信有同源策略限制
1. 同源的页面之间，子页面可以通过window.parent.document等方法直接读取父页面的dom
2. 非同源不能直接读取，会报 Uncaught DOMException: Blocked a frame with origin "http://127.0.0.1:5500" from accessing a cross-origin frame.异常

## 非同源页面通信
1. 子页面
``` javascript
  // send message to parent page
  window.parent.postMessage({ type, data })

  // get message from parent page
  window.addEventListener('message', data => {
    // handle message
  })
```

2. 父页面
``` javascript
  // send message to iframe
  const iframe = document.querySelector('#iframeId').contentWindow
  iframe.postMessage({ type, data })

  // get message from iframe
  window.addEventListener('message', data => { 
    // handle message
  })
```
