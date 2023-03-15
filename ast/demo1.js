const parser = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')

const code = `const hello = () => {}`

const ast = parser.parse(code)

const visitor = {
  Identifier(path) {
    const { node } = path
    if (node.name === 'hello') {
      node.name = 'test'
    }
  }
}
traverse.default(ast, visitor)

const result = generator.default(ast)
console.log('Result: ', result.code)

// output
// Result:  const test = () => {};