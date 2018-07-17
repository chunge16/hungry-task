window.onload = function () {
  const API = {
    GETSONG: 'http://api.jirengu.com/fm/getSong.php',
    GETCHANNELS: 'http://api.jirengu.com/fm/getChannels.php',
    GETLYRIC: 'http://api.jirengu.com/fm/getLyric.php'
  }
  const cover = $('.fm-cover')
  const coverWarp = $('.fm-cover-warp')
  const picture = $('.fm-cover > img')
  const title = $('.fm-msg-title')
  const artist = $('.fm-msg-singer')
  const nextSongBtn = $('.next-song')
  const lyric = $('.fm-msg-lyric')
  const lyricWarp = $('.lyricOuter')
  const lyricList = $('.show-lrc')
  const lyricBtn = $('.lyric-btn')
  let curIndex = 0

  function init() {
    let audioObject = new Audio()
    audioObject.channelID = 'public_tuijian_suibiantingting'
    audioObject.shouldUpdate = true
    audioObject.getmusic = function () {
      axios.get(API.GETSONG, {
        params: {
          channel: audioObject.channelID
        }
      })
        .then(function (response) {
          let song = response.data.song[0]
          this.song = {
            picture: song.picture,
            url: song.url,
            title: song.title,
            artist: song.artist,
            sid: song.sid
          }
          this.src = song.url
          getSongDetails(audioObject)
          getLyric(audioObject)
        }.bind(this))
        .catch(function (error) {
          console.error(error)
        })
    }

    audioObject.addEventListener('playing', function () {
      console.log('playing')
      play()
      if (coverWarp.classList.contains('fm-cover-pause')){
        coverWarp.classList.remove('fm-cover-pause')
      }
    })

    audioObject.addEventListener('pause', function(){
      console.log('pause')
      pause()
      if (!coverWarp.classList.contains('fm-cover-pause')){
        coverWarp.classList.add('fm-cover-pause')
      }
    })

    audioObject.addEventListener('ended', function(){
      console.log('ended')
      this.getmusic(this.channelID)
    })

    audioObject.addEventListener('click', function () {
      //如下代码设置 每1秒左右执行一次
      if(this.shouldUpdate) {
        //do something
        let minute = Math.floor(this.currentTime / 60)
        let seconed = Math.floor(this.currentTime % 60) + ''
        seconed = seconed.length === 2 ? seconed: '0' + seconed
        let time = `0${minute}:${seconed}`
        lyricList.childNodes.forEach(function (item, index) {

          if (item.getAttribute('data-time') === time) {
            if (index > 0) {
              lyricList.childNodes[index - 1].classList.remove('active')
            }
            item.classList.add('active')
            curIndex -= 30
            lyricList.style.marginTop = curIndex + 'px'
          }
        })

        if (this.lyricObj) {
          let line = this.lyricObj[time]
          if (line) {
            lyric.innerText = line
          }
        }
        this.shouldUpdate = false
        setTimeout(function(){
          this.shouldUpdate = true
        }.bind(this), 1000)
      }
    })

    nextSongBtn.addEventListener('click', function () {
      if (!audioObject.autoplay) {
        audioObject.autoplay = true
      }
      audioObject.getmusic(this.channelID)
    })

    coverWarp.addEventListener('click', function (e) {
      e.stopPropagation()
      console.log('cover')
      if (audioObject.paused) {
        audioObject.play()
      } else {
        audioObject.pause()
      }
    })

    lyricBtn.addEventListener('click', function () {
      console.log('show')
      if (lyricWarp.classList.contains('show')) {
        lyricWarp.classList.remove('show')
      } else {
        lyricWarp.classList.add('show')
      }
    })

    lyricWarp.addEventListener('click', function (e) {
      e.stopPropagation()
      if (this.classList.contains('show')) {
        lyricWarp.classList.remove('show')
      }
    })
    // 初始化播放
    audioObject.getmusic(this.channelID)
  }

  function getSongDetails (audioObject) {
    picture.setAttribute('src', audioObject.song.picture)
    title.innerText = audioObject.song.title
    artist.innerText = audioObject.song.artist
    if (cover.classList.contains('fm-cover-pause')){
      cover.classList.remove('fm-cover-pause')
    }
  }

  function getLyric (audioObject) {
    if (lyricList.innerHTML) {
      lyricList.innerHTML = ''
      lyricList.style.marginTop = 0 + 'px'
      curIndex = -30
    }
    axios.get(API.GETLYRIC, {
      params: {
        sid: audioObject.song.sid
      }
    }).then(function (ret) {
      let lyric = ret.data.lyric
      let lyricObj = {}
      lyric.split('\n').forEach(function (line) {
        let times = line.match(/\d{2}:\d{2}/g)
        let str = line.replace(/\[.+?\]/g, '')
        if (Array.isArray(times)) {
          times.forEach(function (time) {
            let li = document.createElement('li')
            li.innerText = str
            li.setAttribute('data-time', time)
            lyricList.appendChild(li)
            lyricObj[time] = str
          })
        }
      })
      audioObject.lyricObj = lyricObj
    }.bind(audioObject))
  }

  function pause() {
    let iTransform = getComputedStyle(picture).transform
    let cTransform = getComputedStyle(cover).transform
    cover.style.transform = cTransform === 'none'
      ? iTransform
      : iTransform.concat(' ', cTransform)
    picture.classList.remove('animate')
  }

  function play() {
    picture.classList.add('animate')
  }

  init()
}

function $(nodeClass) {
  if (!nodeClass) return null
  return document.querySelector(nodeClass)
}


