class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('WebpackDonePlugin', () => {
      console.log('webpack编译完成')
    })
  }
}