import { loader1, loader2 } from './Loader'

const WebpackRunPlugin = require('./plugins/WebpackRunPlugin')
const WebpackDonePlugin = require('./plugins/WebpackDonePlugin')

export default {
  plugins: [
    new WebpackRunPlugin(),
    new WebpackDonePlugin()
  ],
  loaders: {
    rules: [
      {
        test: /\.js$/,
        use: [loader1, loader2]
      }
    ]
  }
}