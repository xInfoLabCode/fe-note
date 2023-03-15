const fe = require('fs')

function toUnixPath(filePath) {
  return filePath.replace(/\\/g, '/')
}

const baseDir = toUnixPath(process.cwd())

class Compilation {
  constructor(webpackOptions) {
    this.options = webpackOptions
    this.modules = []
    this.chunks = []
    this.assets = {}
    this.fileDependencies = []
  }

  build(callback) {
    const entry = {}

    if (typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }

    for(let entryName in entry) {
      const entryFilePath = path.posix.join(baseDir, entry[entryName])
      this.fileDependencies.push(entryFilePath)

      const entryModule = this.buildModule(entryName, entryFilePath)
      this.modules.push(entryModule)
    }

    callback()
  }

  buildModule(name, modulePath) {
    let sourceCode = fs.readFileSync(modulePath, 'utf8')
    const moduleId = `./${path.posix.relative(baseDir, modulePath)}`

    const loaders = []
    const { rules = [] } = this.options.loaders
    rules.forEach(rule => {
      const { test } = rule
      if (modulePath.match(test)) {
        loaders.push(...rule.use)
      }
    })

    sourceCode = loaders.reduceRight((source, loader) => {
      return loader(source)
    }, sourceCode)

    const module = {
      id: moduleId,
      names: [name],
      dependencies: [],
      _source: sourceCode
    }

    return module
  }
}