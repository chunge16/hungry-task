
// 发布订阅设计模式
var id = 0
var currentObserver = null

class Subject {
  constructor() {
    this.id = id++
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  removeObserver(observer) {
    let index = this.observers.indexOf(observer)
    if(index > -1){
      this.observers.splice(index, 1)
    }
  }
  notify() {
    this.observers.forEach(observer=> {
      observer.update()
    })
  }
}

class Observer{
  constructor(vm, key, cb) {
    this.subjects = {}
    this.vm = vm
    this.key = key
    this.cb = cb
    this.value = this.getValue()
  }
  update(){
    let oldVal = this.value
    let value = this.getValue()
    if(value !== oldVal) {
      this.value = value
      this.cb.bind(this.vm)(value, oldVal)
    }
  }
  subscribeTo(subject) {
    if(!this.subjects[subject.id]){
      console.log('subscribeTo.. ', subject)
      subject.addObserver(this)
      this.subjects[subject.id] = subject
    }
  }
  getValue(){
    currentObserver = this
    let value = this.vm[this.key]   //等同于 this.vm.$data[this.key]
    currentObserver = null
    return value
  }
}
