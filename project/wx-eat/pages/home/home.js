// pages/home/home.js

const utils = require('../../utils/util.js')
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const appInstance = getApp()
let timer = 0
let runing = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishes: '神马',
    btnText: '开始',
    markers: [],
    runing: true,
    markerNames: [],
    index: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 实例化腾讯地图API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'JBEBZ-FTNHQ-QYE5L-GTVEI-VWTF3-MPF43'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 菜单类型为默认时，重置marker类的数据
    let menu = appInstance.globalData.menu
    menu.type === 'default' && this.setData({
      markers: [],
      markerNames: [],
      index: -1
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '今天吃神马哦',
      path: 'pages/home/home'
    }
  },

  /**
   * 用户随机选择菜单
   */
  handleRandom: function() {
    let menu = appInstance.globalData.menu
    let menuType = menu.type
    let isLocal = menuType === 'local'
    let index = -1

    if (menu.length === 0) return wx.showToast({
      title: '菜都没得，选啥子！！！',
      icon: 'none'
    })
    if (menu.length === 1) return wx.showToast({
      title: '一个菜，逗我呢！！！',
      icon: 'none'
    })

    if (runing) {
      console.log('定时暂停')
      clearInterval(timer)
      this.setData({
        btnText: '不行，换一个'
      })
      runing = false
    } else {
      console.log('开始随机')
      this.setData({
        btnText: '停止'
      })
      timer = setInterval(() => {
        index = utils.random(menu.data.length) - 1
        let name = menu.data[index]
        this.setData({
          dishes: name
        })
        isLocal && this.setData({
          index
        })
      }, 60)
      runing = true
    }
    this.setData({
      runing
    })
  },

  /**
   * 获取本地美食列表
   */
  onTapLocation() {
    wx.showLoading({
      title: '获取附近美食'
    })
    // 搜索当前位置的美食
    this.qqmapsdk.search({
      keyword: '餐饮',
      success: res => {
        wx.hideLoading()
        let globalDataMenu = appInstance.globalData.menu
        let data = res.data.length > 10 ? res.data.slice(0, 10) : res.data
        let markers = []
        // 提取数据里的店名
        let markerNames = data.map(item => {
          markers.push({
            title: item.title,
            id: item.id,
            latitude: item.location.lat,
            longitude: item.location.lng,
            address: item.address
          })
          return item.title
        })
        this.setData({
          markers,
          markerNames
        })
        globalDataMenu.type = 'local'
        globalDataMenu.data = markerNames
        wx.showToast({
          title: '菜单已更新'
        })
      },
      fail: res => {
        console.error(res)
      },
      complete: res => {
        console.log(res)
      }
    })
  },

  /**
   * 使用微信内置地图查看指定坐标位置
   */
  openLocation() {
    let selectedIndex = this.data.index
    let markerNames = this.data.markerNames
    let globalDataMenu = appInstance.globalData.menu
    let selectedName = globalDataMenu.data[selectedIndex]
    let isFoundMenu = markerNames.find(name => {
      return name === selectedName
    })
    console.log('是否找到地图', isFoundMenu)

    if (selectedIndex < 0) return

    // 检查当前菜名是否存在坐标数据
    if (!isFoundMenu) return wx.showToast({
      title: '暂无该店地图信息',
      icon: 'none'
    })

    let selectedMenu = this.data.markers[selectedIndex]
    let obj = {
      title: selectedMenu.title,
      latitude: selectedMenu.latitude,
      longitude: selectedMenu.longitude,
      name: selectedMenu.title,
      address: selectedMenu.address
    }
    wx.openLocation(obj)
  },

  /**
   * 跳转到菜单页面
  */
  navigateToMenu() {
    // 如果还在随机中，不允许跳转
    if(runing) return wx.showToast({
      title: '请停止随机选择',
      icon: 'none'
    })

    wx.navigateTo({
      url: '../menu/menu'
    })
  }
})