// pages/home/home.js

const utils = require('../../utils/util.js');
let timer = 0
let runing = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishes: '神马',
    btnText: '开始',
    book: {
      'morning': ["早上", "面包 蛋糕 荷包蛋 烧饼 饽饽 油条 馄饨 火腿 面条 小笼包  玉米粥 肉包 山东煎饼 饺子 煎蛋 烧卖 生煎 锅贴 包子 酸奶 苹果 梨 香蕉 皮蛋瘦肉粥 蛋挞 南瓜粥 煎饼 玉米糊 泡面 粥 馒头 燕麦片 水煮蛋 米粉 豆浆 牛奶 花卷 豆腐脑 煎饼果子 小米粥 黑米糕 鸡蛋饼 牛奶布丁 水果沙拉 鸡蛋羹 南瓜馅饼 鸡蛋灌饼 奶香小馒头 汉堡包 披萨 八宝粥 三明治 蛋包饭 豆沙红薯饼 驴肉火烧 粥 粢饭糕 蒸饺 白粥"],
      'noon': ["中午", "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 速冻水饺 日本料理 涮羊肉 味千拉面 肯德基 面包 扬州炒饭 自助餐 茶餐厅 海底捞 咖啡 比萨 麦当劳 兰州拉面 沙县小吃 烤鱼 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 竹笋烤肉"],
      'night': ["晚上", "盖浇饭 砂锅 大排档 米线 满汉全席 西餐 麻辣烫 自助餐 炒面 快餐 水果 西北风 馄饨 火锅 烧烤 泡面 速冻水饺 日本料理 涮羊肉 味千拉面 肯德基 面包 扬州炒饭 自助餐 茶餐厅 海底捞 咖啡 比萨 麦当劳 兰州拉面 沙县小吃 烤鱼 海鲜 铁板烧 韩国料理 粥 快餐 萨莉亚 桂林米粉 东南亚菜 甜点 农家菜 川菜 粤菜 湘菜 本帮菜 竹笋烤肉"]
    },
    list: ['盖浇饭', '兰州拉面', '面条', '砂锅', '水果沙拉']
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
    // 重置初始化状态
    this.setData({
      dishes: '神马',
      btnText: '开始'
    })
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
   * 
   */
  changeEat: function() {
    let list = wx.getStorageSync('menu')
    let name = list[utils.random(list.length) - 1]
    if (list.length === 0) return wx.showToast({
      title: '菜都没得，选啥子！！！',
      icon: 'none'
    })
    if (list.length == 1) return wx.showToast({
      title: '一个菜，还有好选的！！！',
      icon: 'none'
    })
    console.log(name, utils.random(list.length))

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
        name = list[utils.random(list.length) - 1]
        this.setData({
          dishes: name
        })
      }, 60)
      runing = true
    }
  }
})