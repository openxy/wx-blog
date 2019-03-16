// pages/posts/show.js
let posts = [
  {
    title: '第1篇日志',
    content: '这里是我的第1篇日志的内容'
  },
  {
    title: '第2篇日志',
    content: '这里是我的第2篇日志的内容'
  },
  {
    title: '第3篇日志',
    content: '这里是我的第3篇日志的内容'
  }
]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let n = options['id'] - 1
    
    this.setData({
      post: posts[n]
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