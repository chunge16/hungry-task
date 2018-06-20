window.onload = function () {
  let title = $('.title')

  if (title) {
    title.innerText = 'node-server'
  }

  ajax({
    url: '/search',
    type: 'post',
    data: {
      username: 'jack',
      password: 123456
    },
    onsuccess: function (res) {
      console.log(res)
    }
  })
}

function $(node) {
  return document.querySelector(node)
}

function ajax(opts) {
  let url = opts.url || ''
  const type = opts.type || 'get'
  const dataType = opts.dataType || 'json'
  const onsuccess = opts.onsuccess || function () {}
  const onerror = opts.onerror || function () {}
  const data = opts.data || {}

  let dataStr = []
  for(let key in data) {
    dataStr.push(`${key}=${data[key]}`)
  }
  dataStr = dataStr.join('&')

  const xhr = new XMLHttpRequest()
  xhr.type = type
  xhr.dataType = dataType
  xhr.open(type, url, true)
  xhr.onerror = onerror
  xhr.onload = function () {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
      //成功了
      if(dataType === 'json'){
        onsuccess(JSON.parse(xhr.responseText))
      }else{
        onsuccess(xhr.responseText)
      }
    } else {
      onerror()
    }
  }

  if (type === 'get') {
    url += '?' + dataStr
  }

  if (type === 'post') {
    xhr.send(dataStr)
  } else {
    xhr.send()
  }
}
