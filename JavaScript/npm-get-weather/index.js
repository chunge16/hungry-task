#!/usr/bin/env node
let axios = require('axios');
console.log('Hi, this is weather report app');
const URl = 'http://api.jirengu.com/getWeather.php';

let getWeather = function () {
    let params = {};
    if (process.argv[2] && typeof process.argv[2] === 'string') {
        params.city = process.argv[2];
    }

    return new Promise(function (resolve, reject) {
        axios.get(URl, {params}).then(function (resp) {
            resolve(resp.data);
        }).catch(function (err) {
            reject(err);
        });
    });
};

getWeather().then(function (data) {
    let {
        currentCity,
        weather_data,
        pm25,
        index
    } = data.results[0];
    let {
        weather,
        temperature
    } = weather_data[0];
    console.log('当前城市： ', currentCity);
    console.log('当前天气： ', weather);
    console.log('当前温度： ', temperature);
    console.log('当前PM25： ', pm25);
    console.log('出行建议： ', index[3].des);
});

module.exports = getWeather;
