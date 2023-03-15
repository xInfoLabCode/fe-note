const code = `add(2 sub(4 1))`

// 
const astTree = {
  type: 'Program',
  body: [
    {
      type: 'CallExpression',
      name: 'add',
      params: [
        {
          type: 'NumberLiteral',
          value: '2'
        },
        {
          type: 'CallExpression',
          name: 'sub',
          params: [
            {
              type: 'NumberLiteral',
              value: '4'
            },
            {
              type: 'NumberLiteral',
              value: '1'
            }
          ]
        }
      ]
    }
  ]
}
