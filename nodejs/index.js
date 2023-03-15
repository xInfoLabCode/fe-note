function getType(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object |\]/g, '')
}

console.log(1111, getType(global))


// Type = [
//   Number,
//   String,
//   Array,
//   Boolean,
//   Null,
//   Undefined,
//   Symbol,
//   Map,
//   WeakMap,
//   Set,
//   WeakSet,
//   Object,
//   Function,
//   Date,
//
//   window及dom对象
//   Window,
//   HTMLDocument，
//   HTMLBodyElement,
//   HTMLDivElement,
//   HTMLParagraphElement,
//   HTMLAnchorElement,
// ]
