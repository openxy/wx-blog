// pages/posts/edit.js

const store = require("../../utils/store.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {}
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let post = e.detail.value    
    store.savePost(post)
    wx.redirectTo({
      url: 'index'
    })
  },

  formReset(e) {
    console.log(e)
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    let id = options['id'] 
    if (id) {      
      let post = store.fetchPosts(id)      
      this.setData({post:post})
    }

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