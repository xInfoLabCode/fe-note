const { SyncHook } = require('tap')
import Compilation from './Compilation'

class Compiler {
  constructor(webpackOptions) {
    this.options = webpackOptions

    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    }
  }

  compile(callback) {
    const compilation = new Compilation(this.options)

    compilation.build(callback)
  }

  run(callback) {
    this.hooks.run.call()

    const onCompiled = () => {
      this.hooks.done.call()
    }
    this.compile(() => {
      callback()

      onCompiled()
    })
  }
}

export default Compiler