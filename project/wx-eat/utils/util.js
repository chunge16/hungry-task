const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const random = (max, min) => {
  max = max || 100;
  min = min || 0;
  return Math.ceil(Math.random() * (max - min) + min);
}


module.exports = {
  formatTime: formatTime,
  random: random
}
