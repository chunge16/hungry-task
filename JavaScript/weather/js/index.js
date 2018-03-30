function ajax (opts) {
  let url = opts.url
  let type = opts.type || 'GET'
  let dataType = opts.dataType || 'json'
  let onsuccess = opts.onsuccess || function(){}
  let onerror = opts.onerror || function(){}
  let data = opts.data || {}

  let dataStr = []
  for(var key in data){
    dataStr.push(key + '=' + data[key])
  }
  dataStr = dataStr.join('&')

  if(type === 'GET'){
    url += '?' + dataStr
  }

  let xhr = new XMLHttpRequest()
  xhr.open(type, url, true)
  xhr.onload = function(){
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
      //成功了
      if(dataType === 'json'){
        onsuccess( JSON.parse(xhr.responseText))
      }else{
        onsuccess( xhr.responseText)
      }
    } else {
      onerror()
    }
  }
  xhr.onerror = onerror
  if(type === 'POST'){
    xhr.send(dataStr)
  }else{
    xhr.send()
  }
}

function $(selector) {
  return document.querySelector(selector)
}

function $$(selector) {
  return document.querySelectorAll(selector)
}

function getDay(number) {
  const days = ['日', '二', '三', '四', '五', '六', '一']
  return days[number]
}

function formantMinutes (number) {
  return number < 10 ? '0' + number : number
}

function getCodeImg(code) {
  return `https://weixin.jirengu.com/images/weather/code/${code}.png`
}

const app = {
  getData (onsuccess) {
    ajax({
      type: 'get',
      url: 'https://weixin.jirengu.com/weather',
      onsuccess: onsuccess
    })
  },

  render (resp) {
    let data = resp.weather[0]
    console.log(data)
    const currentData = new Date()
    const lastUpdate = new Date(data.last_update)
    const today = data.now
    const futureWeathers = data.future.slice(2,9)
    const suggestion = data.today.suggestion

    $('.city .city-name').innerHTML = `${data.city_name}<span class="icon iconfont icon-location"></span>`
    $('.city .data').innerText = `${currentData.toLocaleDateString()} 星期${getDay(currentData.getDay())}`
    $('.city .last_update').innerHTML = `<span class="icon iconfont icon-gengxin"></span>${lastUpdate.getHours()}:${formantMinutes(lastUpdate.getMinutes())}`
    $('.today > img').src = getCodeImg(today.code)
    $('.today .temperature').innerText = `${today.temperature}℃`
    $('.today .detail .text').innerText = today.text
    $('.today .detail .wind').innerText = `${today.wind_direction}风${today.wind_scale}级`
    $('.today .detail .humidity').innerText = `湿度：${today.humidity}%`

    // 建议
    $('.suggestion .car_washing .dropdown').innerText = suggestion.car_washing.details
    $('.suggestion .dressing .dropdown').innerText = suggestion.dressing.details
    $('.suggestion .uv .dropdown').innerText = suggestion.uv.details

    // 未来7天
    let future = '<div class="title">未来7天的天气</div>'
    futureWeathers.forEach((day) => {
      future += `
      <div class="future-day">
                <div class="data">${day.date}</div>
                <div class="day">${day.day}</div>
                <div class="daytime-night">
                    <div class="daytime">
                        <img src="${getCodeImg(day.code1)}">
                        <p>白天</p>
                        <p class="daytime-temperature">${day.high}°C</p>
                    </div>
                    <div class="night">
                        <img src="${getCodeImg(day.code2)}">
                        <p>夜晚</p>
                        <p class="night-temperature">${day.low}°C</p>
                    </div>
                </div>
                <div class="wind">${day.wind}</div>
            </div>
      `
    })
    $('.future').innerHTML = future
  },

  bind () {

  },

  init () {
    this.getData((data) => {
      this.render(data)
      this.bind()
    })
  }
}


app.init()
