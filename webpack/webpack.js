import Compiler from './Compiler'

function webpack(options = {}) {
  const compiler = new Compiler(options)

  const { plugins } = options
  for(let plugin of plugins) {
    plugin.apply(compiler)
  }

  return compiler
}

export default webpack
