#!/usr/bin/env node
let axios = require('axios')
console.log('Hi, this is weather report app')

let getWeather = function () {
  let params = {
    key: 'study_javascript_in_jirengu.com'
  }
  if (process.argv[2] && typeof process.argv[2] === 'string') {
    params.location = process.argv[2]
  }

  return new Promise(function (resolve, reject) {
    axios.get('https://weixin.jirengu.com/weather', { params }).then(function (resp) {
      resolve(resp.data)
    }).catch(function (err) {
      reject(err)
    })
  })
}

getWeather().then(function (data) {
  console.log("当前城市： ", data.weather[0].city_name)
  console.log("当前天气： ", data.weather[0].now.text)
  console.log("当前温度： ", `${data.weather[0].now.temperature}℃`)
  console.log("当前湿度： ", data.weather[0].now.humidity)
  console.log("出行建议： ", data.weather[0].today.suggestion.travel.details)
})

module.exports = getWeather
