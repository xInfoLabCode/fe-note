// 将函数名sum改成add
const namePlugin = {
  visitor: {
    Identifier: path => {
      const { node } = path
      if (node.name === 'sum') {
        node.name = 'add'
      }
    }
  }
}

const types = require('@babel/types')

// this变量处理
function hoistFunctionEnvironment(path) {
  const thisEnv = path.findParent(parent => {
    return (parent.isFunction() && !parent.isArrowFunctionExpress()) || parent.isProgram()
  })

  thisEnv.scope.push({
    id: types.identifier('_this'), // 声明变量名
    init: types.thisExpression() // 生成this节点
  })

  const thisPaths = []
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath)
    }
  })

  thisPaths.forEach(thisPath => {
    thisPath.replaceWith(types.identifier('_this'))
  })
}

// 将箭头函数改为function函数
const functionPlugin = {
  visitor: {
    ArrowFunctionExpression(path) {
      // this处理
      hoistFunctionEnvironment(path)

      const { node } = path
      node.type = 'FunctionExpression'

      // 如果箭头函数是直接返回值，需要补充函数体
      if (!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([
          types.returnStatement(node.body)
        ])
      }
    }
  }
}


const code = `const sum = (a, b) => {
  console.log(this)
  return a + b
}
`

const babelCore = require('@babel/core')

const result = babelCore.transform(code, {
  plugins: [namePlugin, functionPlugin]
})

console.log('Result: ', result.code)

// Result:  function add(a, b) {
//   return a + b;
// }