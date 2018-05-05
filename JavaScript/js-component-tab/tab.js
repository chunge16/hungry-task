
window.onload = function () {
  function Tab (node){
    this.node = node
  }

  Tab.prototype = {
    constructor: Tab,
    init: function () {
      this.tab = this.node.querySelector('.tabs')
      this.tabes = this.node.querySelectorAll('.tabs .tab')
      this.panels = this.node.querySelectorAll('.panels .panel')
      this.tabArr = Array.from(this.tabes)
    },
    bind: function () {
      this.tab.addEventListener('click',  (e) => {
        let tabActiveIndex = this.tabArr.indexOf(e.target)
        this.tabes.forEach(function (node) {
          node.classList.remove('active')
        })
        e.target.classList.add('active')
        this.panels.forEach(function (node ,index) {
          if (tabActiveIndex === index){
            node.classList.add('active')
          } else {
            node.classList.remove('active')
          }
        })
      })
    }
  }

  var tab = new Tab(document.querySelector('.wrap'))
  tab.init()
  tab.bind()
}
