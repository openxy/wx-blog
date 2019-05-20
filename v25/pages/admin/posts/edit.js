// pages/posts/edit.js

const store = require("../../../utils/cloud.js")
let app = getApp()

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
    store.updateResource('post', post).then(
      res => {
        app.globalData.lastPost = post  
        wx.switchTab({
          url: 'index'
        })
    },
    store.onError)
    

  },

  formReset(e) {
    console.log(e)
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    let id = options['id']
    let page = this
    if (id) {
      store.fetchResource('post',id).then(res=>{
        page.setData({ post: res.data })
      })
      
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