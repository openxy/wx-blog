// pages/posts/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: 'http://127.0.0.1:8080/posts.json',
      data: {},  // 暂无需查询参数
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)  // 当访问成功时，在日志中查看网站的返回结果
        page.setData({posts:res.data})      
      }
    })
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