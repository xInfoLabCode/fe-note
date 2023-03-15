import { add } from './util'

let num:number = 666
num = <number> <any> '222'

console.log('Result', typeof num, add(num, num))
