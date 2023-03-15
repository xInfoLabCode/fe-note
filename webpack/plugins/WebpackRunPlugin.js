class WebpackRunPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('WebpackRunPlugin', () => {
      console.log('webpack开始编译')
    })
  }
}

export default WebpackRunPlugin
