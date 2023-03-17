function log(method: any, context: any):any {
  function addLog(this: any, ...args: any) {
    console.log('log::before')
    const result = method.apply(this, args) + 666
    console.log('log::end')
    return result
  }

  return addLog
}

class Test {
  name: string

  constructor(name: string) {
    this.name = name
  }

  @log
  greet(): void {
    console.log('-----', this.name)
  }
}

const t = new Test('marry')
t.greet()
