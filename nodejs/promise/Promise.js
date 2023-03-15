const [PENDING, FULFILLED, REJECTED] = ['pending', 'fulfilled', 'rejected']

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value

        setTimeout(() => {
          this.resolveCallbacks.forEach(cb => cb(value))
        })
      }
    }

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason

        setTimeout(() => {
          this.rejectCallbacks.forEach(cb => cb(reason))
        })
      }
    }

    executor(resolve, reject)
  }

  then(onResolve, onReject) {
    const top = this

    const newPromise = new Promise((resolve, reject) => {
      resolve = typeof resolve === 'function' ? resolve : () => resolve
      reject = typeof reject === 'function' ? reject : () => reject

      const resolvePromise = (action, value) => {
        try {
          const res = action(value)
          if (res instanceof Promise) {
            if (res === newPromise) {
              throw new Error('promise loop')
            }
            return res
          }
          return resolve(res)
        } catch (err) {
          reject(err)
        }
      }

      if (top.status === FULFILLED) {
        resolvePromise(onResolve, top.value)
      } else if (top.status === REJECTED) {
        resolvePromise(onReject, top.reason)
      } else {
        top.resolveCallbacks.push(() => resolvePromise(onResolve, top.value))
        top.rejectCallbacks.push(() => resolvePromise(onReject, top.reason))
      }
    })

    return newPromise
  }
}

exports = module.exports = Promise
