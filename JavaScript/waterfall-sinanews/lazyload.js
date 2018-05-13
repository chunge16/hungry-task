function getElements(selector) {
  return document.querySelectorAll(selector)
}
function getElement(selector) {
  if (!selector) return null
  return document.querySelector(selector)
}
let colCount = parseInt(getElement('#pic-ct').clientWidth / 300)
let colSumHeight = []
let curPage = 1
let perPageCount = 10
let isDataArrive = true
for (let i = 0; i < colCount; i++){
  colSumHeight[i] = 0
}

start()

function start(){
  getData(function(newsList){
    console.log(newsList)
    isDataArrive = true

    newsList.forEach(function (news) {
      let $node = getNode(news)
      let img = $node.querySelector('img')
      img.addEventListener('load', function () {
        document.querySelector('#pic-ct').appendChild($node)
        console.log($node, 'loaded...')

        waterFallPlace($node)
      })
    })
  })
  isDataArrive = false
}

function getNode(item){
  let liNode = document.createElement('li')
  liNode.classList.add('item')
  liNode.innerHTML = `<a href="${item.url}" class="link"><img src="${item.img_url}" alt=""></a><h4 class="header">${item.short_name}</h4><p class="desp">${item.short_intro}</p>`

  return liNode
}

function waterFallPlace($node){
  let minIndex = 0
  let minSumHeight = colSumHeight[0]
  for(let i = 0; i < colSumHeight.length; i++){
    if(colSumHeight[i] < minSumHeight){
      minIndex = i
      minSumHeight = colSumHeight[i]
    }
  }

  $node.style.top = `${minSumHeight}px`
  $node.style.left = `${($node.offsetWidth + 20)* minIndex}px`
  $node.style.opacity = '1'

  colSumHeight[minIndex] += ($node.offsetHeight + 20)

  getElement('#pic-ct').style.height = `${Math.max.apply(null, colSumHeight)}px`
}

function getData(callback){
  $.ajax({
    url: 'http://platform.sina.com.cn/slide/album_tech',
    dataType: 'jsonp',
    jsonp:"jsoncallback",
    data: {
      app_key: '1271687855',
      num: perPageCount,
      page: curPage
    },
    success: function (ret) {
      if(ret && ret.status && ret.status.code === "0"){
        callback(ret.data)   //如果数据没问题，那么生成节点并摆放好位置
        curPage++
      }else{
        console.log('get error data')
      }
    }
  })
}

function isVisible(el){
  let winH = document.documentElement.clientHeight
  let top = el.getBoundingClientRect().top
  if(top < winH){
    return true
  }else{
    return false
  }
}

window.addEventListener('scroll', function () {
  if (!isDataArrive) return
  
  if (isVisible(getElement('#load'))) {
    start()
  }
})
