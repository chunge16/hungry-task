#!/usr/bin/env node
let axios = require('axios');
const date = require('date-and-time');
axios.default.baseURL = 'https://api.seniverse.com/v3/weather/now.json';
console.log('Hi, this is weather report app');
// const URL = 'http://api.jirengu.com/getWeather.php';
const KEY = 'SqNGhybhhgCihrySL';
const URL = `https://api.seniverse.com/v3/weather/now.json?key=${KEY}`;

let getWeather = function () {
    let params = {};
    if (process.argv[2] && typeof process.argv[2] === 'string') {
        // params.city = process.argv[2];
        params.location = process.argv[2];
    }else {
        params.location = '北京';
    }

    return new Promise(function (resolve, reject) {
        axios.get(URL, {params}).then(function (resp) {
            resolve(resp.data);
        }).catch(function (err) {
            reject(err);
        });
    });
};

getWeather().then(function (data) {
    console.log('data', data)
    // let {
    //     currentCity,
    //     weather_data,
    //     pm25,
    //     index
    // } = data.results[0];
    let {
        location,
        now
    } = data.results[0];

    let nowDate = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
    // let {
    //     weather,
    //     temperature
    // } = weather_data[0];
    // console.log('当前城市： ', currentCity);
    // console.log('当前天气： ', weather);
    // console.log('当前温度： ', temperature);
    // console.log('当前PM25： ', pm25);
    // console.log('出行建议： ', index[3].des);

    console.log('当前城市： ', location.name);
    console.log('当前天气： ', now.text);
    console.log('当前温度： ', now.temperature);
    console.log('当前时间： ', nowDate)
}).catch(err => {
    console.log('发生错误');
    console.error(err.Error);
});

module.exports = getWeather;
