const sourceCode = `const sum = a => { a++ }`

// 三步方式调用babel：显示生成ast-遍历处理-生成新代码
const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')

const visitor = {
  Identifier(path) {
    const { node } = path
    if (node.name === 'sum') {
      node.name = 'add'
    }
  }
}

const ast = parser.parse(sourceCode)
traverse.default(ast, visitor)
const result = generator.default(ast, {}, sourceCode)
console.log('target code: ', result.code)


// 调用@babel/core，定义plugin（{visitor, pre, post}）直接获得代码
const core = require('@babel/core')
const renamePlugin = { visitor } // plugin即为{ visitor }的对象
const target = core.transform(sourceCode, {
  plugins: [renamePlugin]
})
console.log('target code: ', target.code)
