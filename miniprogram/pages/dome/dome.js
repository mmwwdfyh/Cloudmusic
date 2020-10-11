// miniprogram/pages/dome/dome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取音乐信息
  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tabRouter',
      data:{
        $url:'music'
      }
    }).then(res => {
      console.log(res)
    })
  },
  // 获取电影信息
  getMovieInfo() {
    wx.cloud.callFunction({
      name: 'tabRouter',
      data:{
        $url:'movie'
      }
    }).then(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})