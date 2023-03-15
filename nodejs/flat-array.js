var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function flat(arr, result = []) {
  if (Array.isArray(arr)) {
    return arr.reduce((res, cur) => {
      if (Array.isArray(cur)) {
        cur.forEach(item => flat(item, res))
      } else {
        res.push(cur)
      }
      return res
    }, result)
  } else {
    result.push(arr)
    return result
  }
}

const res = Array.from(new Set(flat(arr).sort((a, b) => a - b)))
console.log(111, res)




const res2 = Array.from(new Set(JSON.stringify(arr).replace(/\[|\]/g, '').split(','))).sort((a, b) => a - b).map(i => i - 0)
console.log(222, res2)