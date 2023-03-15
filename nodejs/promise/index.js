// const Promise = require('./Promise') ///// ! 注释此处即可获取正确运行答案

const RESOLVE = '_resolve_'
const REJECT = '_reject_'
const ERROR = '_error_'

function t1() {
  new Promise((resolve, reject) => {
    console.log('111', RESOLVE)
    resolve(RESOLVE)
    reject(REJECT)
  }).then(val => {
    console.log('222', val)
    return val
  }).then(val => {
    console.log('333', val)
    return val
  })
}

function t2() {
  new Promise((resolve, reject) => {
    console.log('111', RESOLVE)
    setTimeout(() => {
      console.log('113')
      resolve(RESOLVE)
      console.log('114')
    })
    console.log('112')
  }).then(val => {
    console.log('222', val)
    throw new Error(ERROR)
  }).then(val => {
    console.log('333', val)
  }, err => {
    console.log('444', err.message)
  })
  console.log('555')
}

// t1()

t2()

