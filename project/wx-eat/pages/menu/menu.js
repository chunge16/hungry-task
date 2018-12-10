// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let menu = wx.getStorageSync('menu') || []
    this.setData({
      list: menu
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  // 添加菜名
  addMenu: function() {
    let menu = wx.getStorageSync('menu')
    let name = this.data.name
    if (!name) return wx.showToast({
      title: '菜名不能为空',
      icon: 'none'
    })

    // 检查菜单是否已有该菜名
    if (menu.indexOf(name) !== -1) {
      return wx.showToast({
        title: '这个菜已经有了，这么喜欢它吗',
        icon: 'none'
      })
    }

    menu.push(name)
    wx.setStorageSync('menu', menu)
    this.setData({
      name: '',
      list: menu
    })
    return wx.showToast({
      title: `${name}`
    })
  },

  // 重置菜单
  resetMenu: function() {
    let menu = ['盖浇饭', '兰州拉面', '面条', '砂锅', '水果沙拉']
    wx.setStorageSync('menu', menu)
    this.setData({
      list: menu
    })
    return wx.showToast({
      title: '已重置菜单'
    })
  },

  // 同步数据
  bindKeyInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 删除单个菜名
  delMenu: function(event) {
    let that = this
    let name = event.currentTarget.dataset.name
    if (!name) return
    let list = this.data.list
    console.log('benfore', list)
    list = list.filter(function(e) {
      return e !== name
    })
    console.log('anfer', list)
    wx.showModal({
      title: `确认删除${name}?`,
      content: '',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setStorageSync('menu', list)
          that.setData({
            list
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



  }
})