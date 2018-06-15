// 监听数据
function observe(data) {
  if(!data || typeof data !== 'object') return
  for(let key in data) {
    let val = data[key]
    let subject = new Subject()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        console.log(`get ${key}: ${val}`)
        if(currentObserver){
          console.log('has currentObserver')
          currentObserver.subscribeTo(subject)
        }
        return val
      },
      set: function(newVal) {
        val = newVal
        console.log('start notify...')
        subject.notify()
      }
    })
    if(typeof val === 'object'){
      observe(val)
    }
  }
}
