// pages/menu/menu.js
const appInstance = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    menu: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      menu: appInstance.globalData.menu
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
    let menu = appInstance.globalData.menu
    let name = this.data.name
    if (!name) return wx.showToast({
      title: '菜名不能为空',
      icon: 'none'
    })

    // 检查菜单是否已有该菜名
    if (menu.data.indexOf(name) !== -1) {
      return wx.showToast({
        title: '这个菜已经有了，这么喜欢它吗',
        icon: 'none'
      })
    }

    menu.data.push(name)
    this.setData({
      name: '',
      menu
    })
    return wx.showToast({
      title: `${name}`
    })
  },

  // 重置菜单
  resetMenu: function() {
    let defaultMenu = {
      type: 'default', // 当前共有2种，一种是默认美食，另外一种是定位附近的美食
      data: ['炒肉', '炖肉', '涮肉']
    }
    this.setData({
      menu: defaultMenu
    }, () => {
      appInstance.globalData.menu = defaultMenu
      wx.showToast({
        title: '已重置菜单'
      })
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
    let menu = appInstance.globalData.menu
    menu.data = menu.data.filter(function(e) {
      return e !== name
    })
    wx.showModal({
      title: `确认删除${name}?`,
      content: '',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            menu
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})