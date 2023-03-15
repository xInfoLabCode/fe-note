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
        this.value = value
        this.status = FULFILLED

        setTimeout(() => {
          this.resolveCallbacks.forEach(fn => fn(value))
        })
      }
    }

    const reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED

        setTimeout(() => {
          this.rejectCallbacks.forEach(fn => fn(reason))
        })
      }
    }

    executor(resolve, reject)
  }

  then(onResolve, onReject) {
    const top = this
    const { status, resolveCallbacks, rejectCallbacks } = top

    const newPromise = new Promise((resolve, reject) => {
      const resolvePromise = (action, value) => {
        setTimeout(() => {
          try {
            const result = action(value)
            if (result instanceof Promise) {
              if (result === newPromise) {
                throw new Error('Promise loop error')
              }
              return result
            }
            resolve(result)
          } catch(err) {
            reject(err)
          }
        })
      }

      if (status === PENDING) {
        resolveCallbacks.push(() => resolvePromise(onResolve, top.value))
        rejectCallbacks.push(() => resolvePromise(onReject, top.reason))
      } else if (status === FULFILLED) {
        return resolvePromise(onResolve, top.value)
      } else {
        return resolvePromise(onReject, top.reason)
      }
    })

    return newPromise
  }
}

exports = module.exports = Promise
