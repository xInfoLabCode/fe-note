(() => {
  const modules = {
    './src/name.js': module => {
      module.exports = 'module name.js'
    },
    './src/age.js': module => {
      module.exports = 'module age.js'
    },
    './src/esm.js': (module, exports, require) => {
      require.setModuleTag(exports)

      const age = 18
      const author = 'Leo'
      const DEFAULT_EXPORT = author

      // ems使用exports做代理访问模块中的值
      require.defineProperty(exports, {
        age: () => age,
        default: () =>  DEFAULT_EXPORT,
      })
    }
  }

  const cache = {}
  function require(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId]
    }

    const module = (cache[moduleId] = {
      exports: null
    })

    modules[moduleId](module, module.exports, require)

    return module.exports
  }

  // 针对esm
  require.defineProperty = (exports, definition) => {
    for(let key in definition) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        get: definition[key]
      })
    }
  }

  require.setModuleTag = exports => {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    Object.defineProperty(exports, '__esModule', { value: true })
  }

})()